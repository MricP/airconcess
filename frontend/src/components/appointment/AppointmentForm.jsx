import React, { useEffect, useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { CustomProvider } from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import InfoFormFieldset from './InfoFormFieldset'
import CustomTimePicker from '../general/CustomTimePicker'
import CustomDatePicker from '../general/CustomDatePicker'
import CustomSelectPicker from '../general/CustomSelectPicker';

// services functions
import { submitAppointment, loadTimestamps,loadAircrafts } from '../../services/appointment';

import "../../styles/appointment/AppointmentForm.css"

function AppointmentForm() {
    /* ####### LOAD DATA ####### */

    /* Format disabledTimestamps = [{ date:YYYY-MM-DD , hour:hh , minutes:[m,m,m,m] }] */
    const [disabledTimestamps, updateDisabledTimestamps] = useState([]);

    const loadDisabledTimestamps = async () => {
        try {
            const response = await loadTimestamps();
            
            const newDisabledTimestamps = [];

            // Convertir le tableau de timestamps retourné, en une liste de dico au formt souhaité
            response.data.forEach((timestamp) => {
                const [date, time] = timestamp.split(" ");
                const [hour, minutes] = time.split(':');

                // Chercher si cette date et heure existe a déjà été ajoutée
                const existingSlot = newDisabledTimestamps.find(
                    (slot) => slot.date === date && slot.hour === parseInt(hour, 10)
                );

                if (existingSlot) {
                    // Si oui, on ajoute le créneau au tableau des minutes
                    const minute = parseInt(minutes, 10);
                    if (!existingSlot.minutes.includes(minute)) {
                        existingSlot.minutes.push(minute);
                    }
                } else {
                    // Sinon, on crée un nouveau dico contenant la date, l'heure et le créneau (dans son tableau)
                    newDisabledTimestamps.push({
                        date,
                        hour: parseInt(hour, 10),
                        minutes: [parseInt(minutes, 10)],
                    });
                }
            });

            // Mettre à jour l'état avec les nouveaux crénaux à désactiver
            updateDisabledTimestamps(newDisabledTimestamps);
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message || 'Unknown error');
        }
    };

    const loadAvailableAircrafts = async () => {
        try {
            const response = await loadAircrafts();
            
            // console.log(response.data.message)
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    // Le chargement de toutes les data nécessaires (au 1er chargement de la page)
    useEffect(() => {
        console.log("ok")
        // Les crénaux à désactiver (déjà reservés)
        loadDisabledTimestamps()

        // La liste des Avions dans la BD (pour la recherche du modèle et du serialNumber)
        loadAvailableAircrafts()
    },[])

    // Ce sont les 2 seuls options à couvrir (les seuls présentes en BD)
    const reasonOptions = [
        { label: "J'envisage d'acheter un appareil", value: "purchase" },
        { label: "J'envisage de louer un appareil", value: "rent" }
    ];    

    const agencyOptions = [
        { label: "Agence 1", value: "A1" },
        { label: "Agence 2", value: "A2" }
    ];

    /* TODO : INITIALISER TOUT à null à L'AVENIR*/
    const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
        { defaultValues: {
            reason: "",
            model: "",
            serialNumber: "",
            agency: "",
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
        }}
    );

    const formData = watch();

    const [isCopied, setIsCopied] = useState(false);

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

    useEffect(() => {
        if(isCopied) {
            // Permet de réafficher l'icone pour copier après 1s
            setTimeout(() => {
                setIsCopied(false)
            },1000)
        }
    },[isCopied])

    const onSubmit = async (formData) => {
        try {
            const response = await submitAppointment({formData});
            console.log(response.data.message)
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    const handleKeyDown = (event) => {
        if(event.key == 'Enter') {
            if(event.target.tagName === 'BUTTON' && event.target.classList.contains("submit") || 
                event.target.tagName === 'SELECT') {
                // Si on clique sur entrer en étant sur le bouton submit
                // Ou qu'on est sur un SELECT
            } else {
                // Dans les autres cas, on retire juste le focus
                event.preventDefault()
                event.target.blur()
            }
        }
    }
    
    return (
        <div className="appointmentForm-container">
            <div className="form-container">
                <h3>FORMULAIRE DE PRISE DE RENDEZ-VOUS</h3>
                <form method='POST' onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="reason-fieldset">
                        <legend>Cause du rendez-vous</legend>
                        <div className="error-message-div invisible">
                            {errors.reason && <p>○ {errors.reason.message}</p>}
                            {errors.model && <p>○ {errors.model.message}</p>}
                            {errors.serialNumber && <p>○ {errors.serialNumber.message}</p>}
                        </div>
                        <div >
                            <p>Motif du rendez-vous*</p>
                            <CustomSelectPicker 
                                className={errors.reason ? "input-error" : ""}
                                data={reasonOptions} 
                                setValue={(value) => setValue("reason", value, errors.reason ? {shouldValidate: true} : {shouldValidate: false})} 
                                {...register("reason", { required: "Veuillez choisir votre motif de rendez-vous" })}
                            />
                        </div>
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

                    <InfoFormFieldset formData={formData} register={register} errors={errors} setValue={setValue} withIdCard={true} withIncomeProof={true}/>

                    <fieldset className="rdv-fieldset">
                        <legend>Programmer mon rendez-vous</legend>
                        <div className="error-message-div invisible">
                            {errors.date && <p>○ {errors.date.message}</p>}
                            {errors.time && <p>○ {errors.time.message}</p>}
                            {errors.agency && <p>○ {errors.agency.message}</p>}
                        </div>
                        <div id="div-slot-pickers">
                            <CustomProvider locale={frFR}>
                                <div>
                                    <p>Date*</p>
                                    <CustomDatePicker
                                        className={errors.date ? "input-error" : ""}
                                        disabledSlots={disabledTimestamps || []}
                                        selectedTime={handleSelectedSlot()}
                                        setDate={(value) => setValue("date", value, errors.date ? {shouldValidate: true} : {shouldValidate: false})} //shouldValidate actualise les erreurs (true) ou non (false) si la valeur est modifiée
                                        {...register("date", { required: "La date est obligatoire." })}
                                    />
                                </div>
                                <div>
                                    <p>Heure*</p>
                                    <CustomTimePicker
                                        className={errors.time ? "input-error" : ""}
                                        disabledSlots={disabledTimestamps || []}
                                        selectedDate={handleSelectedSlot()}
                                        setTime={(value) => setValue("time", value,errors.time ? {shouldValidate: true} : {shouldValidate: false})}
                                        {...register("time", { required: "L'heure est obligatoire." })} 
                                    />
                                </div>
                            </CustomProvider>
                        </div>
                        <label htmlFor="place-input">
                            Lieu*
                            <CustomSelectPicker 
                                className={errors.agency ? "input-error" : ""}
                                data={agencyOptions} 
                                placeholder={"Choisir parmi l'une de nos agences"}
                                setValue={(value) => setValue("agency", value, errors.agency ? {shouldValidate: true} : {shouldValidate: false})} 
                                {...register("agency", { required: true })}
                            />
                        </label>
                        <div className={formData.agency ? "" : "invisible"} id="addr-label">
                            <p>Adresse de l'agence</p>
                            <section>
                                <p>à afficher que si l'agence a été selectionnée</p>
                                <CopyToClipboard text={formData.agency /*TODO : Remplacer par l'adresse de l'agence*/} onCopy={() => setIsCopied(true)}>
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