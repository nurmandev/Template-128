import { Easing, interpolate, useCurrentFrame } from 'remotion';

type Direction =
  | 'leftToRight'
  | 'rightToLeft'
  | 'topToBottom'
  | 'bottomToTop'
  | 'topLeftToBottomRight'
  | 'bottomRightToTopLeft'
  | 'topRightToBottomLeft';

const RectangularLines = ({
  x = 0,
  y = 0,
  width,
  height,
  direction,
  opacity = 1,
  delay = 0,
  color = 'white',
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  direction: Direction;
  opacity?: number;
  delay?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();

  // Progress of clip-path based on frame and delay
  const clipPathProgress = interpolate(frame, [delay, 20 + delay], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Calculate the clip-path animation based on direction
  let clipPathAnimation: string;
  switch (direction) {
    case 'leftToRight':
      clipPathAnimation = `polygon(${clipPathProgress * 100}% 0%, 100% 0%, 100% 100%, ${clipPathProgress * 100}% 100%)`;
      break;
    case 'rightToLeft':
      clipPathAnimation = `polygon(0% 0%, ${100 - clipPathProgress * 100}% 0%, ${100 - clipPathProgress * 100}% 100%, 0% 100%)`;
      break;
    case 'topToBottom':
      clipPathAnimation = `polygon(0% 0%, 100% 0%, 100% ${clipPathProgress * 100}%, 0% ${clipPathProgress * 100}%)`;
      break;
    case 'bottomToTop':
      clipPathAnimation = `polygon(0% ${100 - clipPathProgress * 100}%, 100% ${100 - clipPathProgress * 100}%, 100% 100%, 0% 100%)`;
      break;
    case 'topLeftToBottomRight':
      clipPathAnimation = `polygon(0% 0%, ${clipPathProgress * 100}% 0%, ${clipPathProgress * 100}% ${clipPathProgress * 100}%, 0% ${clipPathProgress * 100}%)`;
      break;
    case 'bottomRightToTopLeft':
      clipPathAnimation = `polygon(${100 - clipPathProgress * 100}% ${100 - clipPathProgress * 100}%, 100% ${100 - clipPathProgress * 100}%, 100% 100%, ${100 - clipPathProgress * 100}% 100%)`;
      break;
    case 'topRightToBottomLeft':
      clipPathAnimation = `polygon(100% 0%, 100% ${clipPathProgress * 100}%, ${100 - clipPathProgress * 100}% ${clipPathProgress * 100}%, ${100 - clipPathProgress * 100}% 0%)`;
      break;

    default:
      clipPathAnimation = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
  }

  // Animate background position to move the lines across the fill
  const backgroundPosition = `${frame}px 0px`;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
        width: width || '100%',
        height: height || '100%',
        opacity,
        overflow: 'hidden', // Prevents overspill
      }}
    >
      <div
        style={{
          width: '100%', // Slightly oversized to cover edges
          height: '100%',
          backgroundImage: `repeating-linear-gradient(
            135deg,
            ${color},
            ${color} 1px,
            transparent 5px,
            transparent 25px
          )`,
          backgroundPosition, // Animate background position to create moving lines
          clipPath: clipPathAnimation,
          filter: 'blur(0.5px)', // Softens any visible hard edges
        }}
      />
    </div>
  );
};

export default RectangularLines;
