import React, { useState } from 'react';
import { NOTES, SCALES, generateScaleNotes, getChordName, getChordQuality } from '../utils/music';

export default function MusicTable() {
  const [rootNote, setRootNote] = useState('C');

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
              return (
                <tr key={name} className={`
                  ${scaleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  hover:bg-gray-100 transition-colors duration-150
                `}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border-r">
                    {name}
                  </td>
                  {notes.map((note, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-gray-600 border-r">
                      {getChordName(note, scale.chordQualities[index])}
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