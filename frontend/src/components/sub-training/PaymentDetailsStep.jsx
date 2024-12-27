import React, { useState } from 'react'

import "../../styles/sub-training/PaymentDetailsStep.css"
import CreditCard from '../general/CreditCard'

import CardNumberInput from '../general/CardNumberInput'

function PaymentDetailsStep({ formData, register, errors, setValue }) {

  const [isCardRotated,rotateCard] = useState(false) //Pour la CreditCard (retourner la card en selectionnant le cvv)
  const [current,setCurrent] = useState(null) //Designe le champ de saisie courant, pour la CreditCard
  const [cardIssuer,setCardIssuer] = useState(null)

  const [cardInfos,setCardInfos] = useState({
    number: null,
    holder: null,
    date: null,
    cvv: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfos((prevInfo) => ({
        ...prevInfo,
        [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/\D/g, ''); // Supprimer tous les caractères non numériques

    if (numericValue.length > 2) {
      numericValue = numericValue.substring(0, 2) + '/' + numericValue.substring(2, 4);
    }
  
    const [month] = numericValue.split('/');
    if (month && parseInt(month) > 12) {
      // Si le mois est supérieur à 12, on le réinitialise à 12
      numericValue = '12';
    }
  
    setCardInfos((prevInfo) => ({
      ...prevInfo,
      [name]: numericValue,
    }));
  };
  
  return (
    <div className='paymentDetailsStep-container'>
      <fieldset>
        <CreditCard className={"credit-card"} cardIssuer={cardIssuer} rotate={isCardRotated} current={current} infos={cardInfos}/>
        <label htmlFor="">Numéro de carte*
          <CardNumberInput type="text" 
            placeholder='ex: 4111 1111 1111 1111'
            name='number'
            onFocus={() => setCurrent("number")} 
            onChange={handleChange}
            setCardIssuer={setCardIssuer}
          />
        </label>
        <label htmlFor="">Nom du titulaire de la carte*
          <input type="text" 
            placeholder='ex: John Doe'
            name='holder'
            onFocus={() => setCurrent("holder")} 
            onChange={handleChange}
          />
        </label>
        <div>
          <label htmlFor="">Date d'expiration*
            <input type="text" placeholder='MM/YY'
              name='date'
              maxLength={5}
              value={cardInfos.date}
              onFocus={() => setCurrent("date")} 
              onChange={handleDateChange}
            />
          </label>
          <label htmlFor="">CVV*
            <input type="text" 
              placeholder='ex: 123'
              name='cvv'
              onFocus={() => {
                rotateCard(true)
                setCurrent("cvv")
              }} 
              onBlur={() => rotateCard(false)}
              onChange={handleChange}  
            />
          </label>
        </div>        
      </fieldset>
    </div>
  )
}

export default PaymentDetailsStep