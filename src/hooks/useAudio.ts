
import { useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current && !isInitializedRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitializedRef.current = true;
        
        // Resume context if it's suspended (Safari requirement)
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } catch (error) {
        console.warn('Failed to initialize audio context:', error);
      }
    }
  }, []);

  const createBeepSound = useCallback((frequency: number, duration: number, volume: number = 0.3) => {
    // Initialize audio context if not already done
    if (!audioContextRef.current) {
      initializeAudioContext();
    }

    if (!audioContextRef.current) {
      console.warn('Audio context not available');
      return;
    }

    try {
      const audioContext = audioContextRef.current;
      
      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

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
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }, [initializeAudioContext]);

  const playCountdownSound = useCallback(() => {
    createBeepSound(800, 0.1, 0.4);
  }, [createBeepSound]);

  const playWarningSound = useCallback(() => {
    createBeepSound(1000, 0.1, 0.3);
  }, [createBeepSound]);

  const playStartSound = useCallback(() => {
    // Initialize audio context on first user interaction
    initializeAudioContext();
    createBeepSound(600, 0.2, 0.5);
  }, [createBeepSound, initializeAudioContext]);

  const playFinishSound = useCallback(() => {
    // Play a celebratory finish sound - ascending tones
    createBeepSound(523, 0.3, 0.4); // C
    setTimeout(() => createBeepSound(659, 0.3, 0.4), 200); // E
    setTimeout(() => createBeepSound(784, 0.4, 0.5), 400); // G
  }, [createBeepSound]);

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
    playFinishSound,
    initializeAudioContext
  };
};
