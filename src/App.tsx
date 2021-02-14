import { CircularProgress } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getStatus } from './api/auth';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { authStateAtom, loginStateAtom } from './stores/app';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useAtom } from 'jotai';

const RedirectRoot = () => {
  const login = useAtomValue(loginStateAtom);
  return login.status === 'OK' ? <Redirect to="/app" /> : <Redirect to="/login" />;
};
const RedirectLogin = () => {
  const setAuthState = useUpdateAtom(authStateAtom);
  const [login, setLogin] = useAtom(loginStateAtom);
  const goApp = (token: string, userId: string) => {
    setAuthState({ token, userId });
    setLogin({ status: 'OK' });
  };
  return login.status !== 'OK' ? <LoginPage goApp={goApp} /> : <Redirect to="/app" />;
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
        const res = await getStatus(authData.token, authData.userId);
        if (res.authenticated) {
          setLoggedIn({ status: 'OK' });
          setAuthData({ token: res.user.token, userId: res.user.user_id });
          setIsLoading(false);
        } else {
          setLoggedIn({ status: 'Error', message: '' });
          console.log(res);
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
