import express, {Express} from 'express';
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './middlewares/error.middleware';
import { requestRouter } from './routes/requests.routes';

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

export default app;