import {React,useEffect,useState} from 'react'
import { MdContentCopy } from "react-icons/md";
import '../../styles/pageAppointment/AppointmentForm.css'
import InfoFormFieldset from '../InfoFormFieldset'
import CustomTimePicker from '../CustomTimePicker'
import CustomDatePicker from '../CustomDatePicker'
import {CustomProvider} from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import { CopyToClipboard } from "react-copy-to-clipboard";

function AppointmentForm() {
    const disabledSlots = [
        {date:'2024-11-29',hour:16,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:7,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:8,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:9,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:10,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:11,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:12,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:13,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:14,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:15,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:16,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:17,minutes:[15,45,30,0]},
        {date:'2024-11-30',hour:18,minutes:[15,45,30,0]}
    ]

    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if(isCopied) {
            // Permet de réafficher l'icone pour copier après 1s
            setTimeout(() => {
                setIsCopied(false)
            },1000)
        }
    },[isCopied])

    function handleSubmit(ev) {
        console.log("ok")   
        
        ev.preventDefault();
    }

    function handleSelectedSlot() {
        if(date!=null) {
            return new Date(date);
        }
        if(time!=null) {
            let date = new Date();
            let [hours, minutes, seconds] = time.split(':').map(Number);
            date.setHours(hours)
            date.setMinutes(minutes)
            date.setSeconds(0)
            return date;
        }
        return null;
    }

    return (
        <div className='appointmentForm-container'>
            <div className='form-container'>
                <div>
                    <p>Date : {date}</p>
                    <p>Time : {time}</p>
                </div>
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <div className='error-message-div'>Veuillez corriger les erreurs ci-dessous !</div>
                <form onSubmit={handleSubmit}>
                    <fieldset className='reason-fieldset'><legend>Cause du rendez-vous</legend>
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

                    <InfoFormFieldset/>

                    <fieldset className='rdv-fieldset'><legend>Programmer mon rendez-vous</legend>
                        <div id='div-slot-pickers'>
                            <CustomProvider locale={frFR}>
                                <div>
                                    <p>Date*</p>
                                    <CustomDatePicker disabledSlots={disabledSlots|| []} selectedTime={handleSelectedSlot()} setDate={(value)=>setDate(value)}/>
                                </div>
                                <div>
                                    <p>Heure</p>
                                    <CustomTimePicker disabledSlots={disabledSlots|| []} selectedDate={handleSelectedSlot()} setTime={(value)=>setTime(value)}/>
                                </div>
                            </CustomProvider>
                        </div>
                        <label htmlFor="place-input">Lieu*
                            <input type="text" id="place-input" name='placeAppointment' placeholder='-- Choisir parmi nos agences disponibles --'/>
                        </label>
                        <div id='addr-label' /*className='invisible'*/>
                            <p>Adresse de l'agence</p>
                            <section>
                                <p>à afficher que si l'agence a été selectionnée</p>
                                <CopyToClipboard text={"a"} onCopy={() => setIsCopied(true)}>
                                    {isCopied ? <p id='copy-addr-message'>Copié !</p> : <MdContentCopy id='copy-addr-button'/>}
                                </CopyToClipboard>
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