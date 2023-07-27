import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { isAuth } = useContext(AuthContext);
  return (
    <>{isAuth ? <Component {...props} /> : <Navigate to="/signin" replace />}</>
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.func.isRequired,
};

export default ProtectedRoute;
