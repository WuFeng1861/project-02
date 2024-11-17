import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Loader2 } from 'lucide-react';
import { Song } from '../types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import LyricsDisplay from './LyricsDisplay';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong, isPlaying, onPlayPause }) => {
  const { 
    play, 
    pause, 
    progress, 
    currentTime, 
    duration, 
    volume, 
    setVolume,
    isLoading
  } = useAudioPlayer();

  React.useEffect(() => {
    if (currentSong && isPlaying) {
      void play(currentSong.audioUrl);
    } else {
      pause();
    }
  }, [currentSong, isPlaying]);

  if (!currentSong) {
    return (
      <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
        <p className="text-center text-[#00ff00]/70">选择一首歌曲开始播放</p>
      </div>
    );
  }

  return (
    <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-lg truncate text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">{currentSong.title}</h3>
        <p className="text-[#00ff00]/70 text-sm truncate">{currentSong.artist}</p>
      </div>

      <LyricsDisplay 
        lyrics={currentSong.lyrics}
        currentTime={currentTime}
      />

      <div className="space-y-4">
        <div className="bg-[#00ff00]/10 rounded-full h-1">
          <div 
            className="bg-[#00ff00] h-full rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-[#00ff00]/70">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            className="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button 
            className="p-3 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors disabled:opacity-50 text-[#00ff00]"
            onClick={onPlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          <button 
            className="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[#00ff00]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-[#00ff00]/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00ff00]"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;