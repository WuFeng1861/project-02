import React, { useState } from 'react';
import { X, Wand2 } from 'lucide-react';
import { Song } from '../types';

interface AIGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (song: Song) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    // 模拟 AI 生成过程
    setTimeout(() => {
      const generatedSong: Song = {
        id: Date.now(),
        title: `AI 生成: ${prompt.slice(0, 20)}...`,
        artist: 'MERC AI',
        coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop',
        duration: '3:30',
        rank: 0,
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_038b53dd0f.mp3',
        lyrics: prompt.split('\n').filter(line => line.trim()),
      };
      onGenerate(generatedSong);
      setIsGenerating(false);
      setPrompt('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black/90 rounded-lg w-full max-w-lg backdrop-blur-md border border-[#00ff00]/10">
        <div className="p-4 border-b border-[#00ff00]/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
            <Wand2 className="h-5 w-5" />
            AI 音乐生成
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#00ff00]">输入歌词或描述</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入歌词或描述你想要的音乐风格..."
              className="w-full h-40 px-3 py-2 bg-black/20 rounded-lg border border-[#00ff00]/10 focus:border-[#00ff00]/30 focus:ring-1 focus:ring-[#00ff00]/30 transition-colors resize-none text-[#00ff00] placeholder-[#00ff00]/50"
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-2 bg-[#00ff00]/10 rounded-lg hover:bg-[#00ff00]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
          >
            {isGenerating ? '生成中...' : '100枚MERC支付'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;