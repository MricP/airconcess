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

    const [formData, setFormData] = useState({
        reason: "",
        model: "",
        serialNumber: "",
        placeAppointment: "",
        date: null,
        time: null,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        city: "",
        postalCode: "",
        idCard: null,
        incomeProof: null
    })

    function handleInputChange(event) {
        let {value,name} = event.target;
        setFormData((prevValue)=>({
            ...prevValue,
            [name]:value,
        }))
    }

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
        console.log(formData.time)
        console.log(formData.date)
        
        ev.preventDefault();
    }

    function handleSelectedSlot() {
        if(formData.date!=null) {
            return new Date(formData.date);
        }
        if(formData.time!=null) {
            let date = new Date();
            let [hours, minutes, seconds] = formData.time.split(':').map(Number);
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
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <form onSubmit={handleSubmit}>
                    <fieldset className='reason-fieldset'><legend>Cause du rendez-vous</legend>
                        <div className='error-message-div'>Veuillez corriger les erreurs ci-dessous !</div>
                        <label htmlFor="reason-input">Motif du rendez-vous*
                            <input id="reason-input" name="reason" type="text" value={formData.reason} onChange={handleInputChange}/>
                        </label>
                        <div>
                            <label htmlFor="model-input">Modèle de l'appareil*
                                <input type="text" id="model-input" name="model" value={formData.model} onChange={handleInputChange}/>
                            </label>
                            <label htmlFor="serialNumber-input">Numéro de série*
                                <input type="text" id="serialNumber-input" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange}/>
                            </label>
                        </div>
                    </fieldset>

                    <InfoFormFieldset/>

                    <fieldset className='rdv-fieldset'><legend>Programmer mon rendez-vous</legend>
                        <div className='error-message-div'>Veuillez corriger les erreurs ci-dessous !</div>
                        <div id='div-slot-pickers'>
                            <CustomProvider locale={frFR}>
                                <div>
                                    <p>Date*</p>
                                    <CustomDatePicker disabledSlots={disabledSlots|| []} selectedTime={handleSelectedSlot()} setDate={(value)=>setFormData((prevValue)=>({...prevValue,["date"]:value,}))}/>
                                </div>
                                <div>
                                    <p>Heure</p>
                                    <CustomTimePicker disabledSlots={disabledSlots|| []} selectedDate={handleSelectedSlot()} setTime={(value)=>setFormData((prevValue)=>({...prevValue,["time"]:value,}))}/>
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