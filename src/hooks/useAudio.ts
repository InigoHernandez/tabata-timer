
import { useEffect, useRef } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const createBeepSound = (frequency: number, duration: number, volume: number = 0.3) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playCountdownSound = () => {
    createBeepSound(800, 0.1, 0.4);
  };

  const playWarningSound = () => {
    createBeepSound(1000, 0.1, 0.3);
  };

  const playStartSound = () => {
    createBeepSound(600, 0.2, 0.5);
  };

  const playFinishSound = () => {
    // Play a celebratory finish sound - ascending tones
    createBeepSound(523, 0.3, 0.4); // C
    setTimeout(() => createBeepSound(659, 0.3, 0.4), 200); // E
    setTimeout(() => createBeepSound(784, 0.4, 0.5), 400); // G
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playCountdownSound,
    playWarningSound,
    playStartSound,
    playFinishSound
  };
};
