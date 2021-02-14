import { CircularProgress } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getStatus } from './api/auth';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { authState, loginState } from './stores/app';

const RedirectRoot = () => {
  const login = useRecoilValue(loginState);
  return login.status === 'OK' ? <Redirect to="/app" /> : <Redirect to="/login" />;
};
const RedirectLogin = () => {
  const setAuthState = useSetRecoilState(authState);
  const [login, setLogin] = useRecoilState(loginState);
  const goApp = (token: string, userId: string) => {
    setAuthState({ token, userId });
    setLogin({ status: 'OK' });
  };
  return login.status !== 'OK' ? <LoginPage goApp={goApp} /> : <Redirect to="/app" />;
};
const RedirectApp = () => {
  const login = useRecoilValue(loginState);
  return login.status === 'OK' ? <MainPage /> : <Redirect to="/login" />;
};

const App = () => {
  const setLoggedIn = useSetRecoilState(loginState);
  const [authData, setAuthData] = useRecoilState(authState);
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
          setLoggedIn({ status: 'Error', message: res });
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
