import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getStatus } from './api/auth';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { authState } from './stores/app';

const App = () => {
  const [authData, setAuthData] = useRecoilState(authState);
  const [isReady, setIsReady] = React.useState(false);
  useEffect(() => {
    if (authData) {
      getStatus(authData.token, authData.userId).then((res) => {
        if (res.authenticated) {
          setIsReady(true);
        } else {
          setAuthData(null);
        }
      });
    }
  }, [authData]);
  let page;
  if (authData) {
    if (isReady) {
      page = <MainPage />;
    } else {
      page = <></>;
    }
  } else {
    page = <LoginPage />;
  }
  return page;
};

export default App;
