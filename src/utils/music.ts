export type Scale = {
  name: string;
  notes: string[];
};

export const PARALLEL_SCALES = [
  'Major',
  'Natural Minor',
  'Harmonic Minor',
  'Melodic Minor',
  'Dorian Minor',
  'Phrygian'
] as const;

export const SCALES: Scale[] = [
  { name: 'C', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  { name: 'G', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
  { name: 'D', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] },
  { name: 'A', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'] },
  { name: 'E', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'] },
  { name: 'B', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'] },
  { name: 'F#/Gb', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'] },
  { name: 'Db', notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'] },
  { name: 'Ab', notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'] },
  { name: 'Eb', notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'] },
  { name: 'Bb', notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'] },
  { name: 'F', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] }
];

export function getChordQuality(scaleType: string, chordNumber: number): string {
  const qualities = {
    'Major':          ['', 'm', 'm', '', '', 'm', '°'],
    'Natural Minor':  ['m', '°', '', 'm', 'm', '', ''],
    'Harmonic Minor': ['m', '°', '+', 'm', '', '', '°'],
    'Melodic Minor':  ['m', 'm', '+', '', '', '°', '°'],
    'Dorian Minor':   ['m', 'm', '', '', '', 'm', '°'],
    'Phrygian':       ['m', '', '', 'm', '°', '', 'm']
  };
  
  return qualities[scaleType as keyof typeof qualities][chordNumber - 1];
}

export type RelatedScale = {
  name: string;
  parent: string;
  notes: string[];
};

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SCALE_PATTERNS = {
  major: ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
  harmonicMinor: ['W', 'H', 'W', 'W', 'H', 'W+H', 'H'],
  melodicMinor: ['W', 'H', 'W', 'W', 'W', 'W', 'H']
} as const;

const MODE_NAMES_BY_SCALE = {
  major: [
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian'
  ],
  harmonicMinor: [
    'Harmonic Minor',
    'Locrian ♯6',
    'Ionian #5',
    'Dorian #4',
    'Phrygian Dominant',
    'Lydian #2',
    'Super Locrian bb7'
  ],
  melodicMinor: [
    'Melodic Minor',
    'Dorian b2',
    'Lydian Augmented',
    'Lydian Dominant',
    'Mixolydian b6',
    'Locrian ♮2',
    'Super Locrian'
  ]
} as const;

function rotateArray<T>(arr: T[], count: number): T[] {
  const rotation = count % arr.length;
  return [...arr.slice(rotation), ...arr.slice(0, rotation)];
}

function buildScale(startingNote: string, pattern: string[]): string[] {
  let currentNote = startingNote;
  let notes = [currentNote];
  
  for (let interval of pattern) {
    const currentIndex = NOTE_NAMES.indexOf(currentNote);
    const step = interval === 'W' ? 2 : interval === 'H' ? 1 : 3; // W+H = 3 semitones
    currentNote = NOTE_NAMES[(currentIndex + step) % 12];
    notes.push(currentNote);
  }
  
  return notes.slice(0, -1); // Remove the last note as it's the same as first
}

export function getRelatedScales(rootNote: string): RelatedScale[] {
  const relatedScales: RelatedScale[] = [];
  
  Object.entries(SCALE_PATTERNS).forEach(([scaleType, pattern]) => {
    NOTE_NAMES.forEach((startingNote) => {
      const notes = buildScale(startingNote, pattern);
      const rootIndex = notes.indexOf(rootNote);
      
      if (rootIndex !== -1) {
        const modeNumber = rootIndex + 1;
        const modeName = MODE_NAMES_BY_SCALE[scaleType as keyof typeof SCALE_PATTERNS][rootIndex];
        relatedScales.push({
          name: `${modeName} mode of ${startingNote} ${scaleType} (${modeNumber}th degree)`,
          parent: `${startingNote} ${scaleType}`,
          notes: rotateArray(notes, rootIndex),
          type: scaleType
        });
      }
    });
  });

  // Sort scales by preference
  return relatedScales.sort((a, b) => {
    // Prioritize common parent scales
    const commonKeys = ['C', 'G', 'F', 'D', 'Bb'];
    const aParentKey = a.parent.split(' ')[0];
    const bParentKey = b.parent.split(' ')[0];
    const aKeyIndex = commonKeys.indexOf(aParentKey);
    const bKeyIndex = commonKeys.indexOf(bParentKey);
    
    // First sort by scale type (major first)
    if (a.type !== b.type) {
      return a.type === 'major' ? -1 : 1;
    }
    
    // Then by common keys
    if (aKeyIndex !== bKeyIndex) {
      if (aKeyIndex === -1) return 1;
      if (bKeyIndex === -1) return -1;
      return aKeyIndex - bKeyIndex;
    }
    
    return 0;
  });
}