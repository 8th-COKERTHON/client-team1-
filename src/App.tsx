import { useState } from 'react'
import NameEmailForm from './screens/NameEmailForm'
import DigitalDetox from './screens/DigitalDetox'

type Step = 'form' | 'detox'

function App() {
  const [step, setStep] = useState<Step>('form')

  if (step === 'detox') {
    return <DigitalDetox />
  }

  return <NameEmailForm onNext={() => setStep('detox')} />
}

export default App
