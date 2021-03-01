import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';

const useScrollAware = (): [number, React.RefObject<HTMLDivElement>] => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animationFrame = useRef(0);

  const onScroll = useCallback((e) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      setScrollTop(scrollContainer.scrollTop);
      scrollContainer.addEventListener('scroll', onScroll);
      return () => scrollContainer.removeEventListener('scroll', onScroll);
    } else {
      return;
    }
  }, []);

  return [scrollTop, ref];
};

export default useScrollAware;
