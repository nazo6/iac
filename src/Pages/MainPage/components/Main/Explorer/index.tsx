import { TrackType } from '~/api/types/LibraryResponseType';
import * as React from 'react';
import { Vlist } from '~/components/Vlist';
import { Box } from '@chakra-ui/react';
import useResizeObserver from 'use-resize-observer';

type ExplorerPropsType = {
  data: Array<
    | {
        type: 'track';
        fileData: TrackType;
      }
    | {
        type: 'folder';
        title: string;
      }
  >;
  onTrackSelect?: (trackId: number) => void;
  onAlbumSelect?: (albumId: number) => void;
  onArtistSelect?: (artistId: number) => void;
  onGenreSelect?: (genre: string) => void;
  onFolderSelect?: (folderName: string) => void;
};
const Explorer: React.FC<ExplorerPropsType> = (props) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  return (
    <Box ref={ref} w="100%" h="100%">
      <Vlist
        listWidth={width}
        listHeight={height}
        itemRenderer={(index, style) => {
          const data = props.data[index];
          if (data.type === 'folder') {
            return (
              <div
                key={index}
                style={style}
                onClick={() => {
                  if (props.onFolderSelect) {
                    props.onFolderSelect(data.title);
                  }
                }}>
                {data.title}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={style}
                onClick={() => {
                  if (props.onTrackSelect) {
                    props.onTrackSelect(data.fileData.track);
                  }
                }}>
                {data.fileData.album_id}
              </div>
            );
          }
        }}
        itemCount={props.data.length}
        calcItemHeight={() => 50}
      />
    </Box>
  );
};

export default Explorer;
