import { CircularProgress } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getStatus } from './api/auth';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { authStateAtom, loginStateAtom } from './stores/app';
import { useAtomValue } from 'jotai/utils';
import { useAtom } from 'jotai';

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
