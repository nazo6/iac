import * as React from 'react';
import { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { Redirect, Route, Switch } from 'react-router-dom';

import { api } from './apis/api';
import MainPage from './pages/app/index';
import LoginPage from './pages/login';
import { authStateAtom, loginStateAtom } from './stores/app';
import { appInfo } from './utils/appInfo';

const getStatus = async (token: string, userId: string) => {
  const response = await api.JSON.status.$post({
    body: {
      _token: token,
      _userid: userId,
      mode: 'status',
      client: appInfo.client,
      device_name: appInfo.deviceName,
      version: appInfo.version,
      supported_types: false,
      url: '//api.ibroadcast.com/s/JSON/status',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  return response;
};

const RedirectRoot = () => {
  const login = useAtomValue(loginStateAtom);
  return login.status === 'OK' ? <Redirect to="/app" /> : <Redirect to="/login" />;
};
const RedirectLogin = () => {
  const [login] = useAtom(loginStateAtom);
  return login.status !== 'OK' ? <LoginPage /> : <Redirect to="/app" />;
};
const RedirectApp = () => {
  const login = useAtomValue(loginStateAtom);
  return login.status === 'OK' ? <MainPage /> : <Redirect to="/login" />;
};

const App = () => {
  const [, setLoggedIn] = useAtom(loginStateAtom);
  const [authData, setAuthData] = useAtom(authStateAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      if (authData) {
        const res = await getStatus(authData.user.token, authData.user.userid);
        if (res.authenticated) {
          setLoggedIn({ status: 'OK' });
          setAuthData(res);
          setIsLoading(false);
        } else {
          setLoggedIn({ status: 'Error', message: '' });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    f();
  }, []);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Switch>
      <Route path="/app">
        <RedirectApp />
      </Route>
      <Route path="/login">
        <RedirectLogin />
      </Route>
      <Route path="/">
        <RedirectRoot />
      </Route>
    </Switch>
  );
};

export default App;
