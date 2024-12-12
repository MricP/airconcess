import React, {useState} from 'react'
import DarkButton from '../general/DarkButton'
import { Steps } from 'rsuite';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";

import "../../styles/sub-training/FormSubTraining.css"

function FormSubTraining() {
  const [step,updateStep] = useState(0);

  function handlePrevStep() {
    if(step>0) {
      step == 5 ? updateStep(3) : updateStep(step-1)
    }
  }

  function handleNextStep() {
    if(step<5) {
      step == 3 ? updateStep(5) : updateStep(step+1)
    }
  }


  return (
    <div className='formSubTraining-container'>
      <GrFormPrevious className={step === 0 ? "disabled prev-step" :"prev-step"} onClick={handlePrevStep}/>
      <Steps current={step} className='step-indicator'>
        <Steps.Item description="INFORMATIONS CLIENT" />
        <Steps.Item description="PRÉFÉRENCES ET DISPONIBILITÉ" />
        <Steps.Item description="FACTURATION ET PAIEMENT" />
        <Steps.Item description="VALIDATION" />
        <Steps.Item icon={<IoCheckmarkDoneOutline style={{ fontSize: 20 ,color:"#5b5b5b"}}/>}/>
      </Steps>
      <div className='content'>
        {"STEP "+step}
      </div>
      <DarkButton disabled={step === 5} className="next-step" onClick={handleNextStep}>Suivant</DarkButton>
    </div>
  )
}

export default FormSubTraining