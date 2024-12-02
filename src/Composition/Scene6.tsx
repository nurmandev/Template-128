import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import Logo from '../components/Logo';
import ImageOverlay from '../components/ImageOverlay';
import RectangularLines from '../components/RectangularLines';

export const scene6Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img: z.string(),
});
type Scene6Props = z.infer<typeof scene6Schema> & { background: BackgroundProps };

const Scene6: React.FC<Scene6Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 70,
    fontWeight: '900',
    letterSpacing: '6px',
    maxLines: 2,
    maxWidth: 1400,
  });

  // const subtitleSplit = useTextSplitter({
  //   text: props.subtitle,
  //   fontSize: 100,
  //   fontWeight: '600',
  //   letterSpacing: '6px',
  //   maxLines: 1,
  //   maxWidth: 1000,
  // });

  return (
    <AbsoluteFill>
      <ImageOverlay img={props.img} />
      <Logo logo={props.logo} size={150} x={WIDTH * 0.38} y={HEIGHT * 0.38} delay={17} />

      <div
        style={{
          ...titleSplit.style,
          color: colorVar('black'),
          position: 'absolute',
          top: HEIGHT * 0.55,
          left: WIDTH * 0.18,
          textAlign: 'center',
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={21} />
      </div>
      <RectangularLines
        direction="topRightToBottomLeft"
        color="#ffb000"
        width={200}
        height={200}
        x={100}
        y={HEIGHT - 100}
      />

      <RectangularLines
        direction="topRightToBottomLeft"
        color="#ffb000"
        width={200}
        height={200}
        x={WIDTH - 100}
        y={100}
      />
    </AbsoluteFill>
  );
};

export default Scene6;