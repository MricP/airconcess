import React, { useEffect, useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import '../../styles/pageAppointment/AppointmentForm.css'
import InfoFormFieldset from '../InfoFormFieldset'
import CustomTimePicker from '../CustomTimePicker'
import CustomDatePicker from '../CustomDatePicker'
import {CustomProvider} from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";

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

    const {register,handleSubmit,setValue,watch, formState: { errors }} = useForm(
        { defaultValues: {
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
            incomeProof: null,
        }});

    const formData = watch(); // Permet de surveiller les champs du formulaire

    // function handleInputChange(event) {
    //     let {value,name} = event.target;
    //     setFormData((prevValue)=>({
    //         ...prevValue,
    //         [name]:value,
    //     }))
    // }

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if(isCopied) {
            // Permet de réafficher l'icone pour copier après 1s
            setTimeout(() => {
                setIsCopied(false)
            },1000)
        }
    },[isCopied])

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

    const onSubmit = (data) => {
        // console.log("Données soumises :", data);
    };

    

    
    return (
        <div className="appointmentForm-container">
            <div className="form-container">
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="reason-fieldset">
                        <legend>Cause du rendez-vous</legend>
                        <div className={(errors.reason || errors.model || errors.serialNumber) ? "error-message-div" : "invisible"}>
                            {errors.reason && <p>○ {errors.reason.message}</p>}
                            {errors.model && <p>○ {errors.model.message}</p>}
                            {errors.serialNumber && <p>○ {errors.serialNumber.message}</p>}
                        </div>
                        <label htmlFor="reason-input">
                            Motif du rendez-vous*
                            <input
                                className={errors.reason ? "input-error" : ""}
                                id="reason-input"
                                name="reason"
                                type="text"
                                {...register("reason", { required: "Veuillez choisir votre motif de rendez-vous" })}
                            />
                        </label>
                        <div>
                            <label htmlFor="model-input">
                                Modèle de l'appareil*
                                <input
                                    className={errors.model ? "input-error" : ""}
                                    type="text"
                                    id="model-input"
                                    name="model"
                                    {...register("model", { required: "Selectionnez le model concerné" })}
                                />
                            </label>
                            <label htmlFor="serialNumber-input">
                                Numéro de série*
                                <input
                                    className={errors.serialNumber ? "input-error" : ""}
                                    type="text"
                                    id="serialNumber-input"
                                    name="serialNumber"
                                    {...register("serialNumber", { required: "Choisir le numéro de serie de l'appareil" })}
                                />
                            </label>
                        </div>
                    </fieldset>

                    <InfoFormFieldset />

                    <fieldset className="rdv-fieldset">
                        <legend>Programmer mon rendez-vous</legend>
                        <div className={(errors.date || errors.time || errors.placeAppointment) ? "error-message-div" : "invisible"}>
                            {errors.date && <p>○ {errors.date.message}</p>}
                            {errors.time && <p>○ {errors.time.message}</p>}
                            {errors.placeAppointment && <p>○ {errors.placeAppointment.message}</p>}
                        </div>
                        <div id="div-slot-pickers">
                            <CustomProvider locale={frFR}>
                                <div>
                                    <p>Date*</p>
                                    <CustomDatePicker
                                        className={errors.date ? "input-error" : ""}
                                        disabledSlots={disabledSlots || []}
                                        selectedTime={handleSelectedSlot()}
                                        setDate={(value) => setValue("date", value,{ shouldValidate: true })} //shouldValidate sert à mettre à jour la valeur en actualisant les erreurs
                                        {...register("date", { required: "La date est obligatoire." })}
                                    />
                                </div>
                                <div>
                                    <p>Heure</p>
                                    <CustomTimePicker
                                        className={errors.time ? "input-error" : ""}
                                        disabledSlots={disabledSlots || []}
                                        selectedDate={handleSelectedSlot()}
                                        setTime={(value) => setValue("time", value,{ shouldValidate: true })}
                                        {...register("time", { required: "L'heure est obligatoire." })}
                                        
                                    />
                                </div>
                            </CustomProvider>
                        </div>
                        <label htmlFor="place-input">
                            Lieu*
                            <input
                                className={errors.placeAppointment ? "input-error" : ""}
                                type="text"
                                id="place-input"
                                name="placeAppointment"
                                placeholder="-- Choisir parmi nos agences disponibles --"
                                {...register("placeAppointment", { required: "Choisissez une agence" })}
                            />
                        </label>
                        <div className="invisible" id="addr-label">
                            <p>Adresse de l'agence</p>
                            <section>
                                <p>à afficher que si l'agence a été selectionnée</p>
                                <CopyToClipboard text={"a"} onCopy={() => setIsCopied(true)}>
                                    {isCopied ? (
                                        <p id="copy-addr-message">Copié !</p>
                                    ) : (
                                        <MdContentCopy id="copy-addr-button" />
                                    )}
                                </CopyToClipboard>
                            </section>
                        </div>
                    </fieldset>

                    <button className="submit" type="submit">
                        Valider mon rendez-vous
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AppointmentForm