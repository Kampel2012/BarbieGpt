import MainPage from '../views/MainPage';
import PromoPage from '../views/PromoPage';
import Signin from '../views/Signin';
import Signup from '../views/Signup';

const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/promo',
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
