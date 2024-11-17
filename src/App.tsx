import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List, Music2, Plus } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import TopSongs from './components/TopSongs';
import AIGenerator from './components/AIGenerator';
import { Song } from './types';

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <nav className="border-b border-[#00ff00]/10 p-4 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 className="h-8 w-8 text-[#00ff00]" />
            <h1 className="text-2xl font-bold text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
              MERC Music
            </h1>
          </div>
          <button
            onClick={() => setShowAIGenerator(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
          >
            <Plus className="h-5 w-5" />
            <span>100枚MERC支付</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          <div>
            <TopSongs 
              onSongSelect={(song) => {
                setCurrentSong(song);
                setIsPlaying(true);
              }}
              currentSong={currentSong}
            />
          </div>
          
          <div className="lg:border-l lg:border-[#00ff00]/10 lg:pl-6">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
                <List className="h-5 w-5" />
                正在播放
              </h2>
              <MusicPlayer 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
              />
            </div>
          </div>
        </div>
      </main>

      <AIGenerator
        isOpen={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        onGenerate={(song) => {
          setCurrentSong(song);
          setIsPlaying(true);
          setShowAIGenerator(false);
        }}
      />
    </div>
  );
}

export default App;