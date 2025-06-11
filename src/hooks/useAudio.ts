
import { useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const beepBuffersRef = useRef<{ [key: string]: AudioBuffer | null }>({});
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

  const loadBeepSound = useCallback(async (key: string, dataUrl: string) => {
    if (!audioContextRef.current) return;
    
    try {
      const response = await fetch(dataUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      beepBuffersRef.current[key] = audioBuffer;
      console.log(`${key} sound loaded`);
    } catch (error) {
      console.warn(`Failed to load ${key} sound:`, error);
      beepBuffersRef.current[key] = null;
    }
  }, []);

  const initializeAudio = useCallback(async () => {
    if (isInitializedRef.current) return;
    
    try {
      // Create AudioContext
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if suspended (browser autoplay policy)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Create and load different audio buffers
      const sounds = {
        countdown: createBeepDataUrl(800, 0.1, 0.4),
        warning: createBeepDataUrl(1000, 0.1, 0.3),
        workStart: createBeepDataUrl(600, 0.2, 0.5),
        restStart: createBeepDataUrl(400, 0.2, 0.4),
        setRestStart: createBeepDataUrl(500, 0.2, 0.4),
        finish1: createBeepDataUrl(523, 0.3, 0.4), // C
        finish2: createBeepDataUrl(659, 0.3, 0.4), // E
        finish3: createBeepDataUrl(784, 0.4, 0.5), // G
        test: createBeepDataUrl(440, 0.2, 0.3)
      };

      // Load all sounds
      await Promise.all(
        Object.entries(sounds).map(([key, dataUrl]) => loadBeepSound(key, dataUrl))
      );
      
      isInitializedRef.current = true;
      console.log('AudioContext and sounds initialized');
    } catch (error) {
      console.warn('Failed to initialize AudioContext:', error);
    }
  }, [loadBeepSound]);

  const playBeepAt = useCallback((soundKey: string, offsetInSeconds: number = 0) => {
    if (!audioContextRef.current || !beepBuffersRef.current[soundKey]) {
      console.warn(`Cannot play ${soundKey}: AudioContext or buffer not ready`);
      return;
    }
    
    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = beepBuffersRef.current[soundKey];
      source.connect(audioContextRef.current.destination);
      source.start(audioContextRef.current.currentTime + offsetInSeconds);
      
      console.log(`${soundKey} scheduled to play in ${offsetInSeconds}s`);
    } catch (error) {
      console.warn(`Error playing ${soundKey}:`, error);
    }
  }, []);

  // Schedule countdown beeps (5, 4, 3, 2, 1)
  const scheduleCountdownBeeps = useCallback((countdownDuration: number) => {
    if (!audioContextRef.current) return;
    
    console.log('Scheduling countdown beeps');
    // Schedule beeps for 5, 4, 3, 2, 1 seconds remaining
    for (let i = 0; i < 5; i++) {
      const timeUntilBeep = countdownDuration - 5 + i;
      if (timeUntilBeep >= 0) {
        playBeepAt('countdown', timeUntilBeep);
      }
    }
  }, [playBeepAt]);

  // Schedule last 4 seconds beeps for work/rest (4, 3, 2, 1)
  const scheduleLastFourBeeps = useCallback((totalTimeRemaining: number) => {
    if (!audioContextRef.current) return;
    
    console.log('Scheduling last 4 beeps');
    // Schedule beeps for 4, 3, 2, 1 seconds remaining
    for (let i = 0; i < 4; i++) {
      const timeUntilBeep = totalTimeRemaining - 4 + i;
      if (timeUntilBeep >= 0) {
        playBeepAt('warning', timeUntilBeep);
      }
    }
  }, [playBeepAt]);

  // Individual sound functions for immediate play
  const playCountdownSound = useCallback(() => {
    playBeepAt('countdown');
  }, [playBeepAt]);

  const playWarningSound = useCallback(() => {
    playBeepAt('warning');
  }, [playBeepAt]);

  const playStartSound = useCallback(() => {
    playBeepAt('workStart');
  }, [playBeepAt]);

  const playRestStartSound = useCallback(() => {
    playBeepAt('restStart');
  }, [playBeepAt]);

  const playSetRestStartSound = useCallback(() => {
    playBeepAt('setRestStart');
  }, [playBeepAt]);

  const playFinishSound = useCallback(() => {
    playBeepAt('finish1');
    playBeepAt('finish2', 0.2);
    playBeepAt('finish3', 0.4);
  }, [playBeepAt]);

  const testAudio = useCallback(() => {
    playBeepAt('test');
  }, [playBeepAt]);

  useEffect(() => {
    // Initialize on mount
    initializeAudio();
    
    return () => {
      // Clean up
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      Object.values(beepBuffersRef.current).forEach(buffer => {
        // AudioBuffers don't need explicit cleanup
      });
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
    testAudio,
    scheduleCountdownBeeps,
    scheduleLastFourBeeps
  };
};
