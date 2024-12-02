import { Fragment } from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

export const TitleTextFromRight = ({
  text,
  startAt = 0,
  x = 0,
  y = 0,
}: {
  text: string;
  startAt?: number;
  x?: number;
  y?: number;
}) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: y,
        left: x,
      }}
    >
      {lines.map((line, lineIndex) => {
        const lineStartFrame = startAt + lineIndex * 3;

        return (
          <p
            key={lineIndex}
            style={{
              margin: 0,
              position: 'relative',
              display: 'inline-block',
              lineHeight: '80px',
            }}
          >
            {line.split('').map((char, charIndex) => {
              if (char === ' ') {
                return (
                  <span key={`space-${lineIndex}-${charIndex}`} style={{ display: 'inline-block' }}>
                    &nbsp;
                  </span>
                );
              }
              const charStartFrame = lineStartFrame + charIndex * 0.6;

              const translateY = interpolate(frame - charStartFrame, [0, 5, 10], [0, -40, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.ease,
              });

              const opacity = interpolate(frame - charStartFrame, [0, 5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              });

              const scale = interpolate(frame - charStartFrame, [0, 3, 5, 10], [0, 1.5, 1.1, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              });

              return (
                <Fragment key={`char-${lineIndex}-${charIndex}`}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateY(${translateY}px) scaleY(${scale})`,
                      opacity,
                      fontStyle: 'italic',
                      lineHeight: '80px',
                    }}
                  >
                    {char}
                  </span>
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
