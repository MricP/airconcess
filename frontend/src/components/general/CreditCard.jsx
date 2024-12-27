import React,{useEffect, useState} from 'react'

import "../../styles/general/CreditCard.css"

function CreditCard({cardIssuer,className,rotate,infos,current}) {
    const [isCardRotated,setCardRotated] = useState(false)
    const [isContentFront,setContentFront] = useState(true)


    function handleCardNumberDisplay() {
        if (infos.number) {
            let format = (cardIssuer === "american-express") ? "#### ###### #####" : "#### #### #### ####";
            let numberIndex = 0;
    
            return format.split('').map(char => {
                if (char === '#' && infos.number[numberIndex] !== " ") {
                    numberIndex++;
                    return infos.number[numberIndex-1] || "#";
                } else {
                    numberIndex++
                    return char;
                }
            })
        } else {
            return "#### #### #### ####";
        }
    }

    useEffect(()=>{
        console.log(rotate)
        setCardRotated(rotate)
        setTimeout(()=>{setContentFront(!rotate)},100)
    },[rotate])

    return (
        <div className={isCardRotated ? `card-container rotateCard ${className}` : `card-container ${className}`}>
            {isContentFront ? 
            <div className='front'>
                <img src="./assets/puce-cb.png" alt="" id='puce'/>
                <img src="./assets/visa-logo.png" alt="" className={cardIssuer === "visa" ? "issuer-front img-in" : "issuer-front not-visible"}/>
                <img src="./assets/mastercard-logo.png" alt="" className={cardIssuer === "mastercard" ? "issuer-front img-in" : "issuer-front not-visible"}/>
                <img src="./assets/american-express-logo.png" alt="" className={cardIssuer === "american-express" ? "issuer-front img-in" : "issuer-front not-visible"}/>
                <img src="./assets/discover-logo.png" alt="" className={cardIssuer === "discover" ? "issuer-front img-in" : "issuer-front not-visible"}/>
                <section className={current === "number" ? 'number-section can-be-current current' : 'number-section can-be-current'}>
                    <p>{handleCardNumberDisplay()}</p>
                </section>
                <div>
                    <section className={current === "holder" ? 'holder-section can-be-current current' : 'holder-section can-be-current'}>
                        <p>Titulaire</p>
                        <p>{infos.holder ? infos.holder : "John Doe"}</p>
                    </section>
                    <section className={current === "date" ? 'date-section can-be-current current' : 'date-section can-be-current'}>
                        <p>Expiration</p>
                        <p>{infos.date ? infos.date : "MM/YY"}</p>
                    </section>
                </div>
            </div> :
            <div className='back'>
                <div className='black-band'></div>
                <section className={current === "cvv" ? 'cvv-section can-be-current current' : 'cvv-section can-be-current'}>
                    <p>CVV</p>
                    <p>{infos.cvv ? infos.cvv : 123}</p>
                </section>
                <img src={cardIssuer ? `./assets/${cardIssuer}-logo.png` : ""} alt=""/>
            </div>}
        </div>
    )
}

export default CreditCard