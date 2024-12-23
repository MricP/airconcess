import React from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { City } from "country-state-city";
import countryList from 'react-select-country-list';
import CustomSelectPicker from '../general/CustomSelectPicker';
import CustomPhoneInput from '../general/CustomPhoneInput';

import "../../styles/appointment/InfoFormFieldset.css"


function InfoFormFieldset({formData,register,errors,withIdCard=false,withIncomeProof=false,setValue}) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i    
    const postalCodeRegex = /^[0-9]/

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
                    <label htmlFor="last-name">
                        <p>Nom*</p>
                        <input 
                            className={errors.lastName ? "input-error" : ""}
                            type="text" 
                            id="last-name" 
                            name="lastName" 
                            value={formData.lastName != null ? formData.lastName : ''}
                            {...register("lastName", { required: true })}
                        />
                    </label>
                    <div>
                        <p>Numéro de téléphone*</p>
                        <CustomPhoneInput
                            className={errors.phone ? "input-error" : ""} 
                            value={formData.phone != null ? formData.phone : ''}
                            setValue={(value) => setValue("phone", value, errors.phone ? {shouldValidate: true} : {shouldValidate: false})}
                            {...register("phone", { required: true })}/>
                        </div>
                    <div>
                        <p>Pays*</p>
                        <CustomSelectPicker 
                            searchable={true}
                            className={errors.country ? "input-error" : ""}
                            data={countryList().getData()} 
                            value={formData.country != null ? formData.country : ''}
                            setValue={(value) => setValue("country", value, errors.country ? {shouldValidate: true} : {shouldValidate: false})} 
                            {...register("country", { required: true })}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="first-name">
                        <p>Prénom*</p>
                        <input 
                            className={errors.firstName ? "input-error" : ""}
                            type="text" 
                            id="first-name" 
                            name="firstName" 
                            value={formData.firstName != null ? formData.firstName : ''}
                            {...register("firstName", { required: true })}
                        />
                    </label>
                    <label htmlFor="email">
                        <p>Adresse mail*</p>
                        <input 
                            className={errors.email ? "input-error" : ""}
                            type="text" 
                            id="email" 
                            name="email"
                            value={formData.email != null ? formData.email : ''}
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
                        <label htmlFor="city" >
                            <p>Ville*</p>
                            <CustomSelectPicker 
                                searchable={true}
                                className={errors.city ? "input-error" : ""}
                                data={formData.country ? City.getCitiesOfCountry(formData.country).map(
                                    (city) => ({
                                        value: city.name,
                                        label: city.name,
                                    })
                                ) : []} 
                                value={formData.city != null ? formData.city : ''}
                                setValue={(value) => setValue("city", value, errors.city ? {shouldValidate: true} : {shouldValidate: false})} 
                                {...register("city", { required: true })}
                            />
                        </label>
                        {/* TODO : ATTENTION CERTAINES PAYS N'ONT PAS DE CODE POSTAL*/}
                        <label htmlFor="postal-code">
                            <p>Code postal*</p>
                            <input 
                                className={errors.postalCode ? "input-error" : ""}
                                type="text" 
                                onInput={(e) => {e.target.value = e.target.value.replace(/\D/,'')}}
                                    /* Remplace tout ce qui n'est pas un chiffre par un vide */
                                id="postal-code" 
                                name="postalCode"
                                value={formData.postalCode != null ? formData.postalCode : ''}
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
            <label htmlFor="address">
                <p>Adresse*</p>
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
                    //Ici on ne peut pas mettre de value à un input file donc on retire simplement la contrainte s'il y a déjà un fichier  
                    {...withIdCard===true && formData.idCard === null ? {...register("idCard", { required: true })} : null}  
                    
                />
                <label className={`${withIdCard ? "" : "invisible"} ${errors.idCard ? "input-error" : ""}`}>
                    <p>Carte d’identité*</p>
                    <div className="div-upload">
                        <span id="id-card-file-name" className="file-name">{formData.idCard != null ? formData.idCard[0].name :"Aucun fichier sélectionné"}</span>
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
                    {...withIncomeProof===true && formData.incomeProof === null? {...register("incomeProof", { required: true })} : null}
                />
                <label className={`${withIncomeProof ? "" : "invisible"} ${errors.incomeProof ? "input-error" : ""}`}>
                    <p>Justificatif de revenu*</p>
                    <div className="div-upload">
                        <span id="income-proof-file-name" className="file-name">{formData.incomeProof != null ? formData.incomeProof[0].name :'Aucun fichier sélectionné'}</span>
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