import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 10,
          scene1Duration: 105,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'RIDE BEYOND THE ORDINARY',
            img: staticFile('Media_1.jpg'),
          },
          scene2Duration: 190,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              "DISCOVER CINCINNATI'S PREMIER HARLEY DEALERSHIP, WHERE RIDERS FIND THEIR PERFECT BIKE AND MORE",
          },
          scene3Duration: 170,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title:
              'FINDING A DEALERSHIP THAT OFFERS NOT ONLY A WIDE INVENTORY BUT ALSO SPECIALIZED SERVICES AND EXPERT CARE CAN BE A CHALLENGE',
          },
          scene4Duration: 203,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title:
              'WE PROVIDE CERTIFIED TECHNICIANS, COMPETITIVE FINANCING, AND EVEN A UNIQUE IN-HOUSE TATTOO SHOP TO ENHANCE YOUR RIDING LIFESTYLE',
          },
          scene5Duration: 152,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_5.jpg'),
            title: 'WE DELIVER A ONE - STOP EXPERIENCE TAILORED FOR PASSIONATE RIDERS',
          },
          scene6Duration: 115,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'VISIT US TODAY AT WEST CHESTER, OH. OR CALL US 513-874-4343',
            img: staticFile('Media_1.jpg'),
          },
        }}
      />
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 10,
          scene1Duration: 105,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'RIDE BEYOND THE ORDINARY',
            img: staticFile('Media_1.jpg'),
          },
          scene2Duration: 190,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              "DISCOVER CINCINNATI'S PREMIER HARLEY DEALERSHIP, WHERE RIDERS FIND THEIR PERFECT BIKE AND MORE",
          },
          scene3Duration: 170,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title:
              'FINDING A DEALERSHIP THAT OFFERS NOT ONLY A WIDE INVENTORY BUT ALSO SPECIALIZED SERVICES AND EXPERT CARE CAN BE A CHALLENGE',
          },
          scene4Duration: 203,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title:
              'WE PROVIDE CERTIFIED TECHNICIANS, COMPETITIVE FINANCING, AND EVEN A UNIQUE IN-HOUSE TATTOO SHOP TO ENHANCE YOUR RIDING LIFESTYLE',
          },
          scene5Duration: 152,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_5.jpg'),
            title: 'WE DELIVER A ONE - STOP EXPERIENCE TAILORED FOR PASSIONATE RIDERS',
          },
          scene6Duration: 115,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'VISIT US TODAY AT WEST CHESTER, OH. OR CALL US 513-874-4343',
            img: staticFile('Media_1.jpg'),
          },
        }}
      />
    </>
  );
};
