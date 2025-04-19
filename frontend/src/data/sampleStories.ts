import { Story } from '../types';

export const sampleStories: Story[] = [
  {
    id: 'story-1',
    title: 'The Enchanted Forest',
    description: 'Navigate through an enchanted forest filled with magical creatures.',
    goal: 'Find the hidden treasure at the heart of the forest.',
    beats: [
      {
        id: 'beat-1-1',
        text: 'You stand at the edge of the Enchanted Forest. The trees loom tall, their branches swaying despite the absence of wind. A narrow path leads into the darkness.',
        order: 1,
      },
      {
        id: 'beat-1-2',
        text: 'As you venture deeper, you encounter a fork in the path. One trail is bathed in soft blue light, the other in a warm orange glow.',
        order: 2,
      },
      {
        id: 'beat-1-3',
        text: 'Further along your chosen path, you discover a small clearing with a bubbling spring at its center. A small fairy hovers nearby, watching you with curious eyes.',
        order: 3,
      },
      {
        id: 'beat-1-4',
        text: 'The forest grows denser, and you hear mysterious whispers coming from the trees around you. Something or someone seems to be following you.',
        order: 4,
      },
      {
        id: 'beat-1-5',
        text: 'You arrive at an ancient stone structure covered in glowing runes. It appears to be a doorway of some kind.',
        order: 5,
      },
    ],
  },
  {
    id: 'story-2',
    title: 'Space Explorer',
    description: 'Command a spaceship on a mission to an uncharted planet.',
    goal: 'Establish contact with an alien civilization.',
    beats: [
      {
        id: 'beat-2-1',
        text: 'Your ship emerges from hyperdrive near an uncharted planet. Sensors detect unusual energy readings from the surface.',
        order: 1,
      },
      {
        id: 'beat-2-2',
        text: 'As you enter the atmosphere, your ship encounters turbulence. Warning lights flash on the control panel.',
        order: 2,
      },
      {
        id: 'beat-2-3',
        text: 'After landing, you step out onto an alien landscape. Strange vegetation surrounds you, and the air is filled with unfamiliar scents.',
        order: 3,
      },
      {
        id: 'beat-2-4',
        text: 'Your equipment detects movement in the distance. Something is approaching your landing site.',
        order: 4,
      },
      {
        id: 'beat-2-5',
        text: 'You encounter a group of aliens. They communicate through a series of lights and sounds that your translator cannot interpret.',
        order: 5,
      },
    ],
  },
]; 