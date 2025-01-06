export type Scale = {
  name: string;
  notes: string[];
};

export const MODES = [
  'Ionian (Major)',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian (Minor)',
  'Locrian'
] as const;

export const SCALES: Scale[] = [
  { 
    name: 'C',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  },
  {
    name: 'C#/Db',
    notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
  }
];

export function getChordQuality(modeIndex: number, chordNumber: number): string {
  const qualities = [
    ['', 'm', 'm', '', '', 'm', '°'], // Ionian
    ['m', 'm', '', '', 'm', '°', ''], // Dorian
    ['m', '', '', 'm', '°', '', 'm'], // Phrygian
    ['', '', 'm', '°', '', 'm', 'm'], // Lydian
    ['', 'm', '°', '', 'm', 'm', ''], // Mixolydian
    ['m', '°', '', 'm', 'm', '', ''], // Aeolian
    ['°', '', 'm', 'm', '', '', 'm']  // Locrian
  ];
  
  return qualities[modeIndex][chordNumber - 1];
}