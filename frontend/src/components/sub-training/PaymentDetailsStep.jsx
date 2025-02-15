import React, { useState } from 'react'
import CreditCard from '../general/CreditCard'
import CardNumberInput from '../general/CardNumberInput'

import "../../styles/sub-training/PaymentDetailsStep.css"

function PaymentDetailsStep({ formData, register, errors, setValue }) {

  const [isCardRotated,rotateCard] = useState(false) //Pour la CreditCard (retourner la card en selectionnant le cvv)
  const [current,setCurrent] = useState(null) //Designe le champ de saisie courant, pour la CreditCard

  const handleDateChange = (e) => {
    console.log("movment")

    const value= e.target.value;
    let numericValue = value.replace(/\D/g, ''); // Supprimer tous les caractères non numériques

    if (numericValue.length > 2) {
      numericValue = numericValue.substring(0, 2) + '/' + numericValue.substring(2, 4);
    }
  
    const [month] = numericValue.split('/');
    if (month && parseInt(month) > 12) {
      // Si le mois est supérieur à 12, on le réinitialise à 12
      numericValue = '12';
    }
  
    setValue('cardExpirationDate', numericValue, { shouldValidate: false });
  };

  return (
    <div className='paymentDetailsStep-container'>
      <fieldset>
        <div className={errors.cardIssuer ? 'error-message-div' : "invisible"}>
          <p>○ {errors.cardIssuer?.message}</p>
        </div>
        <CreditCard className={"credit-card"} rotate={isCardRotated} current={current} infos={formData}/>
        <label htmlFor="">
          <p>Numéro de carte*</p>
          <CardNumberInput 
            type="text" 
            maxLength={formData.cardIssuer === "american-express" ? 17 : 19} 
            className={errors.cardNumber || errors.cardIssuer ? "input-error" : ""}
            placeholder='ex: 4111 1111 1111 1111'
            onFocus={() => setCurrent("number")} 
            // onChange={(val) => setValue("cardNumber", val)}
            value={formData.cardNumber ? formData.cardNumber : ''}
            register={register}
            setValue={setValue}
          />
        </label>
        <label htmlFor="">
          <p>Nom du titulaire de la carte*</p>
          <input type="text" 
            className={errors.cardHolder ? "input-error" : ""}
            placeholder='ex: John Doe'
            onFocus={() => setCurrent("holder")} 
            {...register("cardHolder", {
              required: "L'identité du titulaire de la carte est requise",
              pattern: {
                value: /^[a-zÀ-ÖØ-öø-ÿ'’\-.\s]{2,} [a-zÀ-ÖØ-öø-ÿ'’\-.\s]{2,}$/i, //Format final souhaité
                message: "Nom et prénom du titulaire requis",
              },
              onChange: (e) => setValue("cardHolder",e.target.value.replace(/\d/g, '')), //Comportement à adopter pendant la saisie
            })}
          />
        </label>
        <div>
          <label htmlFor="">
            <p>Date d'expiration*</p>
            <input type="text" 
              placeholder='MM/YY'
              className={errors.cardExpirationDate ? "input-error" : ""}
              maxLength={5}
              onFocus={() => setCurrent("date")}
              value={formData.cardExpirationDate ? formData.cardExpirationDate : ''}
              {...register("cardExpirationDate", {
                required: "La date d'expiration est requise",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/, //Format final souhaité
                  message: "Date d'expiration incorrecte",
                },
                onChange: (e) => handleDateChange(e) //Comportement à adopter pendant la saisie
              })}
            />
          </label>
          <label htmlFor="">
            <p>CVV*</p>
            <input type="text" 
              className={errors.cvv ? "input-error" : ""}
              placeholder='ex: 123'
              onFocus={() => { rotateCard(true) ; setCurrent("cvv") }} 
              maxLength={formData.cardIssuer === "american-express" ? 4 : 3}
              value={formData.cvv ? formData.cvv : ''}
              {...register("cvv", {
                required: "Le CVV est requis",
                pattern: {
                  value: /^\d{3,4}$/, //Format final souhaité
                  message: "CVV incorrect",
                },
                onChange: (e) => setValue("cvv",e.target.value.replace(/\D/g, '')), //Comportement à adopter pendant la saisie
                onBlur: () => rotateCard(false)
              })}
            />
          </label>
        </div>  
        <input type="hidden" 
          value={formData.cardIssuer}
          {...register("cardIssuer", {
            required: `Seul les cartes Visa, American Express, Mastercard et Discover sont prisent en compte`,
          })}
        />      
      </fieldset>
    </div>
  )
}

export default PaymentDetailsStep