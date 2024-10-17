import bcrypt from 'bcrypt';

// Definir la función para crear un hash de la contraseña
const createHash = (password) => {
    const salt = bcrypt.genSaltSync(10); // Generar un salt
    return bcrypt.hashSync(password, salt); // Crear el hash
};

// Definir la función para validar una contraseña
const isValidPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword); // Comparar la contraseña con el hash
};

// Exportar las funciones
export { createHash, isValidPassword };
