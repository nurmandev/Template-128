import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import type {
  TransitionPresentationComponentProps,
  TransitionPresentation,
} from '@remotion/transitions';
import { HEIGHT, WIDTH } from '../lib/consts';

type SplitTransitionProps = {
  direction: 'vertical' | 'horizontal' | 'vertical-reverse' | 'horizontal-reverse'; // Specify vertical or horizontal split
};

const SplitPresentation: React.FC<TransitionPresentationComponentProps<SplitTransitionProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const { direction } = passedProps;
  const width = WIDTH;
  const height = HEIGHT;

  // Define two slices based on direction
  const gridSlices = direction.includes('vertical')
    ? [
        { finalX: 0, finalY: 0 }, // Left column
        { finalX: width / 2, finalY: 0 }, // Right column
      ]
    : [
        { finalX: 0, finalY: 0 }, // Top row
        { finalX: 0, finalY: height / 2 }, // Bottom row
      ];

  const getExitTranslate = (
    finalX: number,
    finalY: number,
    index: number // Use index to alternate directions
  ) => {
    switch (direction) {
      case 'vertical':
        // Vertical slices move up or down
        return index === 0
          ? { translateX: finalX, translateY: -height * 0.5 } // First slice moves up
          : { translateX: finalX, translateY: height * 0.5 }; // Second slice moves down

      case 'horizontal':
        // Horizontal slices move left or right
        return index === 0
          ? { translateX: -width * 0.5, translateY: finalY } // First slice moves left
          : { translateX: width * 0.5, translateY: finalY }; // Second slice moves right

      case 'vertical-reverse':
        // Vertical slices reverse: down or up
        return index === 0
          ? { translateX: finalX, translateY: height * 0.5 } // First slice moves down
          : { translateX: finalX, translateY: -height * 0.5 }; // Second slice moves up

      case 'horizontal-reverse':
        // Horizontal slices reverse: right or left
        return index === 0
          ? { translateX: width * 0.5, translateY: finalY } // First slice moves right
          : { translateX: -width * 0.5, translateY: finalY }; // Second slice moves left

      default:
        return { translateX: finalX, translateY: finalY }; // No movement fallback
    }
  };

  const exitingChildren = presentationDirection === 'exiting' && presentationProgress < 1;
  const enteringChildren = presentationDirection === 'entering' && presentationProgress === 1;

  const style = useMemo(() => {
    return {
      width,
      height,
    };
  }, []);

  const renderMirrors = (direction: string, x: number, y: number) => {
    // Compute mirrored positions
    let mirrorX = 0,
      mirrorY = 0,
      scale = '';

    switch (direction) {
      case 'left':
        mirrorX = -width + x;
        mirrorY = y;
        break;
      case 'right':
        mirrorX = width + x;
        mirrorY = y;
        break;
      case 'up':
        mirrorX = x;
        mirrorY = -height + y;
        break;
      case 'down':
        mirrorX = x;
        mirrorY = height + y;
        break;
      default:
        mirrorX = -width + x;
        mirrorY = y;
        break;
    }
    return (
      <div
        style={{
          width: width,
          height: height,
          overflow: 'hidden',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            ...style,
            transform: `translate(${mirrorX}px, ${mirrorY}px) ${scale}`,
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill>
      {presentationProgress >= 1 && (
        <AbsoluteFill style={{ overflow: 'hidden' }}>{children}</AbsoluteFill>
      )}
      {gridSlices.map((slice, index) => {
        const { finalX, finalY } = slice;

        // Alternate exit direction based on slice index
        const { translateX: exitTranslateX, translateY: exitTranslateY } = getExitTranslate(
          finalX,
          finalY,
          index
        );

        const adjustedProgress = presentationProgress;

        const translateX = interpolate(
          adjustedProgress,
          [0, 1],
          exitingChildren ? [finalX, exitTranslateX] : [width / 2 - finalX, finalX],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

        const translateY = interpolate(
          adjustedProgress,
          [0, 1],
          exitingChildren ? [finalY, exitTranslateY] : [height / 2 - finalY, finalY],
          {
            easing: Easing.inOut(Easing.cubic),
          }
        );

        return (
          <div
            key={index}
            style={{
              width: direction.includes('vertical') ? width / 2 : width,
              height: direction.includes('horizontal') ? height / 2 : height,
              overflow: 'hidden',
              position: 'absolute',
              left: finalX,
              top: finalY,
              zIndex: 2,
            }}
          >
            {(exitingChildren || enteringChildren) && (
              <div
                style={{
                  ...style,
                  transform: `translate(${-translateX}px, ${-translateY}px)`,
                }}
              >
                {children}
              </div>
            )}
            {exitingChildren && renderMirrors('left', -translateX, -translateY)}
            {exitingChildren && renderMirrors('right', -translateX, -translateY)}
            {exitingChildren && renderMirrors('up', -translateX, -translateY)}
            {exitingChildren && renderMirrors('down', -translateX, -translateY)}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const customSplitTransition = (
  props: SplitTransitionProps
): TransitionPresentation<SplitTransitionProps> => {
  return { component: SplitPresentation, props };
};
