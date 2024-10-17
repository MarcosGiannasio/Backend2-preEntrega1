import { userModel } from './models/users.model.js';

class UserDaoMongo {
    constructor() {
        this.model = userModel;
    }

    async getUsers() {
        return await this.model.find({});
    }

    async getUser(filter) {
        return await this.model.findOne(filter);
    }

    async createUser(newUser) {
        return await this.model.create(newUser);
    }
    
    async updateUser(uid) {
        // Implementar la lógica de actualización aquí
    }

    async deleteUser(uid) {
        // Implementar la lógica de eliminación aquí
    }
}

export default UserDaoMongo;

