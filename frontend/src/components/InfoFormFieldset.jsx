import {React,useState} from 'react'
import "../styles/InfoFormFieldset.css"
import { MdOutlineFileUpload } from "react-icons/md";


function InfoFormFieldset({setFirstName,setLastName,setPhone,setCountry,setEmail,setCity,setPostalCode}) {
    
    const [infoErrorMessage, setInfoErrorMessage] = useState([]);

    const [InfoFormFieldsetData,setInfoData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        email: "",
        city: "",
        postalCode: "",
    })

    function handleInputChange(event) {
        if(event.target.value != "") {
            let errorMessages=[...infoErrorMessage];
            let errorMessage = "";  
            if(event.target.name === "firstName"){
                errorMessage = "Le prénom doit faire plus de 10 caractères";
                if(verifyFirstName(event.target)) {
                    if (errorMessages.includes(errorMessage)) errorMessages = errorMessages.filter((value) => value !== errorMessage)
                } else {
                    if (!errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
                }
            }
            if(event.target.name === "lastName"){
                errorMessage = "Le nom doit faire plus de 10 caractères";
                if(verifyLastName(event.target)) {
                    if (errorMessages.includes(errorMessage)) errorMessages = errorMessages.filter((value) => value !== errorMessage)
                } else {
                    if (!errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
                }
            }
            setInfoErrorMessage(errorMessages)
        }
    } 

    function verifyFirstName(target) {
        if(target.name === 'firstName') {
            if(target.value.length<10) {
                target.classList.add('error-input')
                return false;
            } else {
                target.classList.remove('error-input')
                return true;
            }
        }
        return true;
    }

    function verifyLastName(target) {
        if(target.name === 'lastName') {
            if(target.value.length<10) {
                target.classList.add('error-input')
                return false;
            } else {
                target.classList.remove('error-input')
                return true;
            }
        }
        return true;
    }

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

    function handleErrorMessageDisplay() {
        return infoErrorMessage.map((message,i) => (<p key={i}>○ {message}</p>))
    }

    return (    
        <fieldset className='info-fieldset' ><legend>Vos informations</legend>
            <div className={`error-message-div ${infoErrorMessage.length > 0 ? '' : 'invisible'}`}>{handleErrorMessageDisplay()}</div>
            <div>
                <div>
                    <label htmlFor="last-name">Nom*
                        <input type="text" id="last-name" name="lastName" onBlur={handleInputChange}/>
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
                        <input type="text" id="first-name" name="firstName" onBlur={handleInputChange}/>
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
            <label htmlFor="address">Adresse*
                <input type="text" id="address" name="address"/>
            </label>
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