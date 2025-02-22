import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosAddCircle, IoIosAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify'

import TrainingProposal from './TrainingProposal';
import DarkButton from '../general/DarkButton';

import { insertProposals } from '../../services/training';

import "../../styles/profile/StepMakeProposal.css"

function StepMakeProposal({reloadPage,trainingData}) {
    /*############ INITIALISATION DES STATES ############*/
    const [proposals, setProposals] = useState([]); // Stocke des objets avec un identifiant unique
    const [isHovered, setIsHovered] = useState(false);

    const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
        { defaultValues: {
            proposals: null, // Format : { IDPROPOSAL: {dateStart:VALUE,dateEnd:VALUE,hourMonday:VALUE,hourTuesday:VALUE,hourWednesday:VALUE,hourThursday:VALUE,hourFriday:VALUE} }
        }}
    ); // Les proposals en local

    /*################### CONSTANTES ####################*/
    const formData = watch()

    /*#################### FONCTIONS ####################*/
    const onSubmit = async () => {
        if(formData.proposals) {
            let isValid = true;
            for (let key in formData.proposals) {
                if(!(formData.proposals?.[key]?.hourMonday || formData.proposals?.[key]?.hourTuesday || formData.proposals?.[key]?.hourWednesday || formData.proposals?.[key]?.hourThursday || formData.proposals?.[key]?.hourFriday)) isValid=false
            }
            if(isValid) {
                await insertProposalsIntoDB();
                reloadPage();
            } else {
                toast.error("Vous devez selectionner au moins une zone horaire par proposition")
            }
        }
    }

    const insertProposalsIntoDB = async () => {
        try {
            const resp = await insertProposals(trainingData.trainerId,trainingData.trainingId,formData.proposals);
            console.log(resp.data)
        } catch (error) {
            console.error('Error inserting proposals data:', error);
        }
    }
    
    const addProposal = () => {
        const newProposal = {id: "id"+Math.round(Math.random()*10000) }; // Crée un objet unique avec un id
        setProposals([...proposals, newProposal]);
    }
    
    const removeProposal = (id) => {
        setProposals((prev) => prev.filter((proposal) => proposal.id !== id));   // Suppression
        if (formData?.proposals) {
            // Suppression de la proposation dans le useForm
            delete formData.proposals[id];
        }
    }

    const handleDisplayPrefSlots = () => {
        let slots = [];
        for (let key in trainingData.prefSlots) {
            let hStart = trainingData.prefSlots[key].startTime.split(":");
            let hEnd = trainingData.prefSlots[key].endTime.split(":");
            slots.push(<p key={key}>{"○ De " + hStart[0] + "h" + hStart[1] + " à " + hEnd[0] + "h" + hEnd[1]}</p>);
        }
        return slots;
    }

    const handleDisplayDate = (date) => {
        return (new Date(date)).toLocaleDateString()
    }

    /*###################### AUTRE ######################*/
    useEffect(() => {
        let temp = proposals;
        for(let key in formData.proposals) {
            temp = [...temp,{id:key}]
            setProposals(temp)
        }
    },[]);

    return (
        <div className='stepMakeProposal-container'>
            <div className='pref-container'>
                <p className='title'>Préférences client</p>
                <p>○ Date de début : {handleDisplayDate(trainingData?.startDate)}</p>
                <p>○ Date de fin : {handleDisplayDate(trainingData?.endDate)}</p>
                <p>○ Fréquence des séances : {trainingData?.frequency} séance(s) par semaine</p>
                <p>○ Préférences horaires : {trainingData?.prefSlots ? null : "Non renseigné"}</p>
                {trainingData.prefSlots ? <div className="prefSlots-container">{handleDisplayPrefSlots()}</div> : null}
            </div>
                    
            <p className='title'>Vos propositions</p>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className='proposals' id={proposals.length === 0 ? "nothing" : ""}>
                
                {proposals.length === 0 ? 
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>Aucune proposition</div> :               
                proposals?.map((proposal,index) => (
                    <>
                        <div className="proposal" key={proposal.id}>
                            
                            <TrainingProposal noProposal={index+1} proposId={proposal.id} formData={formData} errors={errors} setValue={setValue} register={register} removeProposal={removeProposal}/>
                            
                        </div>
                        <hr />
                    </>
                ))}

                <div className="icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>   
                    <IoIosAddCircle
                        className={`add-time-slot ${isHovered ? "visible" : "invisible"} ${proposals.length < 3 ? "" : "invisible"}`}
                        onClick={proposals.length < 5 ? addProposal : null}
                    />
                    <IoIosAddCircleOutline
                        className={`add-time-slot ${!isHovered ? "visible" : "invisible"} ${proposals.length < 3 ? "" : "invisible"}`}
                        onClick={proposals.length < 5 ? addProposal : null}
                    />
                </div>
                <DarkButton disabled={proposals.length===0} >Valider {proposals.length>1 ? "les propositions" : "la proposition"}</DarkButton>
            </form>
        </div>
    )
}

export default StepMakeProposal