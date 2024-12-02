import { Img, useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';

interface LogoProps {
  logo: string;
  size: number;
  x?: number;
  y?: number;
  delay?: number;
}

const Logo = ({ logo, size, x = 0, y = 0, delay = 0 }: LogoProps) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Img
        src={logo}
        style={{
          width: 'auto',
          height: size,
          position: 'absolute',
          left: x,
          top: y,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

export default Logo;
