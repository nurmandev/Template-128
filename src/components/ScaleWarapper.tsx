import { PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { HEIGHT, WIDTH } from '../lib/consts';

const ScaleWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const frame = useCurrentFrame();

  // Scale animation for the main content
  const scale = interpolate(frame, [0, 45], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const deltaWidth = (scale - 1) * WIDTH;
  const deltaHeight = (scale - 1) * HEIGHT;

  const translateX = -deltaWidth / 2;
  const translateY = -deltaHeight / 2;

  const renderSides = (direction: string) => {
    // Position the mirrored sides at the edges of the container
    let positionStyle = {};

    switch (direction) {
      case 'left':
        positionStyle = { left: -WIDTH + translateX + 5, top: 0, transform: `translateX(-100%)` };
        break;
      case 'right':
        positionStyle = { left: WIDTH - translateX - 5, top: 0, transform: `translateX(100%)` };
        break;
      case 'up':
        positionStyle = { top: -HEIGHT + translateY + 5, left: 0, transform: `translateY(-100%)` };
        break;
      case 'down':
        positionStyle = { top: HEIGHT - translateY - 5, left: 0, transform: `translateY(100%)` };
        break;
      default:
        positionStyle = { left: 0, top: 0 };
    }

    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          ...positionStyle,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `scale(1)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill>
      {/* Main content scaling */}
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>{children}</AbsoluteFill>

      {/* Render mirrored sides at the edges */}
      {renderSides('left')}
      {renderSides('right')}
      {renderSides('up')}
      {renderSides('down')}
    </AbsoluteFill>
  );
};

export default ScaleWrapper;
