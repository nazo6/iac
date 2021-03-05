import * as React from 'react';

import { Box } from '@chakra-ui/react';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

type SliderPropsType = {
  enabled: boolean;
  currentTime: number | null;
  duration: number | null;
  changePosition: (seconds: number) => void;
};

const Slider = (props: SliderPropsType) => {
  const [sliderPosState, setSliderPosState] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  React.useEffect(() => {
    if (!isDragging) {
      setSliderPosState(props.currentTime ?? 0);
    }
  });
  return (
    <Box
      margin={0}
      pos="absolute"
      bottom="0"
      w="100vw"
      left="0"
      transform="translate(0, 50%)">
      <RcSlider
        max={props.duration ?? 0}
        disabled={!props.enabled}
        onBeforeChange={() => setIsDragging(true)}
        onChange={(value) => setSliderPosState(value)}
        onAfterChange={(value) => {
          props.changePosition(value);
          setIsDragging(false);
        }}
        value={sliderPosState}
      />
    </Box>
  );
};

export default Slider;
