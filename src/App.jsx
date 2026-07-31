import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DayProgressProvider } from './context/DayProgressContext';
import SkyBackground from './components/SkyBackground';
import ProgressDots from './components/ProgressDots';

// Ambient Layer Components
import FloatingHearts from './components/FloatingHearts';
import Particles from './components/Particles';
import MusicButton from './components/MusicButton';
import CursorHearts from './components/CursorHearts';

// Eagerly loaded initial scenes
import Loading from './scenes/Loading';
import Landing from './scenes/Landing';

// Lazy-loaded subsequent scenes
const Game1 = lazy(() => import('./scenes/Game1'));
const Game2 = lazy(() => import('./scenes/Game2'));
const Game3 = lazy(() => import('./scenes/Game3'));
const Transition = lazy(() => import('./scenes/Transition'));
const Envelope = lazy(() => import('./scenes/Envelope'));
const Letter = lazy(() => import('./scenes/Letter'));
const Collage = lazy(() => import('./scenes/Collage'));
const FinalMessage = lazy(() => import('./scenes/FinalMessage'));

export default function App() {
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = sessionStorage.getItem('litchii_journey_step');
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Save progress step to sessionStorage for accidental refresh resiliency
  useEffect(() => {
    try {
      sessionStorage.setItem('litchii_journey_step', currentStep.toString());
    } catch (e) {
      console.warn("Could not save step to sessionStorage", e);
    }
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(9, prev + 1));
  const restartJourney = () => {
    setCurrentStep(1); // Go back to Landing
  };

  return (
    <DayProgressProvider currentStep={currentStep}>
      <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between selection:bg-[#F4A6B7] selection:text-[#3A2E33]">
        
        {/* Dynamic Sky Background (Sunrise -> Morning -> Sunset -> Dusk -> Night) */}
        <SkyBackground />

        {/* Ambient Layer Floating Effects */}
        <FloatingHearts count={16} />
        <Particles count={14} />

        {/* Desktop Cursor & Mobile Touch Hearts */}
        <CursorHearts />

        {/* Floating Music Button */}
        <MusicButton />

        {/* Top Progress Dots */}
        <ProgressDots currentStep={currentStep} totalSteps={10} />

        {/* Main Linear Journey Container */}
        <main className="relative z-10 w-full flex-grow flex items-center justify-center">
          <Suspense fallback={
            <div className="flex items-center justify-center p-12 text-[#B94F5C] font-serif-heading text-xl animate-pulse">
              Loading surprise... ❤️
            </div>
          }>
            <AnimatePresence mode="wait">
              {currentStep === 0 && <Loading key="step-0" onComplete={nextStep} />}
              {currentStep === 1 && <Landing key="step-1" onNext={nextStep} />}
              {currentStep === 2 && <Game1 key="step-2" onNext={nextStep} />}
              {currentStep === 3 && <Game2 key="step-3" onNext={nextStep} />}
              {currentStep === 4 && <Game3 key="step-4" onNext={nextStep} />}
              {currentStep === 5 && <Transition key="step-5" onNext={nextStep} />}
              {currentStep === 6 && <Envelope key="step-6" onComplete={nextStep} />}
              {currentStep === 7 && <Letter key="step-7" onNext={nextStep} />}
              {currentStep === 8 && <Collage key="step-8" onNext={nextStep} />}
              {currentStep === 9 && <FinalMessage key="step-9" onReplay={restartJourney} />}
            </AnimatePresence>
          </Suspense>
        </main>

      </div>
    </DayProgressProvider>
  );
}
