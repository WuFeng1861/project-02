import React from 'react';

interface LyricsDisplayProps {
  lyrics: string[];
  currentTime: string;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics }) => {
  return (
    <div className="h-[300px] mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00ff00]/30 scrollbar-track-[#00ff00]/5">
      <div className="space-y-2 p-4 text-center">
        {lyrics.map((line, index) => (
          <p
            key={index}
            className="text-[#00ff00]/90 hover:text-[#00ff00] transition-colors cursor-default drop-shadow-[0_0_2px_rgba(0,255,0,0.5)]"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LyricsDisplay;