import { Img, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const random = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface LogoProps {
  img?: string;
  color?: string;
  opacity?: number;
}

const ImageOverlay = ({ img, color = '#ff6f01', opacity = 1 }: LogoProps) => {
  const frame = useCurrentFrame();

  const adjustedFrame = frame * 0.1;

  const randomFactorX = random(adjustedFrame * 0.5 + 10) * 300 - 150;
  const randomFactorY = random(adjustedFrame * 0.7 + 20) * 300 - 150;

  // Animate the noise/smoke movement
  const translateX = interpolate(adjustedFrame, [0, 30], [randomFactorX, randomFactorX * 1.5]);
  const translateY = interpolate(adjustedFrame, [0, 30], [randomFactorY, randomFactorY * 1.5]);
  const opacityA = interpolate(adjustedFrame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {img && (
        <AbsoluteFill>
          <Img
            src={img}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(1.5)`,
              opacity: opacityA,
            }}
          />
        </AbsoluteFill>
      )}
      <AbsoluteFill
        style={{
          background: `url('https://blog.demofox.org/wp-content/uploads/2021/04/perlin_8.png')`,
          backgroundSize: '150%',
          transform: `translate(${translateX}px, ${translateY}px) scale(3.5)`,
          mixBlendMode: 'multiply',
          opacity: opacity ? 0 : 0.3,
        }}
      />
      <AbsoluteFill
        style={{
          background: color,
          opacity: 0.8,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, rgba(0, 0, 0, 0) 75%, rgba(235, 60, 0, 1) 100%)`,
          pointerEvents: 'none',
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

export default ImageOverlay;
