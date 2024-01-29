import express, {Express} from 'express';
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './middlewares/error.middleware';
import fileUpload from "express-fileupload"
import userRoutes from './routes/user.routes';

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
const app: Express = express();
const corsOptions = {
	origin: APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware for parsing form data
app.use(errorHandler)
app.use('/user', userRoutes);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: {fileSize: 10000000}, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
}))

export default app;