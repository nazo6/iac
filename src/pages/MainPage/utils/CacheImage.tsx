import React from 'react';

const images = [];

export const CacheImage = ({ src }: { src: string }) => {
  const image = new Image();
  image.src = src;
  images.push(image);
  return <></>;
};
