import React, { StrictMode, Suspense, useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as authOperations from '../redux/auth/operations';

import { getCurrentUserTrains } from '../redux/trains/operations';
import authSelectors from '../redux/auth/selectors';
import PrivateRoute from '../routes/PrivateRoute';
// import ErrorNotification from '../Notifications/Error';
// import Loader from '../Loader';
import routes from '../routes/index';
// import PrivateRoute from '../../HOC/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUserOper());
  }, []);

  return (
    <>
      {/* <StrictMode> */}
      <Suspense fallback={<h2>LOADING</h2>}>
        <Switch>
          {/* <Route
            exact
            path={routes.LOGIN.path}
            component={routes.LOGIN.component}
          /> */}
          <Route
            exact
            path={routes.REGISTER.path}
            component={routes.REGISTER.component}
          />
          <Route
            exact
            path={routes.LOGIN.path}
            component={routes.LOGIN.component}
          />
          <PrivateRoute
            exact
            path={routes.USERINFO.path}
            component={routes.USERINFO.component}
          />
          <PrivateRoute
            exact
            path={routes.HOME.path}
            component={routes.HOME.component}
          />
          <Redirect to={routes.HOME.path} />
        </Switch>
        {/* <PrivateRoute
            path={routes.NAVIGATION.path}
            component={routes.NAVIGATION.component}
          />
          <Redirect to={routes.HOME.path} />

        {loading && <Loader />}
        <ErrorNotification /> */}
      </Suspense>
      {/* </StrictMode> */}
    </>
  );
};

export default App;
