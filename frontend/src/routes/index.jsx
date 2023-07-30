import DialogGPT from '../components/DialogGPT/DialogGPT';
import ProtectedRoute from '../components/ProtectedRouter';
import MainPage from '../views/MainPage';
import PromoPage from '../views/PromoPage';
import Signin from '../views/Signin';
import Signup from '../views/Signup';

const routes = [
  {
    path: '/main',
    element: <ProtectedRoute element={MainPage} />,
    children: [
      {
        path: ':chatId',
        element: <ProtectedRoute element={DialogGPT} />,
      },
    ],
  },
  {
    path: '/',
    element: <PromoPage />,
  },
  {
    path: '/sign-in',
    element: <Signin />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
];

export default routes;
