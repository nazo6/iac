import * as React from 'react';

import { Box, Slider } from '@material-ui/core';

type SliderPropsType = {
  enabled: boolean;
  loading: boolean;
  currentTime: number | null;
  duration: number | null;
  changePosition: (seconds: number) => void;
};

const ProgressSlider = (props: SliderPropsType) => {
  const [sliderPosState, setSliderPosState] = React.useState<number | null>(0);
  React.useEffect(() => {
    if (!props.loading) {
      setSliderPosState(null);
    }
  }, [props.loading]);
  return (
    <Box
      margin={0}
      position="absolute"
      bottom="0"
      width="100vw"
      left="0"
      className="transform translate-y-1/2">
      <Slider
        classes={{ root: 'p-1' }}
        max={props.duration ?? 0}
        disabled={!props.enabled}
        onChange={(_, value) => {
          setSliderPosState(value as number);
        }}
        onChangeCommitted={(_, value) => {
          props.changePosition(value as number);
        }}
        value={sliderPosState ?? props.currentTime ?? 0}
      />
    </Box>
  );
};

export default ProgressSlider;
