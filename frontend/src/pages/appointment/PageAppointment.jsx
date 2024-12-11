import React from 'react'
import ScrollDownButton from '../../components/general/ScrollDownButton';
import AppointmentForm from '../../components/appointment/AppointmentForm';
import "../../styles/appointment/PageAppointment.css"

function PageAppointment() {
    return (
        <main>
            <div className='appointmentShowcase'>
                {/* TODO mettre br */}
                <div className='text-div'>
                    <h1>Prendre</h1>
                    <h1>Rendez-vous</h1>
                    <p>Nos équipes seront à votre écoute pour vous conseiller et vous aider à envisager votre projet d'achat. Elles vous accompagneront également dans les éventuelles démarches administratives.</p>
                    <ScrollDownButton scrollLength={window.innerHeight + 0.20 * (window.innerHeight)} colorIcon='black' />
                </div>
                <div className='images'>
                    <img src="/assets/rdv-mainImg-left.png" alt="rdv-mainImg-left" />
                    <img src="/assets/rdv-mainImg-right.jpg" alt="rdv-mainImg-right " />
                </div>
            </div>
            <AppointmentForm />
        </main>
    )
}

export default PageAppointment