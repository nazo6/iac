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
        name: string;
        displayName?: string;
      }
  >;
  id: string;
  onTrackSelect?: (trackId: TrackType) => void;
  onAlbumSelect?: (albumId: number) => void;
  onArtistSelect?: (artistId: number) => void;
  onGenreSelect?: (genre: string) => void;
  onFolderSelect?: (folderName: string) => void;
};
const Explorer = (props: ExplorerPropsType) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  return (
    <Box ref={ref} w="100%" h="100%">
      <Vlist
        id={props.id}
        listWidth={width}
        listHeight={height}
        itemRenderer={(index, style) => {
          const data = props.data[index];
          if (data.type === 'folder') {
            const displayName = data.displayName ?? data.name;
            return (
              <div
                key={index}
                style={style}
                onClick={() => {
                  if (props.onFolderSelect) {
                    props.onFolderSelect(data.name);
                  }
                }}>
                {displayName}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={style}
                onClick={() => {
                  if (props.onTrackSelect) {
                    props.onTrackSelect(data.fileData);
                  }
                }}>
                {data.fileData.title}
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
