import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    atCreated: {
        type: Date,
        default: Date.now // Cambiado a Date.now para obtener la fecha actual
    }
});

// Crear el modelo
const userModel = model('users', userSchema);

// Exportar el modelo
export { userModel };
