import React, { useState } from 'react'
import CustomAlertDialog from '../general/CustomAlertDialog';

import "../../styles/profile/StepCancelTraining.css"

import { deleteTraining } from '../../services/training';

function StepCancelTraining({reloadPage,trainingData}) {
    /*############ INITIALISATION DES STATES ############*/
    const [deleteT,setDeleteTraining] = useState(false);

    /*#################### FONCTIONS ####################*/
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

    const handleDeleteTraining = async () => {
        try {
            await deleteTraining(trainingData?.trainingId);
        } catch (error) {      
          console.error('Error deleting proposals :', error);
        }
        setDeleteTraining(false)
        reloadPage()
    }

    return (
        <div className='stepCancelTraining-container'>
            <CustomAlertDialog isOpen={deleteT} onOk={handleDeleteTraining} onCancel={() => setDeleteTraining(false)}>
                Si vous validez cette étape, votre achat sera annulé et vous serez remboursé sous <strong>30 jours</strong>.
            </CustomAlertDialog>
            <div className='pref-container'>
                <div className='title-container'>
                    <p className='title'>Vos préférences de formation</p> 
                    <button onClick={() => setDeleteTraining(true)} className='proposal-button'>Annuler ma formation</button>
                </div>
                <p>○ Date de début : {handleDisplayDate(trainingData?.startDate)}</p>
                <p>○ Date de fin : {handleDisplayDate(trainingData?.endDate)}</p>
                <p>○ Fréquence des séances : {trainingData?.frequency} séance(s) par semaine</p>
                <p>○ Préférences horaires : {trainingData?.prefSlots ? null : "Non renseigné"}</p>
                {trainingData.prefSlots ? <div className="prefSlots-container">{handleDisplayPrefSlots()}</div> : null}
            </div>
        </div>
    )
}

export default StepCancelTraining