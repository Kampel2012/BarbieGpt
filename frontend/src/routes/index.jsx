import DialogGPT from '../components/DiablogGPT/DialogGPT';
import MainPage from '../views/MainPage';
import PromoPage from '../views/PromoPage';
import Signin from '../views/Signin';
import Signup from '../views/Signup';

const routes = [
  {
    path: '/main',
    element: <MainPage />,
    children: [
      {
        path: ':chatId',
        element: <DialogGPT />,
      },
    ],
  },
  {
    path: '/',
    element: <PromoPage />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
];

export default routes;
