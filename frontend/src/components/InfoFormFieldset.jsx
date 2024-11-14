import React from 'react'
import "../styles/InfoFormFieldset.css"
import { MdOutlineFileUpload } from "react-icons/md";


function InfoFormFieldset() {
    function displayCardFileName() {
        const element = document.getElementById("id-card-file-name");
        const input = document.getElementById('id-card');

        element.innerText = input.files[0].name;
    }

    function displayProofFileName() {
        const element = document.getElementById("income-proof-file-name");
        const input = document.getElementById('income-proof');

        element.innerText = input.files[0].name;
    }

    return (
        <fieldset className='info-fieldset' ><legend>Vos informations</legend>
            <div>
                <div>
                    <label htmlFor="last-name">Nom*
                        <input type="text" id="last-name" name="lastName"/>
                    </label>
                    <label htmlFor="phone">Numéro de téléphone*
                        <input type="text" id="phone" name="phone"/>
                    </label>
                    <label htmlFor="country">Pays*
                        <input type="text" id="country" name="country"/>
                    </label>
                </div>
                <div>
                    <label htmlFor="first-name">Prénom*
                        <input type="text" id="first-name" name="firstName"/>
                    </label>
                    <label htmlFor="email">Adresse mail*
                        <input type="text" id="email" name="email"/>
                    </label>
                    <div>
                        <label htmlFor="city" >Ville*
                            <input type="text" id="city" name="city"/>
                        </label>
                        <label htmlFor="postal-code">Code postal*
                            <input type="text" id="postal-code" name="postalCode"/>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <input type="file" className="invisible-input" id="id-card" name="idCard" accept=".pdf,.jpg,.jpeg,.png" onChange={() => displayCardFileName()}/>
                <label>Carte d’identité*
                    <div className="div-upload">
                        <span id="id-card-file-name" className="file-name">Aucun fichier sélectionné</span>
                        <label className="invisible-label" htmlFor="id-card">
                            <MdOutlineFileUpload/>
                        </label>
                    </div>
                </label>
                <input type="file" className="invisible-input" id="income-proof" name="incomeProof" accept=".pdf,.jpg,.jpeg,.png" onChange={() => displayProofFileName()}/>
                <label>Justificatif de revenu*
                    <div className="div-upload">
                        <span id="income-proof-file-name" className="file-name">Aucun fichier sélectionné</span>
                        <label className="invisible-label" htmlFor="income-proof">
                            <MdOutlineFileUpload/>
                        </label>
                    </div>
                </label>
            </div>
        </fieldset>
    )
}

export default InfoFormFieldset