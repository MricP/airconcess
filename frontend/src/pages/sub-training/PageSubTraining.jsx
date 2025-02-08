import React,{useState} from 'react'
import "../../styles/sub-training/PageSubTraining.css"
import FormSubTraining from '../../components/sub-training/FormSubTraining'
import CardSubTraining from '../../components/sub-training/CardSubTraining'
import PaymentStep from '../../components/sub-training/PaymentStep';

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
          <FormSubTraining step={step} updateStep={updateStep}/>
          <CardSubTraining/>
      </main>
    )
  }
}

export default PageSubTraining