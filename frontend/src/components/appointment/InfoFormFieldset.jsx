import React from 'react'
import { City } from "country-state-city";
import countryList from 'react-select-country-list';
import CustomSelectPicker from '../general/CustomSelectPicker';
import CustomPhoneInput from '../general/CustomPhoneInput';
import CustomFilePicker from '../general/CustomFilePicker';

import "../../styles/appointment/InfoFormFieldset.css"

function InfoFormFieldset({formData,register,errors,withIdCard=false,withIncomeProof=false,setValue}) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i    
    const postalCodeRegex = /^[0-9]{5}/

    function handleDisplayErrorDiv() {
        return errors.email && errors.email?.message!=="required"
    }

    return (    
        <fieldset className='info-fieldset' ><legend>Vos informations</legend>
            <div className={handleDisplayErrorDiv() ? "error-message-div" : "invisible"}>
                {errors.email && errors.email.message!=="required" && <p>{errors.email.message}</p>}
            </div>

            <div className='firstName-lastName-div'> {/* Nom et prenom */}
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
            </div>
            <div className='phone-mail-div'> {/* Phone et mail */}
                    <div>
                        <p>Numéro de téléphone*</p>
                        <CustomPhoneInput
                            className={errors.phone ? "input-error" : ""} 
                            value={formData.phone != null ? formData.phone : ''}
                            setValue={(value) => setValue("phone", value, errors.phone ? {shouldValidate: true} : {shouldValidate: false})}
                            {...register("phone", { required: true })}
                        />
                    </div>
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
            </div>
            <div className='country-city-postalCode-div'>  {/* Country et City et PostalCode */}
                    <div>
                        <p>Pays*</p>
                        <CustomSelectPicker 
                            isSearchable={true}
                            className={errors.country ? "input-error" : ""}
                            data={countryList().getData()} 
                            value={formData.country != null ? formData.country : ''}
                            setValue={(value) => {
                                setValue("country", value, errors.country ? {shouldValidate: true} : {shouldValidate: false});
                                setValue("city", null, errors.city ? {shouldValidate: true} : {shouldValidate: false});
                            }}
                            {...register("country", { required: true })}
                        />
                    </div>
                    <div className='city-postalCode-div'>
                        <label htmlFor="city" >
                            <p>Ville*</p>
                            <CustomSelectPicker 
                                noOptionsMessage={"Aucun pays selectionné"}

                                isSearchable={true}
                                className={errors.city ? "input-error" : ""}
                                data={formData.country ? City.getCitiesOfCountry(formData.country.value).map(
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
                            <p>Code postal</p>
                            <input 
                                className={errors.postalCode ? "input-error" : ""}
                                type="text" 
                                onInput={(e) => {e.target.value = e.target.value.replace(/\D/,'')}}
                                    /* Remplace tout ce qui n'est pas un chiffre par un vide */
                                id="postal-code" 
                                name="postalCode"
                                value={formData.postalCode != null ? formData.postalCode : ''}
                                {...register("postalCode", { 
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

            <div className='files-selection-div'>
                <CustomFilePicker
                    multiple={false} 
                    autoUpload={false} 
                    text={"Selectionner une carte d'identité*"}
                    className={(errors.idCard ? "file-error" : "")+(withIncomeProof ? "" : " solo")}
                    value={formData.idCard}
                    setValue={(val) => setValue("idCard", val, errors.idCard ? {shouldValidate: true} : {shouldValidate: false})}
                    {...register("idCard", { required: true })}
                />
                {withIncomeProof ?
                <CustomFilePicker
                    multiple={false} 
                    autoUpload={false} 
                    text={"Selectionner un justificatif de revenu*"}
                    className={errors.incomeProof ? "file-error" : ""}
                    value={formData.incomeProof}
                    setValue={(val) => setValue("incomeProof", val, errors.incomeProof ? {shouldValidate: true} : {shouldValidate: false})}
                    {...register("incomeProof", { required: true })}
                />:null}
            </div>
        </fieldset>
    )
}

export default InfoFormFieldset