import React from 'react'
import CustomDatePicker from "../general/CustomDatePicker"
import "../../styles/profile/TrainingProposal.css"

function TrainingProposal() {
  return (
    <div className='TrainingProposal-container'>

        <h4>Préférences utilisateur</h4>
        <p>Date : </p>
        <p>Horaires :</p>
        <table className='TrainingProposal-border'>
            <tbody>
                <tr className='TrainingProposal-border'>
                    <th>Jours</th>
                    <th>L</th>
                    <th>M</th>
                    <th>M</th>
                    <th>J</th>
                    <th>V</th>
                </tr>        
                <tr className='TrainingProposal-border'>
                    <th>Horaires</th>
                    <td><p contentEditable="true"></p></td>
                    <td><p contentEditable="true"></p></td>
                    <td><p contentEditable="true"></p></td>
                    <td><p contentEditable="true"></p></td>
                    <td><p contentEditable="true"></p></td>
                </tr>
            </tbody>
            
        </table>
        <div className='TrainingProposal-chooseDate-container'>
            <div className='TrainingProposal-chooseDate'>Date de début<CustomDatePicker className="TrainingProposal-date" placeholder="Date de début"/></div>
            <div className='TrainingProposal-chooseDate'>Date de fin<CustomDatePicker className="TrainingProposal-date" /></div>
        </div>
    </div>
  )
}

export default TrainingProposal