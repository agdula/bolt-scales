import React, { useState } from 'react';
import { NOTES, SCALES, generateScaleNotes, getChordName } from '../utils/music';
import { PianoRoll } from './PianoRoll';

export default function MusicTable() {
  const [rootNote, setRootNote] = useState('C');

  const getScaleDisplayName = (modeName: string): { parent: string } => {
    const modeOffsets = {
      'Ionian': 0,
      'Dorian': -2,
      'Phrygian': -4,
      'Lydian': -5,
      'Mixolydian': -7,
      'Aeolian': -9,
      'Locrian': -11
    };

    const offset = modeOffsets[modeName] || 0;
    const parentRootIndex = (NOTES.indexOf(rootNote) + offset + 12) % 12;
    const parentRoot = NOTES[parentRootIndex];
    
    return {
      parent: `${modeName} mode of ${parentRoot} Major`
    };
  };

  const getChordNotes = (note: string, quality: string): string[] => {
    const baseNotes = {
      'Maj7': [0, 4, 7, 11],
      'm7': [0, 3, 7, 10],
      '7': [0, 4, 7, 10],
      'm7b5': [0, 3, 6, 10],
      'Maj7#5': [0, 4, 8, 11],
      '7b9': [0, 4, 7, 10, 13],
      'o7': [0, 3, 6, 9]
    };

    const intervals = baseNotes[quality] || baseNotes['Maj7'];
    const rootIndex = NOTES.indexOf(note);
    return intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <label htmlFor="root-note" className="block text-sm font-medium text-gray-700 mb-2">
          Root Note
        </label>
        <select 
          id="root-note"
          value={rootNote} 
          onChange={(e) => setRootNote(e.target.value)}
          className="w-32 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Scale</th>
              {[1, 2, 3, 4, 5, 6, 7].map(degree => (
                <th key={degree} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  {degree === 1 ? '1 (Root)' : degree}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(SCALES).map(([name, scale], scaleIndex) => {
              const notes = generateScaleNotes(rootNote, scale);
              const scaleInfo = getScaleDisplayName(name);
              return (
                <tr key={name} className={`
                  ${scaleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  hover:bg-gray-100 transition-colors duration-150
                `}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border-r w-fit">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm">{scaleInfo.parent}</span>
                    </div>
                  </td>
                  {notes.map((note, index) => (
                    <td key={index} className="px-4 py-3 whitespace-nowrap text-gray-600 border-r">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-medium text-sm">
                          {getChordName(note, scale.chordQualities[index])}
                        </span>
                        <PianoRoll 
                          notes={getChordNotes(note, scale.chordQualities[index])}
                          className="hover:shadow-md transition-shadow duration-200"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}