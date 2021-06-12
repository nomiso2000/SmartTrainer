import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/auth/selectors';
import routes from '../routes';

const withAuth = (WrappedComponent) => {
  function WithAuth() {
    const isAuth = useSelector(authSelectors.isAuthenticated);
    console.log(isAuth);
    return isAuth ? <Redirect to={routes.HOME.path} /> : <WrappedComponent />;
  }

  return WithAuth;
};

export default withAuth;
