import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    // Ajoutez d'autres routes ici si nécessaire
]);

export default router;