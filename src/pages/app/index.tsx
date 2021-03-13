import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { useAtomValue } from 'jotai/utils';

import Header from '~/components/Header';
import { authStateAtom } from '~/stores/app';
import { libraryStateAtom } from '~/stores/library';
import { useUpdateLibrary } from '~/utils/hooks/useUpdateLibrary';

import WebSocketProvider from './WebSocketProvider';
import MainRoute from './route';

const MainPage = () => {
  const authData = useAtomValue(authStateAtom);
  const libraryData = useAtomValue(libraryStateAtom);
  const updateLibrary = useUpdateLibrary();

  React.useEffect(() => {
    const f = async () => {
      if (authData) {
        await updateLibrary(authData.user.token, authData.user.userid);
      }
    };
    f();
  }, []);
  return !libraryData ? (
    <Typography>Loading</Typography>
  ) : (
    <Box className="w-full flex flex-col">
      <WebSocketProvider />
      <Box>
        <Header />
      </Box>
      <Box className="flex-1 flex items-stretch flex-row">
        <MainRoute />
      </Box>
    </Box>
  );
};

export default MainPage;
