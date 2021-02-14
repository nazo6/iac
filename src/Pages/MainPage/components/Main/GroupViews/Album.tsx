import * as React from 'react';
import { useParams } from 'react-router-dom';

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  console.log(albumId);
  return <div>{albumId}</div>;
};
export default Album;
