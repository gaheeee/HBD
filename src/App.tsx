import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PasswordScreen from './components/PasswordScreen';
import CelebrationScreen from './components/CelebrationScreen';
import LadderScreen from './components/LadderScreen';

type Step = 'PASSWORD' | 'CELEBRATION' | 'LADDER';

function App() {
  const [step, setStep] = useState<Step>('PASSWORD');

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === 'PASSWORD' && (
          <PasswordScreen 
            key="password" 
            onAuthenticated={() => setStep('CELEBRATION')} 
          />
        )}
        {step === 'CELEBRATION' && (
          <CelebrationScreen 
            key="celebration" 
            onStartGame={() => setStep('LADDER')} 
          />
        )}
        {step === 'LADDER' && (
          <LadderScreen key="ladder" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
