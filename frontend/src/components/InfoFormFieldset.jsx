import React from 'react'
import "../styles/InfoFormFieldset.css"
import { MdOutlineFileUpload } from "react-icons/md";
import countryList from 'react-select-country-list';
import CustomSelectPicker from './CustomSelectPicker';
import { City } from "country-state-city";



import CustomPhoneInput from './CustomPhoneInput';


function InfoFormFieldset({formData,register,errors,withIdCard=false,withIncomeProof=false,setValue}) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i    
    const postalCodeRegex = /^[0-9]/

    function displayCardFileName() {
        const element = document.getElementById("id-card-file-name");
        const input = document.getElementById('id-card');

        if(input.files[0] != null) {
            element.innerText = input.files[0].name;
        }
    }

    function displayProofFileName() {
        console.log("Ok")
        const element = document.getElementById("income-proof-file-name");
        const input = document.getElementById('income-proof');

        if(input.files[0] != null) {
            element.innerText = input.files[0].name;
        }
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
                    <div>
                        <p>Numéro de téléphone*</p>
                        <CustomPhoneInput
                            className={errors.phone ? "input-error" : ""} 
                            setValue={(value) => setValue("phone", value, errors.phone ? {shouldValidate: true} : {shouldValidate: false})}
                            {...register("phone", { required: true })}/>
                        </div>
                    <div>
                        <p>Pays*</p>
                        <CustomSelectPicker 
                            searchable={true}
                            className={errors.country ? "input-error" : ""}
                            data={countryList().getData()} 
                            setValue={(value) => setValue("country", value, errors.country ? {shouldValidate: true} : {shouldValidate: false})} 
                            {...register("country", { required: true })}
                        />
                    </div>
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
                                    message: "○ Format d'email invalide !"
                                },
                                shouldValidate: true
                            
                            })}
                        />
                    </label>
                    <div>
                        <label htmlFor="city" >Ville*
                            <CustomSelectPicker 
                                searchable={true}
                                className={errors.city ? "input-error" : ""}
                                data={formData.country ? City.getCitiesOfCountry(formData.country).map(
                                    (city) => ({
                                        value: city.name,
                                        label: city.name,
                                    })
                                ) : []} 
                                setValue={(value) => setValue("city", value, errors.city ? {shouldValidate: true} : {shouldValidate: false})} 
                                {...register("city", { required: true })}
                            />
                        </label>
                        {/* TODO : ATTENTION CERTAINES PAYS N'ONT PAS DE CODE POSTAL*/}
                        <label htmlFor="postal-code">Code postal*
                            <input 
                                className={errors.postalCode ? "input-error" : ""}
                                type="text" 
                                onInput={(e) => {e.target.value = e.target.value.replace(/\D/,'')}}
                                    /* Remplace tout ce qui n'est pas un chiffre par un vide */
                                id="postal-code" 
                                name="postalCode"
                                {...register("postalCode", { 
                                    required: "required",
                                    pattern: {
                                        value: postalCodeRegex,
                                        message: "○ Le code postal n'est constitué que de chiffres !"
                                    },
                                    shouldValidate: true
                                })}
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
                    onInput={() => displayCardFileName()}
                    {...withIdCard===true ? {...register("idCard", { required: true })} : null}    
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
                    onInput={() => displayProofFileName()}
                    {...withIncomeProof===true ? {...register("incomeProof", { required: true })} : null}
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