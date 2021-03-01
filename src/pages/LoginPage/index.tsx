import { Center, Input, Button, Box, Text, Spinner, useToast } from '@chakra-ui/react';
import { useUpdateAtom } from 'jotai/utils';
import * as React from 'react';
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
  const toast = useToast();
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
      toast({
        title: 'Login failed',
        description: status.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Center w="100%">
      <Box maxW="20rem" p={4}>
        <Input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Enter e-mail"
          marginBottom={1}
        />
        <Input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Enter password"
          marginBottom={1}
        />
        <Button onClick={() => login()} isDisabled={isLoading}>
          {isLoading ? <Spinner /> : <Text>Login</Text>}
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPage;
