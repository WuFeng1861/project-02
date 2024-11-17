import { useState, useEffect, useRef } from 'react';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const { currentTime: current, duration: total } = audioRef.current;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
      setDuration(formatTime(total));
    }
  };

  const play = async (url: string) => {
    try {
      setIsLoading(true);
      
      if (audioRef.current) {
        if (audioRef.current.src !== url) {
          audioRef.current.src = url;
          audioRef.current.load();
        }
        
        audioRef.current.addEventListener('loadeddata', () => {
          setIsLoading(false);
          void audioRef.current?.play();
        }, { once: true });
        
        audioRef.current.addEventListener('timeupdate', updateProgress);
        audioRef.current.addEventListener('error', (e) => {
          console.error('Error loading audio:', e);
          setIsLoading(false);
        });

        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolumeLevel = (level: number) => {
    if (audioRef.current) {
      audioRef.current.volume = level;
      setVolume(level);
    }
  };

  return {
    play,
    pause,
    progress,
    currentTime,
    duration,
    volume,
    setVolume: setVolumeLevel,
    isLoading
  };
};