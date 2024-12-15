import React, {useState} from 'react'
import DarkButton from '../general/DarkButton'
import { Steps } from 'rsuite';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import { useForm } from "react-hook-form";

import InfoFormFieldset from "../appointment/InfoFormFieldset"
import TrainingPrefFormFieldset from "./TrainingPrefFormFieldset"

import "../../styles/sub-training/FormSubTraining.css"

function FormSubTraining() {
  const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
    { defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        city: "",
        postalCode: "",
        idCard: null
    }}
  );

  const formData = watch();

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

  function handleStepDisplayed() {
    switch(step) {
      case 0:
        return(
          <InfoFormFieldset formData={formData} register={register} errors={errors} setValue={setValue} withIdCard={true}/>
        )
      case 1:
        return(
          <TrainingPrefFormFieldset formData={formData} register={register} errors={errors} setValue={setValue}/>
        )
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
      <form className='current-step'>
        {handleStepDisplayed()}
      </form>
      <DarkButton disabled={step === 5} className="next-step" onClick={handleNextStep}>Suivant</DarkButton>
    </div>
  )
}

export default FormSubTraining