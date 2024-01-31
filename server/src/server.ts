import express, {Express, Request, Response} from 'express';
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/user.routes';
import logoRoutes from './routes/logo.routes';

const app: Express = express();
const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/data', logoRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the API World" });
});



export default app;