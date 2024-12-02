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
import Image from '../components/Image';

export const scene3Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 70,
    fontWeight: '900',
    letterSpacing: '1px',
    maxLines: 7,
    maxWidth: 995,
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
      <ImageOverlay color="#fbde05" opacity={0.5} />
      <Logo logo={props.logo} size={130} x={WIDTH * 0.7} y={HEIGHT * 0.75} delay={45} />

      <div
        style={{
          ...titleSplit.style,
          color: colorVar('black'),
          position: 'absolute',
          top: HEIGHT * 0.05,
          left: WIDTH * 0.5,
          textAlign: 'right',
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={17} />
      </div>
      <RectangularLines
        direction="topRightToBottomLeft"
        color="black"
        width={250}
        height={250}
        x={WIDTH * 0.38}
        y={HEIGHT * 0.73}
        delay={30}
      />

      <RectangularLines
        direction="topRightToBottomLeft"
        color="black"
        width={250}
        height={250}
        x={WIDTH * 0.15}
        y={HEIGHT * 0.27}
        delay={30}
      />
      <Image
        img={props.img}
        x={-WIDTH * 0.15}
        y={HEIGHT * 0}
        size={HEIGHT * 0.71}
        delay={22}
        background="#cdb100"
      />
    </AbsoluteFill>
  );
};

export default Scene3;
