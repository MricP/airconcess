import React from 'react'
import CustomDatePicker from "../general/CustomDatePicker"
import "../../styles/profile/TrainingProposal.css"
import CustomTimePicker from '../general/CustomTimePicker'
import { RxCross1 } from "react-icons/rx";


function TrainingProposal({noProposal,proposId,formData,errors,setValue,register,removeProposal}) {
  return (
    <div className='tp-container'>
        <div className='tp-header'>
            <p className='title'>Proposition {noProposal}</p>
            <RxCross1  className='button-del' onClick={() => removeProposal(proposId)}>
                Supprimer
            </RxCross1 >
        </div>
        <table className='tp-table'>
            <tbody>
                <tr className='TrainingProposal-border'>
                    <th>Jours</th>
                    <th>Lundi</th>
                    <th>Mardi</th>
                    <th>Mercredi</th>
                    <th>Jeudi</th>
                    <th>Vendredi</th>
                </tr>        
                <tr className='TrainingProposal-border'>
                    <th>Horaires</th>
                    <td><CustomTimePicker
                        setTime={value => setValue(`proposals.${proposId}.hourMonday`,value)}
                        value={formData.proposals?.[proposId]?.hourMonday}
                    /></td>
                    <td><CustomTimePicker
                        setTime={value => setValue(`proposals.${proposId}.hourTuesday`,value)}
                        value={formData.proposals?.[proposId]?.hourTuesday}
                    /></td>
                    <td><CustomTimePicker
                        setTime={value => setValue(`proposals.${proposId}.hourWednesday`,value)}
                        value={formData.proposals?.[proposId]?.hourWednesday}
                    /></td>
                    <td><CustomTimePicker
                        setTime={value => setValue(`proposals.${proposId}.hourThursday`,value)}
                        value={formData.proposals?.[proposId]?.hourThursday}
                    /></td>
                    <td><CustomTimePicker
                        setTime={value => setValue(`proposals.${proposId}.hourFriday`,value)}
                        value={formData.proposals?.[proposId]?.hourFriday}
                    /></td>
                </tr>
            </tbody>    
        </table>
        <div className='tp-dates-container'>
            <div>
                <p>Date de début</p>
                <CustomDatePicker
                    className={errors.proposals?.[proposId]?.dateStart ? "input-error" : ""}
                    disabledSlots={[]}
                    // disableAfter={formData.proposals?.[key] ? formData.proposals?.[key]?.dateEnd : null}
                    setDate={(value) => setValue(`proposals.${proposId}.dateStart`,value, errors.proposals?.[proposId]?.dateStart ? { shouldValproposIdate: true } : { shouldValproposIdate: false })}
                    value={formData?.proposals?.[proposId]?.dateStart}
                    {...register(`proposals.${proposId}.dateStart`, { required: "La date de début est obligatoire." })}
                />
            </div>
            <div>
                <p>Date de fin</p>
                <CustomDatePicker
                    className={errors.proposals?.[proposId]?.dateEnd ? "input-error" : ""}
                    disabledSlots={[]}
                    // disableBefore={formData.proposals?.[key] ? formData.proposals?.[key]?.dateStart : null}
                    setDate={(value) => setValue(`proposals.${proposId}.dateEnd`,value, errors.proposals?.[proposId]?.dateEnd ? { shouldValproposIdate: true } : { shouldValproposIdate: false })}
                    value={formData?.proposals?.[proposId]?.dateEnd}
                    {...register(`proposals.${proposId}.dateEnd`, { required: "La date de fin est obligatoire." })}
                />
            </div>
        </div>
    </div>
  )
}

export default TrainingProposal