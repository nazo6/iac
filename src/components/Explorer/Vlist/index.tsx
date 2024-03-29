import * as React from 'react';
import { CSSProperties, useMemo } from 'react';

import { useAtom } from 'jotai';

import { vlistScrollPositionStateFamily } from './scrollState';
import useScrollAware from './useScrollAware';

type VlistProps = {
  itemRenderer: (index: number, style: CSSProperties) => React.ReactElement;
  itemCount: number;
  listHeight: number;
  listWidth: number;
  renderAhead?: number;
  calcItemHeight: (index: number) => number;
  /** Auto restore scroll position by this property */
  id: string;
};

export const Vlist = React.memo((props: VlistProps) => {
  const [scrollPos, saveScrollPos] = useAtom(vlistScrollPositionStateFamily(props.id));
  const [scrolledVerticalTopPosition, ref] = useScrollAware();

  React.useEffect(() => {
    if (scrollPos) {
      ref.current?.scrollTo(0, scrollPos);
    }
  }, []);
  React.useEffect(() => {
    saveScrollPos(scrolledVerticalTopPosition);
  }, [scrolledVerticalTopPosition]);

  const renderAhead = props.renderAhead ? props.renderAhead : 5;

  const itemDimensions = useMemo(() => {
    const heights: number[] = [];
    const verticalPositions = [0];
    for (let i = 0; i < props.itemCount; i++) {
      const itemHeight = props.calcItemHeight(i);
      heights.push(itemHeight);
      if (i >= 1) {
        verticalPositions.push(verticalPositions[i - 1] + heights[i - 1]);
      }
    }
    return { heights, verticalPositions };
  }, [props]);
  const totalHeight =
    itemDimensions.verticalPositions[props.itemCount - 1] +
    itemDimensions.heights[props.itemCount - 1];
  const firstVisibleNode = useMemo(
    () =>
      findStartNode(
        scrolledVerticalTopPosition,
        itemDimensions.verticalPositions,
        props.itemCount,
      ),
    [scrolledVerticalTopPosition, itemDimensions.verticalPositions, props.itemCount],
  );

  const startNode = Math.max(0, firstVisibleNode - renderAhead);

  const lastVisibleNode = useMemo(
    () =>
      findEndNode(
        itemDimensions.verticalPositions,
        firstVisibleNode,
        props.itemCount,
        props.listHeight,
      ),
    [
      itemDimensions.verticalPositions,
      firstVisibleNode,
      props.itemCount,
      props.listHeight,
    ],
  );
  const endNode = Math.min(props.itemCount - 1, lastVisibleNode + renderAhead);
  const children = useMemo(
    () =>
      new Array(props.itemCount).fill(null).map((_, index) =>
        props.itemRenderer(index, {
          height: itemDimensions.heights[index],
          width: props.listWidth,
          top: `${itemDimensions.verticalPositions[index]}px`,
          position: 'absolute',
        }),
      ),
    [
      itemDimensions.heights,
      itemDimensions.verticalPositions,
      props.itemCount,
      props.itemRenderer,
      props.listWidth,
    ],
  );

  return (
    <div
      style={{
        height: props.listHeight,
        width: props.listWidth,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      ref={ref}>
      <div
        style={{
          willChange: 'auto',
          height: totalHeight,
          position: 'relative',
        }}>
        <div
          style={{
            position: 'relative',
            willChange: 'transform',
          }}>
          {children.slice(startNode, endNode + 1)}
        </div>
      </div>
    </div>
  );
});

function findStartNode(
  scrolledVerticalTopPosition: number,
  nodePositions: number[],
  itemCount: number,
) {
  let startRange = 0;
  let endRange = itemCount - 1;
  while (endRange !== startRange) {
    // console.log(startRange, endRange);
    const middle = Math.floor((endRange - startRange) / 2 + startRange);

    if (
      nodePositions[middle] <= scrolledVerticalTopPosition &&
      nodePositions[middle + 1] > scrolledVerticalTopPosition
    ) {
      // console.log("middle", middle);
      return middle;
    }

    if (middle === startRange) {
      // edge case - start and end range are consecutive
      // console.log("endRange", endRange);
      return endRange;
    } else {
      if (nodePositions[middle] <= scrolledVerticalTopPosition) {
        startRange = middle;
      } else {
        endRange = middle;
      }
    }
  }
  return itemCount;
}

function findEndNode(
  nodePositions: number[],
  startNode: number,
  itemCount: number,
  height: number,
) {
  let endNode;
  for (endNode = startNode; endNode < itemCount; endNode++) {
    // console.log(nodePositions[endNode], nodePositions[startNode]);
    if (nodePositions[endNode] > nodePositions[startNode] + height) {
      // console.log(endNode);
      return endNode;
    }
  }
  return endNode;
}

export default Vlist;
