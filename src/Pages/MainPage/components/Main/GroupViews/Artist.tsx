import * as React from 'react';
import { useParams } from 'react-router-dom';

const Artist = () => {
  const { artistId } = useParams<{ artistId: string }>();
  console.log(artistId);
  return <div>{artistId}</div>;
};
export default Artist;
