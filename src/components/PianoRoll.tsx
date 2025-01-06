import React from 'react';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = [
  { note: 'C#', offset: 0.8 },
  { note: 'D#', offset: 1.8 },
  { note: 'F#', offset: 3.9 },
  { note: 'G#', offset: 4.95 },
  { note: 'A#', offset: 5.95 },
];

interface PianoRollProps {
  notes: string[];
  className?: string;
}

export function PianoRoll({ notes, className = '' }: PianoRollProps) {
  const whiteKeyWidth = 100 / 7;

  return (
    <div className={`relative h-8 w-16 border border-gray-300 rounded-sm shadow-sm overflow-hidden ${className}`}>
      {/* White keys */}
      <div className="flex h-full">
        {whiteKeys.map((note, i) => (
          <div
            key={i}
            className={`
              relative flex-1 border-l border-gray-300 first:border-l-0
              ${notes.includes(note) 
                ? 'bg-blue-500' 
                : 'bg-white'
              }
              hover:bg-opacity-90
              transition-colors duration-100
            `}
          />
        ))}
      </div>
      
      {/* Black keys */}
      <div className="absolute top-0 left-0 h-[58%] w-full pointer-events-none">
        {blackKeys.map(({ note, offset }, i) => (
          <div
            key={i}
            className={`
              absolute w-[5px] h-full
              border border-gray-900
              ${notes.includes(note)
                ? 'bg-blue-600'
                : 'bg-gray-800'
              }
              hover:bg-opacity-90
              transition-colors duration-100
            `}
            style={{
              left: `calc(${offset * whiteKeyWidth}% - 2.5px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
