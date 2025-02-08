import React, {useEffect, useState} from 'react'
import DarkButton from '../general/DarkButton'
import { Steps } from 'rsuite';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import { useForm } from "react-hook-form";

import InfoFormFieldset from "../appointment/InfoFormFieldset"
import TrainingPrefFormFieldset from "./TrainingPrefFormFieldset"
import ValidationStep from './ValidationStep';
import PaymentDetailsStep from './PaymentDetailsStep';

import "../../styles/sub-training/FormSubTraining.css"

import { submitTraining } from "../../services/training";



function FormSubTraining({step,updateStep}) {
  const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
    { defaultValues: {
        //Step1
        firstName: "Mathéo",
        lastName: "Flores",
        phone: "+33644038323",
        email: "matheoflores26@gmail.com",
        address: "141 rue Barthélémy de laffemas",
        country: null, //{value:"FR",label:"France"},
        city: null,
        postalCode: 69100,
        idCard: null,
        //Step2
        dateStart: null,
        dateEnd: null,
        prefSlots: null, //Format : { IDSLOT: {hourStart:VALUE,hourEnd:VALUE}, IDSLOT:{hourStart:VALUE,hourEnd:VALUE} }
        prefFrequency: 3,
        //Step3
        cardHolder: "Flores Mathéo",
        cardNumber: "4965 4965 4547 1254",
        cardExpirationDate: "12/15",
        cvv: 115,
        cardIssuer: "visa"
    }}
  );

  const formData = watch();

  function handlePrevStep() {
    if(step>0) {
      step === 5 ? updateStep(3) : updateStep(step-1)
    }
  }

  function handleNextStep() {
    if(step<3) {
      updateStep(step+1)
    } else if(step===3) { // Avant de passer à l'étape suivante, on fait l'isertion
      handleInsertion()
    }
  }

  const onSubmit = async () => {
    if(formData.prefSlots != null) {
      let count = 0
      // On verifie si aucune plage null n'est passé dans le processus de remplissage,
      // Si c'est le cas on les supprime
      for( let key in formData.prefSlots) {
        if(formData.prefSlots[key].hourStart === null || formData.prefSlots[key].hourEnd === null) {
          delete formData.prefSlots[key]
        } else {
          count++;
        }
      }
      // On remet prefSlots à null si la liste est vide
      if(count === 0) setValue('prefSlots',null)
    }
    handleNextStep()
    //console.table(formData.prefSlots)
  };

  const handleInsertion = async () => {
    try {
      const response = await submitTraining(formData);    
      console.log("insertion Ok")
    } catch (error) {
      console.log("insertion Not Ok")
      // console.log('Error response:', error.response?.data?.message || 'Unknown error');
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
      case 2:
        return(
          <PaymentDetailsStep formData={formData} register={register} errors={errors} setValue={setValue}/>
        )
      case 3:
        return (
          <ValidationStep formData={formData} setStep={updateStep}/>
        )
      default:
        break;
    }
  }

  return (
    <div className='formSubTraining-container'>
      <GrFormPrevious className={step === 0 ? "disabled prev-step" :"prev-step"} onClick={handlePrevStep}/>
      <Steps current={step} className='step-indicator'>
        <Steps.Item description="INFORMATIONS CLIENT" />
        <Steps.Item description="PRÉFÉRENCES ET DISPONIBILITÉ" />
        <Steps.Item description="DONNÉES DE PAIEMENT" />
        <Steps.Item description="VALIDATION" />
        <Steps.Item icon={<IoCheckmarkDoneOutline style={{fontSize:20,color:"#5b5b5b"}}/>}/>
      </Steps>
      <form method="POST" onSubmit={handleSubmit(onSubmit)} className='current-step'>
        {handleStepDisplayed()}
        
        <DarkButton disabled={step === 5} type='submit' className="next-step">{ step === 3 ? "Valider et payer" : "Continuer"}</DarkButton>
      </form>
    </div>
  )
}

export default FormSubTraining