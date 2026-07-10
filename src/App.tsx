import { useState } from 'react'
import OnboardingInfo from './pages/Onboarding/OnboardingInfo'
import NameEmailForm from './screens/NameEmailForm'
import DigitalDetox from './screens/DigitalDetox'

type Step = 'form' | 'detox'

function App() {
  const [step, setStep] = useState<Step>('form')

  return (
    <OnboardingInfo>
      {step === 'form' ? (
        <NameEmailForm onNext={() => setStep('detox')} />
      ) : (
        <DigitalDetox />
      )}
    </OnboardingInfo>
  )
}

export default App
