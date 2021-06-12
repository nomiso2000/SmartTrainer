import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/auth/selectors';
import routes from '.';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  console.log(isAuthenticated);

  return (
    <Route
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to={routes.LOGIN.path} />
      }
    />
  );
};

export default PrivateRoute;
