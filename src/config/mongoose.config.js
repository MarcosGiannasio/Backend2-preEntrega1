import { connect, Types } from "mongoose";

const connectDB = async () => {
    const URI = "mongodb://marcosgiannasio:<password>@cluster0.hqipxhf.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster0";

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await connect(URI, options);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1); // Salir del proceso en caso de error
    }
};

const isValidId = (id) => {
    return Types.ObjectId.isValid(id);
};

export default { connectDB, isValidId };
