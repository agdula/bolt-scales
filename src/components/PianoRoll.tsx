import React, { useRef, useEffect } from 'react';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = [
  { note: 'C#', offset: 0.8 },
  { note: 'D#', offset: 1.8 },
  { note: 'F#', offset: 3.9 },
  { note: 'G#', offset: 4.95 },
  { note: 'A#', offset: 5.95 },
];

interface PianoRollProps {
  notes: string[];  // Format: "C4", "D#4", etc.
  rootNote?: string;  // New prop for root note
  className?: string;
}

export function PianoRoll({ notes, rootNote, className = '' }: PianoRollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive to container width
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 48; // fixed height
    }

    const notePattern = /([A-G][#]?)(\d+)?/;
    const parsedNotes = notes.map(note => {
      const match = note.match(notePattern);
      return match ? { 
        note: match[1],
        octave: match[2] ? parseInt(match[2]) : 4  // default to octave 4 if not specified
      } : null;
    }).filter(Boolean);

    const keyWidth = canvas.width / (7 * 2); // Adjust key width based on canvas width
    const keyHeight = canvas.height;
    const blackKeyWidth = keyWidth * 0.6;
    const blackKeyHeight = keyHeight * 0.6;

    // Fill background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw white keys
    ctx.strokeStyle = '#999';
    for (let octave = 0; octave < 2; octave++) {
      whiteKeys.forEach((note, i) => {
        const x = (octave * 7 + i) * keyWidth;
        const isHighlighted = parsedNotes.some(n => n.note === note);
        const isFirstNote = parsedNotes[0]?.note === note;
        const isRootNote = note === rootNote;
        
        if (isHighlighted) {
          ctx.fillStyle = isRootNote ? '#22C55E' : isFirstNote ? '#EF4444' : '#3B82F6';  // Green for root, red for first, blue for others
          ctx.fillRect(x, 0, keyWidth, keyHeight);
        }
        ctx.strokeRect(x, 0, keyWidth, keyHeight);
      });
    }

    // Draw black keys
    for (let octave = 0; octave < 2; octave++) {
      blackKeys.forEach(({ note, offset }) => {
        const x = (octave * 7 + offset) * keyWidth - blackKeyWidth/2;
        const isHighlighted = parsedNotes.some(n => n.note === note);
        const isFirstNote = parsedNotes[0]?.note === note;
        const isRootNote = note === rootNote;

        ctx.fillStyle = isHighlighted 
          ? (isRootNote ? '#16A34A' : isFirstNote ? '#DC2626' : '#2563EB')  // Darker green for root, darker red for first, darker blue for others
          : '#1F2937';
        ctx.fillRect(x, 0, blackKeyWidth, blackKeyHeight);
        ctx.strokeRect(x, 0, blackKeyWidth, blackKeyHeight);
      });
    }
  }, [notes, rootNote]);

  return (
    <div className={`w-full ${className}`}>
      <canvas ref={canvasRef} className="h-12 w-full" />
    </div>
  );
}
