import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from '../utils/loggers/Log4jsLogger.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? logger.log("⛔ Error al conectarse a MongoDB")
        : logger.log("🆗 Conectados a MongoDB")
})

export default mongoose;
