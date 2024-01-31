import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmailParams, loginUser,} from '../controllers/user.controller';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .post('/login', loginUser)
    .get('/allusers', getAllUsers)
    .delete('/:userId', deleteUserById);

export default userRoutes;