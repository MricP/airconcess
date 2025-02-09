import React, { useState } from 'react'
import ScrollDownButton from '../../components/general/ScrollDownButton';
import AppointmentForm from '../../components/appointment/AppointmentForm';
import ResultPage from '../ResultPage';

import "../../styles/appointment/PageAppointment.css"

function PageAppointment() {
    const [isSubmitted,setIsSubmitted] = useState(false);

    if(isSubmitted) {
        return(<ResultPage message='Votre rendez-vous a été pris en compte'/>)
    } else {
        return (
            <main className='appt-container'>
                <div className='appointmentShowcase'>
                    <div className='text-div'>
                        <h1>Prendre</h1>
                        <h1>Rendez-vous</h1>
                        <p>Nos équipes seront à votre écoute pour vous conseiller et vous aider à envisager votre projet d'achat. Elles vous accompagneront également dans les éventuelles démarches administratives.</p>
                        <ScrollDownButton scrollLength={window.innerHeight} colorIcon='black' />
                    </div>
                    <div className='images'>
                        <img src="/assets/rdv-mainImg-left.png" alt="rdv-mainImg-left" />
                        <img src="/assets/rdv-mainImg-right.jpg" alt="rdv-mainImg-right " />
                    </div>
                    <div className="gradient-overlay"></div>
                </div>
                <AppointmentForm setIsSubmitted={setIsSubmitted}/>
            </main>
        )
    }
}

export default PageAppointment