
import { useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const isInitializedRef = useRef(false);

  // Create audio data URLs for different beep sounds
  const createBeepDataUrl = (frequency: number, duration: number, volume: number = 0.3) => {
    const sampleRate = 44100;
    const samples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Generate sine wave
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * volume * 0x7FFF;
      view.setInt16(44 + i * 2, sample, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  const initializeAudio = useCallback(() => {
    if (isInitializedRef.current) return;
    
    try {
      // Create different audio elements for different sounds
      audioElementsRef.current = {
        countdown: new Audio(createBeepDataUrl(800, 0.1, 0.4)),
        warning: new Audio(createBeepDataUrl(1000, 0.1, 0.3)),
        workStart: new Audio(createBeepDataUrl(600, 0.2, 0.5)),
        restStart: new Audio(createBeepDataUrl(400, 0.2, 0.4)),
        setRestStart: new Audio(createBeepDataUrl(500, 0.2, 0.4)),
        finish1: new Audio(createBeepDataUrl(523, 0.3, 0.4)), // C
        finish2: new Audio(createBeepDataUrl(659, 0.3, 0.4)), // E
        finish3: new Audio(createBeepDataUrl(784, 0.4, 0.5)), // G
        test: new Audio(createBeepDataUrl(440, 0.2, 0.3))
      };

      // Preload all audio elements
      Object.values(audioElementsRef.current).forEach(audio => {
        audio.preload = 'auto';
        audio.load();
      });
      
      isInitializedRef.current = true;
      console.log('Audio elements initialized');
    } catch (error) {
      console.warn('Failed to initialize audio elements:', error);
    }
  }, []);

  const playSound = useCallback((soundName: keyof typeof audioElementsRef.current) => {
    if (!isInitializedRef.current) {
      initializeAudio();
    }
    
    const audio = audioElementsRef.current[soundName];
    if (!audio) return;
    
    try {
      // Reset and play
      audio.currentTime = 0;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Failed to play ${soundName} sound:`, error);
          // If autoplay is prevented, we can try again on next user interaction
        });
      }
      
      console.log(`${soundName} sound played`);
    } catch (error) {
      console.warn(`Error playing ${soundName} sound:`, error);
    }
  }, [initializeAudio]);

  const playCountdownSound = useCallback(() => {
    playSound('countdown');
  }, [playSound]);

  const playWarningSound = useCallback(() => {
    playSound('warning');
  }, [playSound]);

  const playStartSound = useCallback(() => {
    playSound('workStart');
  }, [playSound]);

  const playRestStartSound = useCallback(() => {
    playSound('restStart');
  }, [playSound]);

  const playSetRestStartSound = useCallback(() => {
    playSound('setRestStart');
  }, [playSound]);

  const playFinishSound = useCallback(() => {
    playSound('finish1');
    setTimeout(() => playSound('finish2'), 200);
    setTimeout(() => playSound('finish3'), 400);
  }, [playSound]);

  const testAudio = useCallback(() => {
    playSound('test');
  }, [playSound]);

  useEffect(() => {
    // Initialize on mount
    initializeAudio();
    
    return () => {
      // Clean up audio elements
      if (isInitializedRef.current) {
        Object.values(audioElementsRef.current).forEach(audio => {
          URL.revokeObjectURL(audio.src);
        });
      }
    };
  }, [initializeAudio]);

  return {
    playCountdownSound,
    playWarningSound,
    playStartSound,
    playRestStartSound,
    playSetRestStartSound,
    playFinishSound,
    initializeAudio,
    testAudio
  };
};
