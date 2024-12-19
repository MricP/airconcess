import React, { useState } from 'react';

import CustomDatePicker from "../general/CustomDatePicker";
import CustomTimePicker from "../general/CustomTimePicker";
import { CustomProvider } from 'rsuite';
import { frFR } from 'rsuite/locales'; // Locale française
import InfoPill from '../general/InfoPill';

import { IoIosClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";




import "../../styles/sub-training/TrainingPrefFormFieldset.css";

function TrainingPrefFormFieldset({ formData, register, errors, setValue }) {
    const [timeSlots, setTimeSlots] = useState([]); // Stocke des objets avec un identifiant unique
    const [isHovered, setIsHovered] = useState(false);

    function addTimeSlot() {
        const newSlot = { id: Date.now() }; // Crée un objet unique avec un id
        setTimeSlots([...timeSlots, newSlot]);
    }

    function removeTimeSlot(id) {
        const newTimeSlots = timeSlots.filter((slot) => slot.id !== id); // Filtre par identifiant unique
        setTimeSlots(newTimeSlots);
    }

    return (
        <fieldset className='trainingPrefFormFieldset'>
            <legend>Préférences de formation</legend>
            <div className='select-dates-div'>
                <CustomProvider locale={frFR}>
                    <div>
                        <p>Date de début*</p>
                        <CustomDatePicker
                            className={errors.startDate ? "input-error" : ""}
                            disabledSlots={[]}
                            disableAfter={formData.endDate}
                            selectedTime={null}
                            value={formData.startDate}
                            setDate={(value) => setValue("startDate", value, errors.startDate ? { shouldValidate: true } : { shouldValidate: false })}
                            {...register("startDate", { required: "La date est obligatoire." })}
                        />
                    </div>
                    <div>
                        <p>Date de fin*</p>
                        <CustomDatePicker
                            className={errors.endDate ? "input-error" : ""}
                            disabledSlots={[]}
                            disableBefore={formData.startDate}
                            selectedTime={null}
                            value={formData.endDate}
                            setDate={(value) => setValue("endDate", value, errors.endDate ? { shouldValidate: true } : { shouldValidate: false })}
                            {...register("endDate", { required: "La date est obligatoire." })}
                        />
                    </div>
                </CustomProvider>
            </div>
            <div>
                <div>
                    <p>Vos plages horaires</p>
                    <InfoPill />
                </div>
                <div className='time-slots'>
                    {timeSlots.length === 0 ? <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>Aucune plage selectionnée</div>: timeSlots.map((slot) => (
                        <div className="time-slot" key={slot.id}>
                            <p>De</p>
                            <CustomTimePicker
                                className={errors.date ? "input-error" : ""}
                                disabledSlots={[]}
                                selectedTime={null}
                                setDate={(value) =>
                                    setValue(
                                        "date",
                                        value,
                                        errors.date ? { shouldValidate: true } : { shouldValidate: false }
                                    )
                                }
                                {...register("date", { required: "La date est obligatoire." })}
                            />
                            <p>à</p>
                            <CustomTimePicker
                                className={errors.date ? "input-error" : ""}
                                disabledSlots={[]}
                                selectedTime={null}
                                setDate={(value) =>
                                    setValue(
                                        "date",
                                        value,
                                        errors.date ? { shouldValidate: true } : { shouldValidate: false }
                                    )
                                }
                                {...register("date", { required: "La date est obligatoire." })}
                            />
                            <IoIosClose className='button-del' onClick={() => removeTimeSlot(slot.id)}>
                                Supprimer
                            </IoIosClose>
                        </div>
                    ))}
                    <div className="" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        {isHovered ? <IoIosAddCircleOutline className = {timeSlots.length<5 ? "add-time-slot" :"invisible" } onClick={timeSlots.length<5 ? addTimeSlot : null} /> : 
                        <IoIosAddCircle className = {timeSlots.length<5 ? "add-time-slot" :"invisible" } onClick={timeSlots.length<5 ? addTimeSlot : null}/>}
                    </div>
                </div>
                
            </div>

            <label>
                Fréquence*
                <input></input>
            </label>
        </fieldset>
    );
}

export default TrainingPrefFormFieldset;
