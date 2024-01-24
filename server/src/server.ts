import express, {Express} from 'express';
import cors from 'cors'
import morgan from 'morgan'

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
const app: Express = express();
const corsOptions = {
	origin: APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware for parsing form data

export default app;