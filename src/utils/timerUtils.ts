
export const formatTimeDisplay = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getCurrentCycleNumber = (currentSet: number, totalRounds: number, currentRound: number) => 
  (currentSet - 1) * totalRounds + currentRound;

export const getTotalCycles = (totalRounds: number, totalSets: number) => 
  totalRounds * totalSets;

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

export const getStateInfo = (isRunning: boolean, timerState: TimerState) => {
  if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
    return { text: 'PAUSED', color: 'bg-[#ffeb47]' };
  }
  
  switch (timerState) {
    case 'idle':
      return { text: 'READY', color: 'bg-[#f0eeeb]' };
    case 'countdown':
      return { text: 'GET READY', color: 'bg-[#ff8b47]' };
    case 'work':
      return { text: 'WORK', color: 'bg-[#5bff72]' };
    case 'rest':
      return { text: 'REST', color: 'bg-[#5ba8ff]' };
    case 'setRest':
      return { text: 'SET REST', color: 'bg-[#5beddb]' };
    case 'finished':
      return { text: 'FINISHED', color: 'bg-[#ff8b47]' };
    default:
      return { text: 'READY', color: 'bg-[#f0eeeb]' };
  }
};

export const getBackgroundColor = (isRunning: boolean, timerState: TimerState) => {
  if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
    return 'rgba(255, 235, 71, 0.15)'; // PAUSED - yellow with 15% opacity
  }
  
  switch (timerState) {
    case 'idle':
      return 'white'; // READY - keep white background
    case 'countdown':
      return 'rgba(255, 139, 71, 0.15)'; // GET READY - orange with 15% opacity
    case 'work':
      return 'rgba(91, 255, 114, 0.15)'; // WORK - green with 15% opacity
    case 'rest':
      return 'rgba(91, 168, 255, 0.15)'; // REST - blue with 15% opacity
    case 'setRest':
      return 'rgba(91, 237, 219, 0.15)'; // SET REST - cyan with 15% opacity
    case 'finished':
      return 'rgba(255, 139, 71, 0.15)'; // FINISHED - orange with 15% opacity
    default:
      return 'white';
  }
};
