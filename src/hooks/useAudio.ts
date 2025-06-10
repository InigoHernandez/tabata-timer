
import { useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);
  const lastUserInteractionRef = useRef<number>(0);

  const initializeAudioContext = useCallback(() => {
    lastUserInteractionRef.current = Date.now();
    
    if (!audioContextRef.current && !isInitializedRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitializedRef.current = true;
        console.log('Audio context initialized:', audioContextRef.current.state);
      } catch (error) {
        console.warn('Failed to initialize audio context:', error);
      }
    }

    // Always try to resume context on user interaction
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().then(() => {
        console.log('Audio context resumed successfully');
      }).catch((error) => {
        console.warn('Failed to resume audio context:', error);
      });
    }
  }, []);

  const createBeepSound = useCallback((frequency: number, duration: number, volume: number = 0.3) => {
    // Check if we have recent user interaction (within 1 second)
    const timeSinceInteraction = Date.now() - lastUserInteractionRef.current;
    if (timeSinceInteraction > 1000) {
      console.warn('No recent user interaction, skipping audio');
      return;
    }

    if (!audioContextRef.current) {
      console.warn('Audio context not available');
      return;
    }

    const audioContext = audioContextRef.current;
    console.log('Attempting to play sound, context state:', audioContext.state);

    // Force resume if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        playSound(audioContext, frequency, duration, volume);
      }).catch((error) => {
        console.warn('Failed to resume for sound playback:', error);
      });
    } else {
      playSound(audioContext, frequency, duration, volume);
    }
  }, []);

  const playSound = (audioContext: AudioContext, frequency: number, duration: number, volume: number) => {
    try {
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
      
      console.log('Sound played successfully');
    } catch (error) {
      console.warn('Failed to create sound:', error);
    }
  };

  const playCountdownSound = useCallback(() => {
    createBeepSound(800, 0.1, 0.4);
  }, [createBeepSound]);

  const playWarningSound = useCallback(() => {
    createBeepSound(1000, 0.1, 0.3);
  }, [createBeepSound]);

  const playStartSound = useCallback(() => {
    initializeAudioContext();
    createBeepSound(600, 0.2, 0.5);
  }, [createBeepSound, initializeAudioContext]);

  const playFinishSound = useCallback(() => {
    // Play a celebratory finish sound - ascending tones
    createBeepSound(523, 0.3, 0.4); // C
    setTimeout(() => createBeepSound(659, 0.3, 0.4), 200); // E
    setTimeout(() => createBeepSound(784, 0.4, 0.5), 400); // G
  }, [createBeepSound]);

  // Test function to verify audio works on user interaction
  const testAudio = useCallback(() => {
    initializeAudioContext();
    createBeepSound(440, 0.2, 0.3);
  }, [initializeAudioContext, createBeepSound]);

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
    initializeAudioContext,
    testAudio
  };
};
