import express, {Express} from 'express';
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './middlewares/error.middleware';
import { requestRouter } from './routes/requests.routes';
import fileUpload from "express-fileupload"

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
app.use('/api', requestRouter)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: {fileSize: 10000000}, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
}))

export default app;