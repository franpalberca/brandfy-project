import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmailParams,} from '../controllers/user.controller';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/allusers', getAllUsers)
    .delete('/:userId', deleteUserById);

export default userRoutes;