import React,{useState} from 'react'
import FormSubTraining from '../../components/sub-training/FormSubTraining'
import CardSubTraining from '../../components/sub-training/CardSubTraining'
import PaymentStep from '../../components/sub-training/PaymentStep';

import "../../styles/sub-training/PageSubTraining.css"

function PageSubTraining() {
  const [step,updateStep] = useState(3);

  if(step===5) {
    return (
      <main className="page-subTraining">
        <PaymentStep/>
      </main>
    )
  } else {
    return (
      <main className="page-subTraining">
        <div>
          <FormSubTraining step={step} updateStep={updateStep}/>
          <CardSubTraining/>
        </div>
      </main>
    )
  }
}

export default PageSubTraining