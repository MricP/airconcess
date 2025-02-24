import React,{useState} from 'react'
import { FaCircleInfo } from "react-icons/fa6";

import { Button, Modal } from 'rsuite'

import "../../styles/profile/CalendarPopup.css"
import CustomAlertDialog from '../general/CustomAlertDialog';

import { deleteAppointment } from "../../services/appointment.js"

function CalendarPopup({apptLinked,onOk,isOpen=false}) {
    const [cancelAppointment,setCancelAppointment] = useState(false)

    const handleDeleteAppt = async () => {
        try {
          await deleteAppointment(apptLinked.appt_id)
        } catch (error) {
            console.error('Error deleting appointment data:', error);
        }
        onOk()
    }

    const handleDateDisplayed = () => {
        const date = new Date(apptLinked.appt_timestamp)
        
        return `${date.toLocaleDateString()} à ${date.getHours()}h${date.getMinutes()}` 
    }

    const handleReasonDisplayed = () => {
        switch(apptLinked.appt_reason) {
            case 'purchase':
                return "Achat envisagé"
            case 'rent':
                return "Location envisagée"
            default:
                return "non renseignée"
        }
    }

    return (
        <Modal open={isOpen} className="calendarPopup" backdrop="static" keyboard={true} size="sm">
            <CustomAlertDialog isOpen={cancelAppointment} onOk={handleDeleteAppt} onCancel={() => setCancelAppointment(false)}>
                En validant cette étape, votre rendez-vous sera annuler.
            </CustomAlertDialog>
            <Modal.Title className='title'>
                <div>
                    <FaCircleInfo className='icon'/>
                    Récapitulatif de votre rendez-vous
                </div>
                <button onClick={() => setCancelAppointment(true)} className='delete-button'>Annuler mon rendez-vous</button>
            </Modal.Title>
            <Modal.Body className='popup-body'>
                <div>
                    <p>○ Date : {handleDateDisplayed()}</p>
                    <p>○ Raison : {handleReasonDisplayed()}</p>
                    <p>{`○ Appareil concerné : ${apptLinked.model_name}, ${apptLinked.serial_number}`}</p>
                    <p>{`○ Addresse de l'agence : ${apptLinked.agency_address}, ${apptLinked.agency_city}, ${apptLinked.agency_country}`}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onOk()} className='ok-button' appearance="primary">Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CalendarPopup