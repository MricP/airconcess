import React, { useEffect, useState } from 'react'
import { Steps } from 'rsuite';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

import DarkButton from '../general/DarkButton'
import InfoFormFieldset from "../appointment/InfoFormFieldset"
import TrainingPrefFormFieldset from "./TrainingPrefFormFieldset"
import ValidationStep from './ValidationStep';
import PaymentDetailsStep from './PaymentDetailsStep';
import useRedirect from '../../components/Custom-hooks';

import "../../styles/sub-training/FormSubTraining.css"

// services functions
import { getUserData } from '../../services/auth';
import { submitTraining,getTrainers } from "../../services/training";

function FormSubTraining({step,updateStep}) {
  /*############ INITIALISATION DES STATES ############*/

  const [trainers,setTrainers] = useState([]);
  const redirect = useRedirect()

  const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
    { defaultValues: {
        userId: null,
        //Step1
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        address: null,
        country: null, //{value:"FR",label:"France"},
        city: null,
        postalCode: null,
        idCard: null,
        //Step2
        dateStart: null,
        dateEnd: null,
        prefSlots: null, //Format : { IDSLOT: {hourStart:VALUE,hourEnd:VALUE}, IDSLOT:{hourStart:VALUE,hourEnd:VALUE} }
        prefFrequency: null,
        trainer: null,
        //Step3
        cardHolder: null,
        cardNumber: null,
        cardExpirationDate: null,
        cvv: null,
        cardIssuer: null
    }}
  );

  /*################### CONSTANTES ####################*/

  const formData = watch();

  /*#################### FONCTIONS ####################*/

  function handlePrevStep() {
    if(step>0) {
      step === 5 ? updateStep(3) : updateStep(step-1)
    }
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  function handleNextStep() {
    if(step<3) {
      updateStep(step+1)
    } else if(step===3) { // Avant de passer à l'étape suivante, on fait l'isertion
      handleInsertion()
    }
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  function handleStepDisplayed() {
    switch(step) {
      case 0:
        return(
          <InfoFormFieldset formData={formData} register={register} errors={errors} setValue={setValue} withIdCard={true}/>
        )
      case 1:
        return(
          <TrainingPrefFormFieldset formData={formData} register={register} errors={errors} setValue={setValue} trainers={trainers}/>
        )
      case 2:
        return(
          <PaymentDetailsStep formData={formData} register={register} errors={errors} setValue={setValue}/>
        )
      case 3:
        return (
          <ValidationStep trainers={trainers} formData={formData} setStep={updateStep}/>
        )
      default:
        break;
    }
  }

  const getUserIdFromToken = async (token) => {
    try {
      const userData = await getUserData(token);
      setValue("userId",userData.idUser)
      setValue("email",userData.email)
      setValue("firstName",userData.firstName)
      setValue("lastName",userData.lastName)
      setValue("userId",userData.idUser)
      console.log(userData.idUser)
    } catch (error) {
        console.error('Erreur get:', error);
    }
  }

  const loadTrainers = async () => {
    try {
      const response = await getTrainers();
      console.log("ok ")
      setTrainers(response.data)
    } catch (error) {
      console.log('Error getTrainers:', error.response?.data?.message || 'Unknown error');
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
      await submitTraining(formData);   
      updateStep(5) 
    } catch (error) {
      console.log('Erreur insertion:', error.response?.data?.message || 'Unknown error');
    }
  }

  /*###################### AUTRE ######################*/

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/sign-in');
      return;
    }

    getUserIdFromToken(token); 
    loadTrainers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='formSubTraining-container'>
      <IoArrowBackOutline  className={step === 0 ? "disabled prev-step" :"prev-step"} onClick={handlePrevStep}/>
      <Steps current={step} className='step-indicator'>
        <Steps.Item description={"INFORMATIONS CLIENT"} />
        <Steps.Item description="PRÉFÉRENCES ET DISPONIBILITÉ" />
        <Steps.Item description="DONNÉES DE PAIEMENT" />
        <Steps.Item description="VALIDATION" />
        <Steps.Item icon={<IoCheckmarkDoneOutline style={{fontSize:20,color:"#5b5b5b"}}/>}/>
      </Steps>
      
      <Steps current={step} className='step-indicator mobile'> 
        <Steps.Item />
        <Steps.Item />
        <Steps.Item />
        <Steps.Item />
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