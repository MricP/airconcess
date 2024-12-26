import React,{useEffect, useState} from 'react'

import "../../styles/general/CreditCard.css"

function CreditCard({className,rotate,infos}) {
    const [isCardRotated,setCardRotated] = useState(false)
    const [isContentFront,setContentFront] = useState(true)


    useEffect(()=>{
        console.log(rotate)
        setCardRotated(rotate)
        setTimeout(()=>{setContentFront(!rotate)},100)
    },[rotate])

    return (
        <div className={isCardRotated ? `card-container rotateCard ${className}` : `card-container ${className}`}>
            {isContentFront ? 
            <div className='front'>
                <div className='imgs'>
                    <img src="./assets/puce-cb.png" alt="" id='puce'/>
                    <img src="" alt="" id='logo-front'/>
                </div>
                <section className='number-section'>
                    <p>{infos.number}</p>
                </section>
                <div>
                    <section className='holder-section'>
                        <p>Titulaire</p>
                        <p>{infos.holder}</p>
                    </section>
                    <section className='date-section'>
                        <p>Expiration</p>
                        <p>{infos.date}</p>
                    </section>
                </div>
            </div> :
            <div className='back'>
                <div className='black-band'></div>
                <section className='cvv-section'>
                    <p>CVV</p>
                    <p>{infos.cvv}</p>
                </section>
                <img src="" alt="" id='logo-back'/>
            </div>}
        </div>
    )
}

export default CreditCard