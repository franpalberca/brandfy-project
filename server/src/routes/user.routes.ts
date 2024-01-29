import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmailParams,} from '../controllers/user.controller';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/allusers', getAllUsers)
    // .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;