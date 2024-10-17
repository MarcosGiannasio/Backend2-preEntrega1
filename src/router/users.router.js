import { Router } from 'express';
import UserDaoMongo from '../daos/Mongo/usersDaoMongo.js';
import { authTokenMiddleware } from '../utils/jwt.js';

const router = Router();
const userService = new UserDaoMongo();

router
    .get('/', authTokenMiddleware, async (req, res) => {
        try {
            const users = await userService.getUsers();
            res.send({
                status: 'success',
                payload: users
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Internal Server Error' });
        }
    })
    .get('/:uid', async (req, res) => {
        // Implementar la lógica para obtener un usuario por ID
        const { uid } = req.params;
        try {
            const user = await userService.getUserById(uid); // Suponiendo que existe este método
            res.send({
                status: 'success',
                payload: user
            });
        } catch (error) {
            console.log(error);
            res.status(404).send({ status: 'error', message: 'User not found' });
        }
    })
    .post('/', async (req, res) => {
        const newUser = req.body;
        try {
            const result = await userService.createUser(newUser);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ status: 'error', message: 'Bad Request' });
        }
    })
    .put('/:uid', async (req, res) => {
        // Implementar la lógica para actualizar un usuario por ID
        const { uid } = req.params;
        const updatedUser = req.body;
        try {
            const result = await userService.updateUser(uid, updatedUser); // Suponiendo que existe este método
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
            res.status(404).send({ status: 'error', message: 'User not found' });
        }
    })
    .delete('/:uid', async (req, res) => {
        // Implementar la lógica para eliminar un usuario por ID
        const { uid } = req.params;
        try {
            await userService.deleteUser(uid); // Suponiendo que existe este método
            res.send({ status: 'success', message: 'User deleted' });
        } catch (error) {
            console.log(error);
            res.status(404).send({ status: 'error', message: 'User not found' });
        }
    });

export default router;
