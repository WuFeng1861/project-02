import React from 'react';
import { Music2, Blocks, Bot, Coins } from 'lucide-react';
import { Song } from '../types';

interface TopSongsProps {
  onSongSelect: (song: Song) => void;
  currentSong: Song | null;
}

const TopSongs: React.FC<TopSongsProps> = ({ onSongSelect, currentSong }) => {
  const categories = [
    { icon: <Blocks className="h-4 w-4" />, label: "区块链音乐" },
    { icon: <Bot className="h-4 w-4" />, label: "数字人音乐" },
    { icon: <Coins className="h-4 w-4" />, label: "NFT音乐专辑" },
  ];

  const topSongs: Song[] = [
    {
      id: 1,
      title: "BTC Anthem",
      artist: "MERC Crypto",
      coverUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&auto=format&fit=crop",
      duration: "3:45",
      rank: 1,
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      lyrics: [
        "Digital gold in the night",
        "Satoshi's vision shining bright",
        "Decentralized we unite",
        "Bitcoin leading us to light"
      ]
    },
    {
      id: 2,
      title: "Blockchain Revolution",
      artist: "MERC Chain",
      coverUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&auto=format&fit=crop",
      duration: "4:20",
      rank: 2,
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b147b6a.mp3",
      lyrics: [
        "Breaking free from the old ways",
        "Blockchain leading through the haze",
        "Decentralized amazing phase",
        "Future's bright in crypto days"
      ]
    },
    {
      id: 3,
      title: "Crypto Dreams",
      artist: "MERC Collective",
      coverUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&auto=format&fit=crop",
      duration: "3:58",
      rank: 3,
      audioUrl: "https://cdn.pixabay.com/download/audio/2023/02/28/audio_b39079c34d.mp3",
      lyrics: [
        "Mining through the digital space",
        "Crypto moving at its pace",
        "Building future's marketplace",
        "Decentralized embrace"
      ]
    },
    {
      id: 4,
      title: "HODL Life",
      artist: "MERC Beats",
      coverUrl: "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400&auto=format&fit=crop",
      duration: "4:15",
      rank: 4,
      audioUrl: "https://cdn.pixabay.com/download/audio/2023/03/19/audio_e243a239df.mp3",
      lyrics: [
        "HODL strong through day and night",
        "Diamond hands holding tight",
        "To the moon we take flight",
        "Future's looking crypto bright"
      ]
    },
    {
      id: 5,
      title: "Satoshi's Vision",
      artist: "MERC Protocol",
      coverUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&auto=format&fit=crop",
      duration: "3:33",
      rank: 5,
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_038b53dd0f.mp3",
      lyrics: [
        "In the code we trust",
        "Breaking banks to dust",
        "Decentralized is just",
        "Bitcoin's rise is must"
      ]
    },
    {
      id: 6,
      title: "Digital Gold",
      artist: "MERC Mining",
      coverUrl: "https://images.unsplash.com/photo-1631897642056-97a7abff6818?w=400&auto=format&fit=crop",
      duration: "4:02",
      rank: 6,
      audioUrl: "https://cdn.pixabay.com/download/audio/2023/05/15/audio_1b1b6f5e64.mp3",
      lyrics: [
        "Mining blocks in cyberspace",
        "Digital gold sets the pace",
        "Decentralized embrace",
        "Future money finds its place"
      ]
    }
  ];

  return (
    <div className="bg-black/20 rounded-lg backdrop-blur-sm">
      <div className="p-4 border-b border-[#00ff00]/10">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
          <Music2 className="h-5 w-5" />
          MERC Trending
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#00ff00]/30 scrollbar-track-[#00ff00]/5">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors text-[#00ff00] whitespace-nowrap drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
            >
              {category.icon}
              <span className="text-sm">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-[#00ff00]/10">
        {topSongs.map((song) => (
          <button
            key={song.id}
            onClick={() => onSongSelect(song)}
            className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-[#00ff00]/5 transition-colors ${
              currentSong?.id === song.id ? 'bg-[#00ff00]/10' : ''
            }`}
          >
            <div className="w-12 h-12 shrink-0">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium truncate text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">{song.title}</h3>
              <p className="text-sm text-[#00ff00]/70 truncate">{song.artist}</p>
            </div>
            <div className="text-sm text-[#00ff00]/70">{song.duration}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSongs;