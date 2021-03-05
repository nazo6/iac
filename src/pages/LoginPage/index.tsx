import * as React from 'react';

import {
  Alert,
  Box,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useUpdateAtom } from 'jotai/utils';

import { api } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { authStateAtom, loginStateAtom } from '~/stores/app';

const getStatusWithAuth = async (email: string, password: string) => {
  const response = await api.JSON.status.$post({
    body: {
      email_address: email,
      password,
      mode: 'status',
      client: appInfo.client,
      device_name: appInfo.deviceName,
      version: '3.1',
      supported_types: false,
      url: '//api.ibroadcast.com/s/JSON/status',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  return response;
};

const LoginPage = () => {
  const [toast, setToast] = React.useState({ open: false, message: '' });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const setLogin = useUpdateAtom(loginStateAtom);
  const setAuthState = useUpdateAtom(authStateAtom);
  const login = async () => {
    setIsLoading(true);
    const status = await getStatusWithAuth(email, password);
    setIsLoading(false);
    if (status.authenticated) {
      setAuthState(status);
      setLogin({ status: 'OK' });
    } else {
      setToast({ open: true, message: status.message });
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={8}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
              fullWidth
              pending={isLoading}
              variant="contained"
              color="primary"
              onClick={() => login()}>
              Sign in
            </LoadingButton>
          </div>
        </Box>
      </Container>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ open: false, message: '' })}>
        <Alert severity="error">{toast.message}</Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
