import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { CustomProvider,Message,useToaster } from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import InfoFormFieldset from './InfoFormFieldset'
import CustomTimePicker from '../general/CustomTimePicker'
import CustomDatePicker from '../general/CustomDatePicker'
import CustomSelectPicker from '../general/CustomSelectPicker';


import "../../styles/appointment/AppointmentForm.css"

// services functions
import { loadAircraft,loadTimestamps,loadModels,loadAircraftsOfModel,submitAppointment,loadAgencies,loadAgencyLocation } from '../../services/appointment';

function AppointmentForm({setIsSubmitted}) {
    /*############ INITIALISATION DES STATES ############*/
    const toaster = useToaster();

    const [currentAircraft,setCurrentAircraft] = useState(null)
    
    const [agencyOptions,setAgencyOptions] = useState([]);
    const [selectedAgencyLocation,setSelectedAgencyLocation] = useState(null);
    const [modelOptions,setModelOptions] = useState([]); // Stock les differents models de la BD (label:model_name,value:model_id)
    const [aircraftOptions,setAircraftOptions] = useState([]); // Stock une liste d'appareils correspondant au model selectionné (label:serialNumber,value:aircraft_id)
    const [disabledTimestamps, updateDisabledTimestamps] = useState([]); // Format disabledTimestamps = [{ date:YYYY-MM-DD , hour:hh , minutes:[m,m,m,m] }]
    const [isCopied, setIsCopied] = useState(false); // Utilisé pour la copie de l'adresse de l'agence
    
    const {register,handleSubmit,watch,setValue,formState: { errors }} = useForm (
        { defaultValues: {
            reason: null,
            model: null,
            serialNumber: null,
            agency: null,
            date: null,
            time: null,
            firstName: null,
            lastName: null,
            phone: null,
            email: null,
            address: null,
            country: null,
            city: null,
            postalCode: null,
            idCard: null,
            incomeProof: null,
        }}
    );

    /*################### CONSTANTES ####################*/

    const location = useLocation().pathname.split("/");
    const idAircraft = parseInt(location[location.length - 1]); // Récupération de l'ID de l'appareil

    const formData = watch(); //formData est l'accès direct 

    const reasonOptions = [
        { label: "J'envisage d'acheter un appareil", value: "purchase" },
        { label: "J'envisage de louer un appareil", value: "rent" }
    ];    

    /*#################### FONCTIONS ####################*/

    const loadDisabledTimestamps = async () => {
        try {
            const response = await loadTimestamps(formData.agency.value);
            
            const newDisabledTimestamps = [];

            // Convertir le tableau de timestamps retourné, en une liste de dico au formt souhaité
            response.data?.forEach((timestamp) => {
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

    const loadAvailableAgencies = async () => {
        try {
            const response = await loadAgencies();
            setAgencyOptions(response.data)
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    }

    const loadSelectedAgencyLocation = async () => {
        try {
            const response = await loadAgencyLocation(formData.agency.value);
            setSelectedAgencyLocation(response.data)
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    }

    const loadAvailableModels = async () => {
        try {
            const response = await loadModels();
            setModelOptions(response.data)
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };
    
    const loadAircraftsWith = async (model_id) => {
        try {
            const response = await loadAircraftsOfModel(model_id);
            setAircraftOptions(response.data ? response.data : [])
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    const findAircraft = async (aircraft_id) => {
        try {
            const response = await loadAircraft(aircraft_id);
            return response.data 
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    // Fonction permettant de gerer la preselection d'un aircraft via l'id présente dans l'URL
    const handleIdLocation = async () => {
        if (!isNaN(idAircraft)) {
            let airc = await findAircraft(idAircraft)
            if(airc) {
                setCurrentAircraft(airc)
            } else {
                console.log("L'id dans l'url est invalide")
                //Ici on ne fait rien 
            }
        }
        
    };

    const handleSelectedSlot = () => {
        if(formData.date!=null) {
            return new Date(formData.date);
        }
        if(formData.time!=null) {
            let date = new Date();
            let [hours, minutes] = formData.time.split(':').map(Number);
            date.setHours(hours)
            date.setMinutes(minutes)
            date.setSeconds(0)
            return date;
        }
        return null;
    }

    const onSubmit = async (formData) => {
        try {
            const response = await submitAppointment({formData});
            
            if(response.data.success) {
                setIsSubmitted(true)
            } else {
                toaster.push(<Message type="error" showIcon><strong>Erreur! </strong>{response.data.message}</Message>,{ duration: 2000 })
                setValue("time",null)
                loadDisabledTimestamps() // On réactualise les disabledTimestamps
            }
            
        } catch (error) {
            console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            if((event.target.tagName === 'BUTTON' && event.target.classList.contains("submit")) || 
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

    const handleModelSelection = async (value) => {
        setValue("model", value, errors.model ? {shouldValidate: true} : {shouldValidate: false});
        setValue("serialNumber", null, errors.serialNumber ? {shouldValidate: true} : {shouldValidate: false});
        loadAircraftsWith(value?.value)
    }

    /*###################### AUTRE ######################*/

    useEffect(() => {
        // Recupération de toutes les data nécessaires, au premier chargement de la page    
        loadAvailableModels() // La liste des models dans la BD (pour la recherche du modèle et du serialNumber)
        loadAvailableAgencies()

        handleIdLocation() // Gere l'id present dans l'URL
    },[])

    // Gestion du model (en fonction de l'id dans l'URL)
    useEffect(() => {
        if (modelOptions.length !== 0 && currentAircraft) {
            let model = modelOptions.find(option => option.value == currentAircraft.model_id);
            handleModelSelection(model);
        }
    }, [currentAircraft]);

    // Gestion de l'appareil (en fonction de l'id dans l'URL)
    useEffect(() => {
        if (formData.model && currentAircraft) {
            if (aircraftOptions.length !== 0) {
                let aircraft = aircraftOptions.find(option => option.value == idAircraft);
                if (aircraft) {
                    setValue("serialNumber", aircraft, errors.serialNumber ? { shouldValidate: true } : { shouldValidate: false });
                }
                setCurrentAircraft(null) // Une fois selectionné, on vide le state pour autoriser l'utilisateur à changer son choix
            }
        }
    }, [formData.model,aircraftOptions]); 
    
    // Recup les crénaux indisponibles pour l'agence selectionnée, s'actualise à un changement d'agence
    useEffect(() => {
        setValue("date",null)
        setValue("time",null)
        if(formData.agency) {
            loadDisabledTimestamps() // Les crénaux à désactiver (déjà reservés)
            loadSelectedAgencyLocation()
        } else {
            updateDisabledTimestamps([])
            setSelectedAgencyLocation(null)
        }
    },[formData.agency])

    useEffect(() => {
        if(isCopied) {
            // Permet de réafficher l'icone pour copier après 1s
            setTimeout(() => {
                setIsCopied(false)
            },1000)
        }
    },[isCopied])
    
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
                                <CustomSelectPicker
                                    className={errors.model ? "input-error" : ""}
                                    id="model-input"
                                    data={modelOptions} 
                                    value={formData.model != null ? formData.model : ''}
                                    setValue={handleModelSelection}
                                    
                                    {...register("model", { required: "Selectionnez le model concerné" })}
                                />
                            </label>
                            <label htmlFor="serialNumber-input">
                                Numéro de série*
                                <CustomSelectPicker
                                    className={errors.serialNumber ? "input-error" : ""}
                                    id="serialNumber-input"
                                    data={aircraftOptions}
                                    value={formData.serialNumber != null ? formData.serialNumber : ''}
                                    setValue={(value) => {
                                        setValue("serialNumber", value, errors.serialNumber ? {shouldValidate: true} : {shouldValidate: false});
                                    }}
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
                        <label htmlFor="place-input">
                            Agence*
                            <CustomSelectPicker 
                                className={errors.agency ? "input-error" : ""}
                                data={agencyOptions}    
                                
                                setValue={(value) => {
                                    setValue("agency", value, errors.agency ? {shouldValidate: true} : {shouldValidate: false});
                                }}
                                {...register("agency", { required: true })}
                            />
                        </label>
                        <div className={formData.agency ? "" : "invisible"} id="div-slot-pickers">
                            <CustomProvider locale={frFR}>
                                <div>
                                    <p>Date*</p>
                                    <CustomDatePicker
                                        className={errors.date ? "input-error" : ""}
                                        disabledSlots={disabledTimestamps || []}
                                        selectedTime={handleSelectedSlot()}
                                        value={formData.date}
                                        setDate={(value) => {
                                            setValue("date", value, errors.date ? {shouldValidate: true} : {shouldValidate: false}) //shouldValidate actualise les erreurs (true) ou non (false) si la valeur est modifiée
                                        }}
                                        {...register("date", { required: "La date est obligatoire." })}
                                    />
                                </div>
                                <div>
                                    <p>Heure*</p>
                                    <CustomTimePicker
                                        className={errors.time ? "input-error" : ""}
                                        disabledSlots={disabledTimestamps || []}
                                        selectedDate={handleSelectedSlot()}
                                        value={formData.time}
                                        setTime={(value) => setValue("time", value,errors.time ? {shouldValidate: true} : {shouldValidate: false})}
                                        {...register("time", { required: "L'heure est obligatoire." })} 
                                    />
                                </div>
                            </CustomProvider>
                        </div>
                        <div className={formData.agency ? "" : "invisible"} id="addr-label">
                            <p>Adresse de l'agence</p>
                            <section>
                                <p>{selectedAgencyLocation}</p>
                                <CopyToClipboard text={selectedAgencyLocation} onCopy={() => setIsCopied(true)}>
                                    {isCopied ? <p id="copy-addr-message">Copié !</p> : <MdContentCopy id="copy-addr-button" />}
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