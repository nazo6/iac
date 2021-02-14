import { Center, Input, Button, Box, Text, Spinner, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { getStatusWithAuth } from '../../api/auth';

const LoginPage: React.FC<{ goApp: (token: string, userId: string) => void }> = (props) => {
  const toast = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const login = async () => {
    setIsLoading(true);
    const status = await getStatusWithAuth(email, password);
    setIsLoading(false);
    if (status.authenticated) {
      props.goApp(status.user.token, status.user.user_id);
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
      <Box maxW="20rem" p={4} color="white">
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
