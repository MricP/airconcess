import {React,useState} from 'react'
import { MdContentCopy } from "react-icons/md";
import '../../styles/pageAppointment/AppointmentForm.css'
import InfoFormFieldset from '../InfoFormFieldset'
import CustomTimePicker from '../CustomTimePicker'
import CustomDatePicker from '../CustomDatePicker'

function AppointmentForm() {
    return (
        <div className='appointmentForm-container'>
            <div className='form-container'>
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <div className='error-message-div'>Veuillez corriger les erreurs ci-dessous !</div>
                <form action="">

                    {/* <fieldset className='reason-fieldset' ><legend>Cause du rendez-vous</legend>
                        <label htmlFor="reason-input">Motif du rendez-vous*
                            <input id="reason-input" name="reason" type="text"/>
                        </label>
                        <div>
                            <label htmlFor="model-input">Modèle de l'appareil*
                                <input id="model-input" name="model" type="text" />
                            </label>
                            <label htmlFor="serialNumber-input">Numéro de série*
                                <input id="serialNumber-input" name="serialNumber" type="text" />
                            </label>
                        </div>
                    </fieldset>

                    <InfoFormFieldset/> */}

                    { /* TODO Gerer les submit de TimePicker et DatePicker */ }
                    <fieldset className='rdv-fieldset'><legend>Programmer mon rendez-vous</legend>
                        <div>
                            <label htmlFor="date-input">Date*
                                <CustomDatePicker/>
                            </label>
                            <label htmlFor="time-input">Heure*
                                <CustomTimePicker/>
                            </label>
                        </div>
                        <label htmlFor="place-input">Lieu*
                            <input type="text" id="place-input" name='placeAppointment' placeholder='-- Choisir parmi nos agences disponibles --'/>
                        </label>
                        <div id='addr-label' /*className='invisible'*/>
                            <p>Adresse de l'agence</p>
                            <section>
                                <p>à afficher que si l'agence a été selectionnée</p>
                                <MdContentCopy title='Copier' id='copy-addr-button'/>
                            </section>
                        </div>
                    </fieldset>
                    <button className='submit' type="submit">Valider mon rendez-vous</button>
                </form>
            </div>
        </div>
    )
}

export default AppointmentForm