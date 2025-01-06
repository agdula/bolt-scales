export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export interface Scale {
  intervals: number[];
  chordQualities: string[];
}

export const SCALES: { [key: string]: Scale } = {
  'Ionian': {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    chordQualities: ['Maj7', 'm7', 'm7', 'Maj7', '7', 'm7', 'm7b5']
  },
  'Dorian': {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    chordQualities: ['m7', 'm7', 'Maj7', '7', 'm7', 'm7b5', 'Maj7']
  },
  'Phrygian': {
    intervals: [0, 1, 3, 5, 7, 8, 10],
    chordQualities: ['m7', 'Maj7', '7', 'm7', 'm7b5', 'Maj7', 'm7']
  },
  'Lydian': {
    intervals: [0, 2, 4, 6, 7, 9, 11],
    chordQualities: ['Maj7', '7', 'm7', 'm7b5', 'Maj7', 'm7', 'm7']
  },
  'Mixolydian': {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    chordQualities: ['7', 'm7', 'm7b5', 'Maj7', 'm7', 'm7', 'Maj7']
  },
  'Aeolian': {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    chordQualities: ['m7', 'm7b5', 'Maj7', 'm7', 'm7', 'Maj7', '7']
  },
  'Locrian': {
    intervals: [0, 1, 3, 5, 6, 8, 10],
    chordQualities: ['m7b5', 'Maj7', 'm7', 'm7', 'Maj7', '7', 'm7']
  }
};

export function generateScaleNotes(rootNote: string, scale: Scale): string[] {
  const rootIndex = NOTES.indexOf(rootNote);
  return scale.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return NOTES[noteIndex];
  });
}

export function getChordQuality(scaleName: string, degree: number): string {
  const scale = SCALES[scaleName];
  return scale ? scale.chordQualities[degree - 1] : '';
}

export function getChordName(note: string, quality: string): string {
  return `${note}${quality}`;
}
