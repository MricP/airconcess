import React, { useRef, useState,useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";

import StepMakeProposal from './StepMakeProposal.jsx';

import '../../styles/profile/TrainerTrainingDisplayer.css'
import StepProposalsSummary from './StepProposalsSummary.jsx';
import StepDisplayFinalProposal from './StepDisplayFinalProposal.jsx';


export default function TrainerTrainingDisplayer({trainingData}) {
    /*############ INITIALISATION DES STATES ############*/
    
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
                return <p style={{color:"orange"}}>En attente du client</p>
            case 'not-ok': 
                return <p style={{color:"red"}}>Non traité</p>
            default:
                return;
        }
    }

    const handleStepDisplayed = () => {
        switch(status) {
            case 'ok': 
                return <StepDisplayFinalProposal trainingData={trainingData}/>
            case 'await-user': 
                return <StepProposalsSummary trainingData={trainingData}/>
            case 'not-ok': 
                return <StepMakeProposal trainingData={trainingData}/>
            default:
                return;
        }
    }
    
    /*###################### AUTRE ######################*/
    useEffect(() => {
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
    
    return (
        <div className={`trainerTrainingDisplayer-container`} >
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