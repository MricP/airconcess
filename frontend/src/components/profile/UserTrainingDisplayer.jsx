import React, { useRef, useState,useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import StepProposalsSummary from './StepProposalsSummary.jsx';
import StepDisplayFinalProposal from './StepDisplayFinalProposal.jsx';
import StepCancelTraining from './StepCancelTraining.jsx';

import '../../styles/profile/UserTrainingDisplayer.css'

import { getTrainer } from "../../services/api.js"

function UserTrainingDisplayer({reloadPage,trainingData}) {
    /*############ INITIALISATION DES STATES ############*/
    const [trainer,setTrainer] = useState(null)
    const [isOpen,setIsOpen] = useState(false) //Savoir si le menu est open
    const [status,setStatus] = useState('not-ok') //'not-ok','await-user','ok' (connaitre le status du training)

    /*################### CONSTANTES ####################*/
    const profile = '/assets/profile/Jack-Sparrow.png'; //Peut etre delete
    const arrowItem = useRef(null)
    const Item = useRef(null)

    /*#################### FONCTIONS ####################*/
    const handleItemClick = () => {
        setIsOpen(!isOpen);
        if(arrowItem.current && Item.current){
            arrowItem.current.classList.toggle("click");
        }
    }

    const handleStatusDisplayed = () => {
        switch(status) {
            case 'ok': 
                return <p style={{color:"green"}}>Formation programmée</p>
            case 'await-user': 
                return <p style={{color:"orange"}}>Selection d'un programme</p>
            case 'not-ok': 
                return <p style={{color:"red"}}>En attente du formateur</p>
            default:
                return;
        }
    }

    const handleStepDisplayed = () => {
        switch(status) {
            case 'ok': 
                return <StepDisplayFinalProposal trainer={trainer} trainingData={trainingData}/>
            case 'await-user': 
                return <StepProposalsSummary reloadPage={reloadPage} trainingData={trainingData} mode='user'/>
            case 'not-ok': 
                return <StepCancelTraining reloadPage={reloadPage} trainingData={trainingData}/>
            default:
                return;
        }
    }

    const loadTrainerInfos = async () => {
        try {
          const resp = await getTrainer(trainingData.trainerId)
          setTrainer(resp.data)
        } catch (error) {
          console.error('Error fetching trainer data:', error);
        }
    }
    
    /*###################### AUTRE ######################*/
    useEffect(() => {
        console.log(trainingData?.finalProposal)
        if(trainingData?.finalProposal) {
            setStatus('ok')
        } else {
            if(trainingData?.proposals) {
                setStatus('await-user')
            } else {
                setStatus('not-ok')
            }
        }
    },[status,trainingData])

    useEffect(() => {
        loadTrainerInfos()
    },[])
  
    return (
        <div className={`userTrainingDisplayer-container`} >
            <div className='user-infos-container' onClick={handleItemClick}>
                <div>
                    <img className='profile-picture' src={profile} alt='' />
                    <p>{trainingData.usrFirstName} {trainingData.usrLastName}</p>
                </div>
                <div>
                    {handleStatusDisplayed()}
                    <IoIosArrowForward className={`arrow ${isOpen ? "click" : ""}`} color='var(--section-color)' size={30} />
                </div>
            </div>
            {isOpen ? handleStepDisplayed() : null}
        </div>
    )
}

export default UserTrainingDisplayer