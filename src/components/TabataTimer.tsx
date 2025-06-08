
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

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
    workTime: 20,
    restTime: 10,
    rounds: 8,
    sets: 1,
    restBetweenSets: 60
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(settings.workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [showSettings, setShowSettings] = useState(false);

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

  const getStateColor = () => {
    switch (timerState) {
      case 'work': return 'text-green-500';
      case 'rest': return 'text-blue-500';
      case 'setRest': return 'text-purple-500';
      case 'finished': return 'text-orange-500';
      default: return 'text-foreground';
    }
  };

  const getStateText = () => {
    switch (timerState) {
      case 'work': return 'WORK';
      case 'rest': return 'REST';
      case 'setRest': return 'SET REST';
      case 'finished': return 'FINISHED';
      default: return 'READY';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 font-aspekta font-light">
      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-wide text-foreground">TABATA</h1>
          <p className="text-muted-foreground text-xl font-light">High-intensity interval training</p>
        </div>

        {/* Main Timer Display */}
        <Card className="p-12 md:p-16 text-center space-y-8 bg-card/30 backdrop-blur-sm border-border/30">
          <div className={`text-3xl font-light tracking-wider ${getStateColor()}`}>
            {getStateText()}
          </div>
          
          <div className="text-[12rem] md:text-[16rem] font-light tabular-nums leading-none">
            {formatTime(currentTime)}
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">{currentRound}</div>
              <div className="text-lg font-light text-muted-foreground tracking-wide">ROUND</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">{currentSet}</div>
              <div className="text-lg font-light text-muted-foreground tracking-wide">SET</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">{settings.rounds * settings.sets}</div>
              <div className="text-lg font-light text-muted-foreground tracking-wide">TOTAL</div>
            </div>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-6">
          <Button
            onClick={toggleTimer}
            size="lg"
            className="w-24 h-24 rounded-full text-xl font-light"
            disabled={timerState === 'finished'}
          >
            {isRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
          </Button>
          
          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="w-24 h-24 rounded-full font-light"
          >
            <RotateCcw className="w-8 h-8" />
          </Button>

          <Button
            onClick={() => setShowSettings(!showSettings)}
            size="lg"
            variant="outline"
            className="w-24 h-24 rounded-full font-light"
          >
            <Settings className="w-8 h-8" />
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="p-8 space-y-8 bg-card/30 backdrop-blur-sm border-border/30">
            <h3 className="text-2xl font-light tracking-wide">Timer Settings</h3>
            
            <div className="grid gap-8">
              <div className="space-y-3">
                <label className="text-lg font-light tracking-wide">Work Time: {settings.workTime}s</label>
                <Slider
                  value={[settings.workTime]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, workTime: value[0] }))}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-light tracking-wide">Rest Time: {settings.restTime}s</label>
                <Slider
                  value={[settings.restTime]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, restTime: value[0] }))}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-light tracking-wide">Rounds: {settings.rounds}</label>
                <Slider
                  value={[settings.rounds]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, rounds: value[0] }))}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-light tracking-wide">Sets: {settings.sets}</label>
                <Slider
                  value={[settings.sets]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, sets: value[0] }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-light tracking-wide">Rest Between Sets: {settings.restBetweenSets}s</label>
                <Slider
                  value={[settings.restBetweenSets]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, restBetweenSets: value[0] }))}
                  max={180}
                  min={30}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            <Button onClick={resetTimer} className="w-full font-light text-lg">
              Apply Settings
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TabataTimer;
