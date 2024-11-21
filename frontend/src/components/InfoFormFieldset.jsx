import React,{useState} from 'react'
import "../styles/InfoFormFieldset.css"
import { MdOutlineFileUpload } from "react-icons/md";


function InfoFormFieldset({register,errors,withIdCard=false,withIncomeProof=false}) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

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


    function handleDisplayErrorDiv() {
        return errors.email && errors.email?.message!=="required"
    }

    return (    
        <fieldset className='info-fieldset' ><legend>Vos informations</legend>
            <div className={handleDisplayErrorDiv() ? "error-message-div" : "invisible"}>
                {errors.email && errors.email.message!=="required" && <p>{errors.email.message}</p>}
            </div>
            <div>
                <div>
                    <label htmlFor="last-name">Nom*
                        <input 
                            className={errors.lastName ? "input-error" : ""}
                            type="text" 
                            id="last-name" 
                            name="lastName" 
                            {...register("lastName", { required: true })}
                        />
                    </label>
                    <label htmlFor="phone">Numéro de téléphone*
                        <input 
                            className={errors.phone ? "input-error" : ""}
                            type="text" 
                            id="phone" 
                            name="phone"
                            {...register("phone", { required: true })}
                        />
                    </label>
                    <label htmlFor="country">Pays*
                        <input 
                            className={errors.country ? "input-error" : ""}
                            type="text" 
                            id="country" 
                            name="country"
                            {...register("country", { required: true })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="first-name">Prénom*
                        <input 
                            className={errors.firstName ? "input-error" : ""}
                            type="text" 
                            id="first-name" 
                            name="firstName" 
                            {...register("firstName", { required: true })}
                        />
                    </label>
                    <label htmlFor="email">Adresse mail*
                        <input 
                            className={errors.email ? "input-error" : ""}
                            type="text" 
                            id="email" 
                            name="email"
                            {...register("email", { 
                                required: "required",
                                pattern: {
                                    value: emailRegex,
                                    message: "Format d'email invalide"
                                },
                                shouldValidate: true
                            
                            })}
                        />
                    </label>
                    <div>
                        <label htmlFor="city" >Ville*
                            <input 
                                className={errors.city ? "input-error" : ""}
                                type="text" 
                                id="city" 
                                name="city"
                                {...register("city", { required: true })}
                            />
                        </label>
                        <label htmlFor="postal-code">Code postal*
                            <input 
                                className={errors.postalCode ? "input-error" : ""}
                                type="text" 
                                id="postal-code" 
                                name="postalCode"
                                {...register("postalCode", { required: true })}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <label htmlFor="address">Adresse*
                <input 
                    className={errors.address ? "input-error" : ""}
                    type="text" 
                    id="address" 
                    name="address"
                    {...register("address", { required: true })}    
                />
            </label>
            <div>
                <input 
                    type="file" 
                    className="invisible" 
                    id="id-card" 
                    name="idCard" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={() => displayCardFileName()}
                    {...withIdCard==true ? {...register("idCard", { required: true })} : null}    
                />
                <label className={`${withIdCard ? "" : "invisible"} ${errors.idCard ? "input-error" : ""}`}>Carte d’identité*
                    <div className="div-upload">
                        <span id="id-card-file-name" className="file-name">Aucun fichier sélectionné</span>
                        <label className="inactive-label" htmlFor="id-card">
                            <MdOutlineFileUpload/>
                        </label>
                    </div>
                </label>
                <input 
                    type="file" 
                    className="invisible" 
                    id="income-proof" 
                    name="incomeProof" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={() => displayProofFileName()}
                    {...withIncomeProof==true ? {...register("incomeProof", { required: true })} : null}
                />
                <label className={`${withIncomeProof ? "" : "invisible"} ${errors.incomeProof ? "input-error" : ""}`}>Justificatif de revenu*
                    <div className="div-upload">
                        <span id="income-proof-file-name" className="file-name">Aucun fichier sélectionné</span>
                        <label className="inactive-label" htmlFor="income-proof">
                            <MdOutlineFileUpload/>
                        </label>
                    </div>
                </label>
            </div>
        </fieldset>
    )
}

export default InfoFormFieldset