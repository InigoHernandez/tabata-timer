
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
    // If timer is not running and not in idle or finished state, show paused color
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return '#0000004d';
    }
    
    switch (timerState) {
      case 'work':
        return '#FE6417';
      case 'rest':
        return '#0000004d';
      case 'setRest':
        return '#0000004d';
      case 'finished':
        return '#FE6417';
      default:
        return '#020817';
    }
  };

  const getStateText = () => {
    // If timer is not running and not in idle or finished state, show "paused"
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return 'paused';
    }
    
    switch (timerState) {
      case 'work':
        return 'work';
      case 'rest':
        return 'rest';
      case 'setRest':
        return 'set rest';
      case 'finished':
        return 'finished';
      default:
        return 'ready';
    }
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
    resetTimer();
  };

  return (
    <div className="min-h-screen font-aspekta relative" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="flex flex-col items-center justify-center p-8 pb-32 relative z-10">
        <div className="w-full max-w-6xl space-y-16">
          {/* Header */}
          <div className="text-left space-y-8">
            <p className="tracking-wider uppercase text-xs font-medium" style={{ color: '#FE6417' }}>TABAT.APP — HIGH INTENSITY TRAINING</p>
            <div className="w-8/12">
              <h1 className="text-2xl md:text-3xl leading-tight font-normal">
                <span className="text-foreground">Maximum results in minimum time.</span>
                <br />
                <span style={{ color: '#0000004d' }}>Train smarter with scientific intervals.</span>
              </h1>
            </div>
          </div>

          {/* Main Timer Display */}
          <Card className="p-16 md:p-20 text-center backdrop-blur-md border border-border/20 relative overflow-hidden">
            {/* Settings Button */}
            <Button 
              onClick={() => setShowSettings(!showSettings)} 
              size="lg" 
              variant="outline" 
              className="absolute top-8 right-8 w-12 h-12 rounded-full font-light"
            >
              <Settings className="w-5 h-5" />
            </Button>

            <div className="relative z-10 min-h-[400px] flex flex-col justify-center">
              {/* Timer Content with Transition */}
              <div className={`transition-all duration-500 ease-in-out ${showSettings ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <div className="space-y-20">
                  <div className="text-2xl md:text-3xl font-normal leading-tight tracking-wide" style={{ color: getStateColor() }}>
                    {getStateText()}
                  </div>
                  
                  <div className="text-[12rem] md:text-[16rem] font-light tabular-nums leading-none">
                    {formatTime(currentTime)}
                  </div>

                  <div className="grid grid-cols-3 gap-12 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl md:text-3xl font-normal text-foreground">{currentRound}</div>
                      <div className="text-2xl md:text-3xl font-normal leading-tight tracking-wide" style={{ color: '#0000004d' }}>round</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl md:text-3xl font-normal text-foreground">{currentSet}</div>
                      <div className="text-2xl md:text-3xl font-normal leading-tight tracking-wide" style={{ color: '#0000004d' }}>set</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl md:text-3xl font-normal text-foreground">{settings.rounds * settings.sets}</div>
                      <div className="text-2xl md:text-3xl font-normal leading-tight tracking-wide" style={{ color: '#0000004d' }}>total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Content with Transition */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${showSettings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="space-y-12 text-left p-4">
                  <h3 className="text-2xl font-normal tracking-wide">timer settings</h3>
                  
                  <div className="grid gap-12">
                    <div className="space-y-3">
                      <label className="text-lg font-light tracking-wide">work time: {settings.workTime}s</label>
                      <Slider 
                        value={[settings.workTime]} 
                        onValueChange={value => setSettings(prev => ({ ...prev, workTime: value[0] }))} 
                        max={60} 
                        min={5} 
                        step={5} 
                        className="w-full" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-light tracking-wide">rest time: {settings.restTime}s</label>
                      <Slider 
                        value={[settings.restTime]} 
                        onValueChange={value => setSettings(prev => ({ ...prev, restTime: value[0] }))} 
                        max={60} 
                        min={5} 
                        step={5} 
                        className="w-full" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-light tracking-wide">rounds: {settings.rounds}</label>
                      <Slider 
                        value={[settings.rounds]} 
                        onValueChange={value => setSettings(prev => ({ ...prev, rounds: value[0] }))} 
                        max={12} 
                        min={1} 
                        step={1} 
                        className="w-full" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-light tracking-wide">sets: {settings.sets}</label>
                      <Slider 
                        value={[settings.sets]} 
                        onValueChange={value => setSettings(prev => ({ ...prev, sets: value[0] }))} 
                        max={5} 
                        min={1} 
                        step={1} 
                        className="w-full" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-light tracking-wide">rest between sets: {settings.restBetweenSets}s</label>
                      <Slider 
                        value={[settings.restBetweenSets]} 
                        onValueChange={value => setSettings(prev => ({ ...prev, restBetweenSets: value[0] }))} 
                        max={180} 
                        min={30} 
                        step={10} 
                        className="w-full" 
                      />
                    </div>
                  </div>

                  <Button onClick={handleSettingsClose} className="w-full font-light text-lg">
                    apply settings
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Controls - Always Visible */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex justify-center gap-6 backdrop-blur-md border border-border/20 rounded-full p-4">
          <Button onClick={toggleTimer} size="lg" className="w-16 h-16 rounded-full text-xl font-light" disabled={timerState === 'finished'}>
            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>
          
          <Button onClick={resetTimer} size="lg" variant="outline" className="w-16 h-16 rounded-full font-light">
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabataTimer;
