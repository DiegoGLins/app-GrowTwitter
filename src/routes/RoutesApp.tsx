import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ProfilelUser from '../pages/ProfileUser'
import Explorer from '../pages/Explorer'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/cadastro',
        element: <Cadastro />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/profile-user',
        element: <ProfilelUser />
    },
    {
        path: '/explorer',
        element: <Explorer />
    }
])

const RoutesApp: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default RoutesApp
