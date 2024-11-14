import React from 'react'
import '../styles/pageAppointment/PageAppointment.css'
import Template from '../components/Template';
import ScrollDownButton from '../components/ScrollDownButton';
import AppointmentForm from '../components/pageAppointment/AppointmentForm';

function PageAppointment() {

    return (
        <Template>
            <div className='appointmentShowcase'>
                <div className='text-div'>
                    <h1>Prendre</h1>
                    <h1>Rendez-vous</h1>
                    <p>Nos équipes seront à votre écoute pour vous conseiller et vous aider à envisager votre projet d'achat. Elles vous accompagneront également dans les éventuelles démarches administratives.</p>
                    <ScrollDownButton scrollLength={window.innerHeight+0.25*(window.innerHeight)} colorIcon='black'/>
                </div>
                <div className='images'>
                    <img src="./assets/rdv-mainImg-left.png" alt="rdv-mainImg-left" />
                    <img src="./assets/rdv-mainImg-right.jpg" alt="rdv-mainImg-right " />
                </div>       
            </div>
            <AppointmentForm/>
        </Template>
    )
}

export default PageAppointment