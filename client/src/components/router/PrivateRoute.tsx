import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { HOME } from '../../config/routes/paths';

export const PrivateRoute = () => {
    const {  isAuthenticated, user } = useAuth0();
    console.log(user)

    if (!isAuthenticated) {
        return <div>Loading ...</div>;
    }
    return (
        <>
            {user ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Navigate to={HOME} />
            )}
        </>
    )

}