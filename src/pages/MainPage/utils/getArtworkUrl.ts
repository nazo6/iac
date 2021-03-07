const getArtworkUrl = (
  artworkId: string | number,
  size?: 'icon' | 'small' | 'original',
) => {
  const SERVER = 'https://artwork.ibroadcast.com/artwork/';
  let sizePrefix = '';
  switch (size) {
    case 'icon':
      sizePrefix = '-150';
      break;
    case 'small':
      sizePrefix = '-300';
      break;
    default:
      break;
  }
  return SERVER + artworkId.toString() + sizePrefix;
};

export default getArtworkUrl;
