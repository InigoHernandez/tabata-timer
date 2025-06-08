
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';

interface TimerSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restBetweenSets: number;
}

type TimerState = 'idle' | 'work' | 'rest' | 'setRest' | 'finished';

const TabataTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    workTime: 30,
    restTime: 15,
    rounds: 8,
    sets: 4,
    restBetweenSets: 45
  });
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(settings.workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(settings.workTime);
    setCurrentRound(1);
    setCurrentSet(1);
    setTimerState('idle');
  }, [settings.workTime]);

  const toggleTimer = () => {
    if (timerState === 'idle') {
      setTimerState('work');
      setCurrentTime(settings.workTime);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Handle state transitions
      if (timerState === 'work') {
        if (currentRound < settings.rounds) {
          setTimerState('rest');
          setCurrentTime(settings.restTime);
        } else if (currentSet < settings.sets) {
          setTimerState('setRest');
          setCurrentTime(settings.restBetweenSets);
          setCurrentRound(1);
          setCurrentSet(prev => prev + 1);
        } else {
          setTimerState('finished');
          setIsRunning(false);
        }
      } else if (timerState === 'rest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        setCurrentRound(prev => prev + 1);
      } else if (timerState === 'setRest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, timerState, currentRound, currentSet, settings]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} ${secs.toString().padStart(2, '0')}`;
  };

  const getStateText = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return 'PAUSED';
    }
    
    switch (timerState) {
      case 'work':
        return 'WORK';
      case 'rest':
        return 'REST';
      case 'setRest':
        return 'SET REST';
      case 'finished':
        return 'FINISHED';
      default:
        return 'READY';
    }
  };

  const getTotalCycles = () => settings.rounds * settings.sets;
  const getCurrentCycleNumber = () => (currentSet - 1) * settings.rounds + currentRound;

  const getRemainingTime = () => {
    let remaining = currentTime;
    
    // Add remaining rounds in current set
    if (timerState === 'work' && currentRound < settings.rounds) {
      const remainingRoundsInSet = settings.rounds - currentRound;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime);
    } else if (timerState === 'rest' && currentRound < settings.rounds) {
      const remainingRoundsInSet = settings.rounds - currentRound - 1;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime) + settings.workTime;
    }
    
    // Add remaining sets
    if (currentSet < settings.sets) {
      const remainingSets = settings.sets - currentSet;
      remaining += remainingSets * (settings.rounds * (settings.workTime + settings.restTime) + settings.restBetweenSets);
    }
    
    return remaining;
  };

  const renderProgressBars = () => {
    const bars = [];
    for (let set = 1; set <= settings.sets; set++) {
      const setBars = [];
      for (let round = 1; round <= settings.rounds; round++) {
        const isActive = set === currentSet && round === currentRound;
        const isCompleted = set < currentSet || (set === currentSet && round < currentRound);
        
        setBars.push(
          <div
            key={`${set}-${round}`}
            className={`w-2 h-8 ${
              isActive ? 'bg-foreground' : 
              isCompleted ? 'bg-muted-foreground' : 
              'bg-border'
            }`}
          />
        );
      }
      
      bars.push(
        <div key={set} className="flex gap-1">
          {setBars}
        </div>
      );
      
      if (set < settings.sets) {
        bars.push(
          <div key={`rest-${set}`} className="flex items-center justify-center w-8 h-8">
            <span className="text-sm font-medium">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-aspekta">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-[#FF6B35] text-sm font-medium tracking-wider mb-4">
            TABAT.APP — HIGH INTENSITY TRAINING
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-black mb-6 leading-tight">
            Maximum results in minimum time.
          </h1>
          <p className="text-4xl md:text-5xl font-light text-gray-400 leading-tight">
            Train smarter with scientific intervals.
          </p>
        </div>

        {/* Timer Card */}
        <Card className="overflow-hidden border border-[#E8E8E8] bg-[#F5F5F5] rounded-xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            {/* Left Panel - Timer */}
            <div className="lg:col-span-2 p-8 flex flex-col justify-center">
              {/* Progress Bars */}
              <div className="mb-8">
                <div className="flex gap-4 items-center justify-start">
                  {renderProgressBars()}
                </div>
              </div>

              {/* Timer Display */}
              <div className="space-y-6">
                <div className="text-left">
                  <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
                    {getStateText()}
                  </div>
                  <div className="text-9xl font-light tracking-tighter">
                    {formatTimeDisplay(currentTime)}
                  </div>
                </div>

                {/* Cycles */}
                <div className="text-left">
                  <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
                    CYCLES
                  </div>
                  <div className="text-4xl font-light">
                    {getCurrentCycleNumber()}/{getTotalCycles()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Settings & Controls */}
            <div className="border-l border-[#E8E8E8] bg-white p-6 flex flex-col">
              {/* Settings */}
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Number of tabatas</span>
                    <span className="font-medium">{settings.sets}</span>
                  </div>
                  <Slider
                    value={[settings.sets]}
                    onValueChange={value => setSettings(prev => ({ ...prev, sets: value[0] }))}
                    max={8}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rounds per tabatas</span>
                    <span className="font-medium">{settings.rounds}</span>
                  </div>
                  <Slider
                    value={[settings.rounds]}
                    onValueChange={value => setSettings(prev => ({ ...prev, rounds: value[0] }))}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time on</span>
                    <span className="font-medium">{formatTime(settings.workTime)}</span>
                  </div>
                  <Slider
                    value={[settings.workTime]}
                    onValueChange={value => setSettings(prev => ({ ...prev, workTime: value[0] }))}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time off</span>
                    <span className="font-medium">{formatTime(settings.restTime)}</span>
                  </div>
                  <Slider
                    value={[settings.restTime]}
                    onValueChange={value => setSettings(prev => ({ ...prev, restTime: value[0] }))}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rest between tabatas</span>
                    <span className="font-medium">{formatTime(settings.restBetweenSets)}</span>
                  </div>
                  <Slider
                    value={[settings.restBetweenSets]}
                    onValueChange={value => setSettings(prev => ({ ...prev, restBetweenSets: value[0] }))}
                    max={180}
                    min={30}
                    step={15}
                    className="w-full"
                  />
                </div>

                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  SAVE
                </Button>
              </div>

              {/* Remaining Time & Controls */}
              <div className="space-y-6 pt-6 border-t border-[#E8E8E8]">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
                    REMAINING
                  </div>
                  <div className="text-2xl font-light">
                    {formatTime(getRemainingTime())}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={resetTimer} 
                    size="lg" 
                    variant="outline" 
                    className="w-12 h-12 rounded-full p-0"
                  >
                    <Square className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={toggleTimer} 
                    size="lg" 
                    className="w-16 h-16 rounded-full p-0 bg-foreground text-background hover:bg-foreground/90"
                    disabled={timerState === 'finished'}
                  >
                    {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabataTimer;
