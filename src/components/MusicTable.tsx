import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MODES, SCALES, getChordQuality, type Scale } from '../utils/music';

export default function MusicTable() {
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [isOpen, setIsOpen] = useState(false);

  const getChord = (modeIndex: number, chordNumber: number) => {
    const noteIndex = (chordNumber - 1 + modeIndex) % 7;
    const note = selectedScale.notes[noteIndex];
    const quality = getChordQuality(modeIndex, chordNumber);
    return note + quality;
  };

  return (
    <div className="p-6">
      <div className="relative mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span>Scale: {selectedScale.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {SCALES.map((scale) => (
              <button
                key={scale.name}
                onClick={() => {
                  setSelectedScale(scale);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                {scale.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-gray-100 px-4 py-2">Mode / Chord</th>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <th key={num} className="border bg-gray-100 px-4 py-2">
                  {num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map((mode, modeIndex) => (
              <tr key={mode}>
                <td className="border px-4 py-2 font-medium bg-gray-50">
                  {mode}
                </td>
                {[1, 2, 3, 4, 5, 6, 7].map((chordNum) => (
                  <td key={chordNum} className="border px-4 py-2 text-center">
                    {getChord(modeIndex, chordNum)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}