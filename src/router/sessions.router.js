import { Router } from 'express';
import UserDaoMongo from '../daos/Mongo/usersDaoMongo.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

const ROUTER = Router();
const usersService = new UserDaoMongo();

ROUTER.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log(first_name, last_name, email, password);

    if (!first_name || !email || !password) {
        return res.status(400).send({ status: 'error', message: 'Deben venir todos los campos requeridos' });
    }

    const userFound = await usersService.getUser({ email });
    console.log(userFound);

    if (userFound) {
        return res.status(401).send({ status: 'error', message: 'El usuario con ese email ya existe' });
    }

    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password) // crear hash
    };

    const result = await usersService.createUser(newUser);

    res.send({
        status: 'success',
        data: result
    });
});

ROUTER.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'Deben venir todos los campos requeridos' });
    }

    const userFound = await usersService.getUser({ email });
    if (!userFound) {
        return res.status(401).send({ status: 'error', message: 'No se encuentra el usuario con ese email' });
    }

    // validar password 
    if (!isValidPassword(password, userFound.password)) {
        return res.status(401).send({ status: 'error', message: 'Las credenciales no coinciden' });
    }

    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        role: userFound.role === 'admin'
    });

    res.send({
        status: 'success',
        message: 'logged',
        token
    });
});

ROUTER.get('/current', (req, res) => {
    res.send('datos sensibles');
});

ROUTER.post('/logout', (req, res) => {
    res.send('logout');
});

export default ROUTER;
export { createHash, isValidPassword };
 
