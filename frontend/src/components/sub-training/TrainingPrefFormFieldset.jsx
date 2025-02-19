import React, { useEffect, useState } from 'react';


import CustomSelectPicker from "../general/CustomSelectPicker";

import CustomDatePicker from "../general/CustomDatePicker";
import CustomTimePicker from "../general/CustomTimePicker";
import { CustomProvider } from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import InfoPill from '../general/InfoPill';

import { RxCross1 } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

import "../../styles/sub-training/TrainingPrefFormFieldset.css";
import CopyableSection from '../general/CopyableSection';

function TrainingPrefFormFieldset({ trainers, formData, register, errors, setValue }) {
    /*############ INITIALISATION DES STATES ############*/

    const [trainersOptions,setTrainersOptions] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]); // Stocke des objets avec un identifiant unique
    const [isHovered, setIsHovered] = useState(false);

    /*################### REFERENCES ####################*/
    // Pour utiliser les states dans les useEffect sans détecter un changement de cette variable
    

    /*#################### FONCTIONS ####################*/

    function addTimeSlot() {
        const newSlot = {id: "id"+Math.round(Math.random()*10000) }; // Crée un objet unique avec un id
           
        setTimeSlots([...timeSlots, newSlot]);
    }

    const removeTimeSlot = (id) => {
        setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));   // Suppression
        if (formData?.prefSlots) {
            // Suppression de la plage horaire dans le useForm
            delete formData.prefSlots[id];
        }
    };

    /*###################### AUTRE ######################*/

    // Sert à recharger les timeSlots de préference si on passe l'etape et que l'on revient en arriere
    useEffect(() => {
        let temp = timeSlots;
        for(let key in formData.prefSlots) {
            temp = [...temp,{id:key}]
            setTimeSlots(temp)
        }
    },[]);

    function handleContent() {
        const tr = trainers?.filter(trainer => trainer?.id === formData.trainer?.value)[0]
        return `${tr?.address}, ${tr?.country}, ${tr?.city}`
    }

    useEffect(() => {
        const trainersOptionsTemp = [];
        trainers?.forEach(trainer => {
            trainersOptionsTemp.push({
                value: trainer.id,
                label:`${trainer.firstName} ${trainer.lastName}, ${trainer.country}, ${trainer.city}`
            })
        }); 
        setTrainersOptions(trainersOptionsTemp)
    },[trainers])

    return (
        <fieldset className='trainingPrefFormFieldset'>
            <legend>Préférences de formation</legend>
            <div>
                <p>Formateur affilié*</p>
                <CustomSelectPicker 
                    isSearchable={true}
                    className={errors.trainer ? "input-error" : ""}
                    data={trainersOptions}
                    value={formData.trainer != null ? formData.trainer : ''}
                    setValue={(value) => {
                        setValue("trainer", value, errors.trainer ? {shouldValidate: true} : {shouldValidate: false});
                    }}
                    {...register("trainer", { required: true })}
                />
            </div>
            <div className={formData.trainer ? "" : "invisible"}>
                <p>Adresse du centre de formation</p>
                <CopyableSection content={handleContent()}/>
            </div>
            <div className='select-dates-div'>
                <CustomProvider locale={frFR}>
                    <div>
                        <p>Date de début*</p>
                        <CustomDatePicker
                            className={errors.dateStart ? "input-error" : ""}
                            disabledSlots={[]}
                            disableAfter={formData.dateEnd}
                            value={formData.dateStart}
                            setDate={(value) => setValue("dateStart", value, errors.dateStart ? { shouldValidate: true } : { shouldValidate: false })}
                            {...register("dateStart", { required: "La date est obligatoire." })}
                        />
                    </div>
                    <div>
                        <p>Date de fin*</p>
                        <CustomDatePicker
                            className={errors.dateEnd ? "input-error" : ""}
                            disabledSlots={[]}
                            disableBefore={formData.dateStart}
                            value={formData.dateEnd}
                            setDate={(value) => setValue("dateEnd", value, errors.dateEnd ? { shouldValidate: true } : { shouldValidate: false })}
                            {...register("dateEnd", { required: "La date est obligatoire." })}
                        />
                    </div>
                </CustomProvider>
            </div>
            <div className="pref-slots-div">
                <div>
                    <p>Vos plages horaires</p>
                    <InfoPill text={"Indiquez vos plages horaires afin que le formateur puisse les prendre en compte pour établir votre planning de formation."}/>
                </div>
                <div className='time-slots' id={timeSlots.length === 0 ? "nothing" : ""}>
                    {
                        timeSlots.length === 0 ? 
                            <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>Aucune plage selectionnée</div> : 
                
                        timeSlots.map((slot) => (
                            <div className="time-slot" key={slot.id}>
                                <p>De</p>
                                <CustomTimePicker
                                    className={errors.prefSlots?.[slot.id]?.hourStart ? "input-error" : ""}
                                    disabledSlots={[]}
                                    disableAfter={formData.prefSlots?.[slot.id] ? formData.prefSlots?.[slot.id]?.hourEnd : null}
                                    setTime={(value) =>
                                        setValue(
                                            `prefSlots.${slot.id}.hourStart`,
                                            value,
                                            errors.prefSlots?.[slot.id]?.hourStart ? { shouldValidate: true } : { shouldValidate: false }
                                        )
                                    }
                                    value={formData?.prefSlots?.[slot.id]?.hourStart}
                                    {...register(`prefSlots.${slot.id}.hourStart`, { required: "L'heure de début est obligatoire." })}
                                />
                                <p>à</p>
                                <CustomTimePicker
                                    className={errors.prefSlots?.[slot.id]?.hourEnd ? "input-error" : ""}
                                    disabledSlots={[]}
                                    disableBefore={formData.prefSlots?.[slot.id] ? formData.prefSlots?.[slot.id]?.hourStart : null}
                                    setTime={(value) =>
                                        setValue(
                                            `prefSlots.${slot.id}.hourEnd`,
                                            value,
                                            errors.prefSlots?.[slot.id]?.hourEnd ? { shouldValidate: true } : { shouldValidate: false }
                                        )
                                    }
                                    value={formData?.prefSlots?.[slot.id]?.hourEnd}
                                    {...register(`prefSlots.${slot.id}.hourEnd`, { required: "L'heure de fin est obligatoire." })}
                                />
                                <RxCross1  className='button-del' onClick={() => removeTimeSlot(slot.id)}>
                                    Supprimer
                                </RxCross1 >
                            </div>)
                        )
                    }
                    <div
                        className="icon-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        
                        <IoIosAddCircle
                            className={`add-time-slot ${isHovered ? "visible" : "hidden"} ${
                            timeSlots.length < 5 ? "" : "invisible"
                            }`}
                            onClick={timeSlots.length < 5 ? addTimeSlot : null}
                        />
                        <IoIosAddCircleOutline
                            className={`add-time-slot ${!isHovered ? "visible" : "hidden"} ${
                            timeSlots.length < 5 ? "" : "invisible"
                            }`}
                            onClick={timeSlots.length < 5 ? addTimeSlot : null}
                        />
                    </div>
                </div>       
            </div>

            <label>
                <div style={{display: "flex"}}>
                    <p>Fréquence*</p>
                    <InfoPill text='Nombre de séances/semaine (± 2h)'/>
                </div>
                
                <input
                    className={errors?.prefFrequency ? "input-error" : ""}
                    type="number"
                    min={1}
                    max={5}
                    name="prefFrequency" 
                    value={formData.prefFrequency != null ? formData.prefFrequency : ''}
                    {...register("prefFrequency", { 
                        required: true,
                        pattern: {
                            value: /^[1-5]{1}$/,
                            message: "○ Un moins une séance nécessaire || Au plus 5 séances possible"
                        },
                    })}
                ></input>
            </label>
        </fieldset>
    );
}

export default TrainingPrefFormFieldset;
