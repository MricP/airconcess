import React, { useState } from 'react'

import "../../styles/sub-training/PaymentDetailsStep.css"
import CreditCard from '../general/CreditCard'

function PaymentDetailsStep({ formData, register, errors, setValue }) {

  const [isCardRotated,rotateCard] = useState(false)
  const [current,setCurrent] = useState(null)

  const [cardInfos,setCardInfos] = useState({
    number: "#### #### #### ####",
    holder: "John Doe",
    date: "MM/YY",
    cvv: 123
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfos((prevInfo) => ({
        ...prevInfo,
        [name]: value,
    }));
};
  
  return (
    <div className='paymentDetailsStep-container'>
      <fieldset>
        <CreditCard className={"credit-card"} rotate={isCardRotated} current={current} infos={cardInfos}/>
        <label htmlFor="">Nom du titulaire de la carte*
          <input type="text" 
            placeholder='ex: John Doe'
            name='holder'
            onClick={() => setCurrent("holder")} 
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">Numéro de carte*
          <input type="text" 
            placeholder='ex: 4111 1111 1111 1111'
            name='number'
            onClick={() => setCurrent("number")} 
            onChange={handleChange}
          />
        </label>
        <div>
          <label htmlFor="">Date d'expiration*
            <input type="text" placeholder='MM/YY'
              name='date'
              onClick={() => setCurrent("date")} 
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">CVV*
            <input type="text" 
              placeholder='ex: 123'
              name='ccv'
              onClick={() => {
                rotateCard(true)
                setCurrent("ccv")
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