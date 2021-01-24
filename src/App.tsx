import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getStatus } from './api/auth';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { authState } from './stores/app';
import Rocon, { useNavigate, useRoutes } from 'rocon/react';

const toplevelRoutes = Rocon.Path()
  .exact({
    action: () => <p>Loading...</p>,
  })
  .route('app', (route) => route.action(() => <MainPage />))
  .route('login', (route) => route.action(() => <LoginPage />));

const Routes: React.FC = () => {
  return useRoutes(toplevelRoutes);
};

const App = () => {
  const [authData, setAuthData] = useRecoilState(authState);
  const [isReady, setIsReady] = React.useState(false);
  const navigate = useNavigate();
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
  if (authData) {
    if (isReady) {
      navigate(toplevelRoutes._.app);
    } else {
      navigate(toplevelRoutes.exactRoute);
    }
  } else {
    navigate(toplevelRoutes._.login);
  }
  return <Routes />;
};

export default App;
