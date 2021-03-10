const getArtworkUrl = (
  artworkId: string | number,
  size?: 'icon' | 'small' | 'big' | 'original',
) => {
  const SERVER = 'https://artwork.ibroadcast.com/artwork/';
  let sizePrefix = '';
  switch (size) {
    case 'icon':
      sizePrefix = '-80';
      break;
    case 'small':
      sizePrefix = '-300';
      break;
    case 'big':
      sizePrefix = '-1000';
      break;
    default:
      break;
  }
  return SERVER + artworkId.toString() + sizePrefix;
};

export default getArtworkUrl;
