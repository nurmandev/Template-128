import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface ImageProps {
  img?: string;
  x: number; // Final horizontal position
  y: number; // Final vertical position (bottom is fixed)
  size?: number; // Size of the diamond
  delay?: number; // Delay for animation
  opacity?: number; // Opacity of the diamond
  background?: string;
  rotation?: number; // Angle of rotation in degrees
  reverse?: boolean;
}

const Image: React.FC<ImageProps> = ({
  img,
  x,
  y,
  size = 200,
  delay = 0,
  opacity = 1,
  background = 'transparent',
  rotation = 45, // Default rotation for diamond shape
  reverse = false,
}) => {
  const frame = useCurrentFrame();

  // Interpolate scale values
  const scale = interpolate(frame - delay, [0, 15, 20], [0, 1.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Inner circle scaling
  const scaleCircle = interpolate(frame - delay, [20, 40], reverse ? [1, 2] : [1.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: background,
        position: 'absolute',
        left: x,
        bottom: y, // Anchor at the bottom position
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: `right bottom`, // Key: Keep the bottom center fixed
        opacity,
        overflow: 'hidden',
        borderRadius: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid 10px black',
      }}
    >
      {img && (
        <img
          src={img}
          alt="diamond"
          style={{
            objectFit: 'cover',
            width: '95%',
            height: '95%',
            borderRadius: '100%',
            transform: `rotate(${-rotation}deg) scale(${scaleCircle})`, // Counter-rotate inner image
            overflow: 'hidden',
            border: 'solid 8px black',
          }}
        />
      )}
    </div>
  );
};

export default Image;
