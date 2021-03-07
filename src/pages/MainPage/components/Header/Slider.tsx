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
  const [sliderPosState, setSliderPosState] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  React.useEffect(() => {
    if (!isDragging || !props.loading) {
      setSliderPosState(props.currentTime ?? 0);
    }
  }, [isDragging, props.currentTime, props.loading]);
  return (
    <Box
      margin={0}
      position="absolute"
      bottom="0"
      width="100vw"
      left="0"
      style={{ transform: 'translate(0, 50%)' }}>
      <Slider
        max={props.duration ?? 0}
        disabled={!props.enabled}
        onChange={(_, value) => {
          setIsDragging(true);
          setSliderPosState(value as number);
        }}
        onChangeCommitted={(_, value) => {
          props.changePosition(value as number);
          setIsDragging(false);
        }}
        value={sliderPosState}
      />
    </Box>
  );
};

export default ProgressSlider;
