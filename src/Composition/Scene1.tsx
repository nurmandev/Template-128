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
// import ScaleWrapper from '../components/ScaleWarapper';

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img: z.string(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 70,
    fontWeight: '900',
    letterSpacing: '1px',
    maxLines: 1,
    maxWidth: 1500,
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
    // <ScaleWrapper>
    <AbsoluteFill>
      <ImageOverlay img={props.img} />
      <Logo logo={props.logo} size={150} x={WIDTH * 0.38} y={HEIGHT * 0.38} delay={7} />

      <div
        style={{
          ...titleSplit.style,
          color: colorVar('black'),
          position: 'absolute',
          top: HEIGHT * 0.55,
          left: WIDTH * 0.21,
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={30} />
      </div>
      <RectangularLines
        direction="topRightToBottomLeft"
        color="#ffb000"
        width={200}
        height={200}
        x={100}
        y={HEIGHT - 100}
        delay={18}
      />

      <RectangularLines
        direction="topRightToBottomLeft"
        color="#ffb000"
        width={160}
        height={160}
        x={WIDTH - 80}
        delay={18}
        y={80}
      />
    </AbsoluteFill>
    // </ScaleWrapper>
  );
};

export default Scene1;
