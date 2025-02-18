import React, {useState,useEffect} from 'react'
import ReactLoading from 'react-loading';
import DarkButton from '../general/DarkButton'

function PaymentStep() {
    const [isLoading,setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },3000)
    },[])

    if(isLoading) {
        return(
            <div className='paymentstep-div'>
                <ReactLoading type={"spin"} color={"#333333"} height={25} width={25} />
                <p>Transaction en cours</p>
            </div>
        )
    } else {
        return(
            <div className='paymentstep-div'>
                <p>Paiement accepté</p>
                <p>Votre achat a bien été enregistré.</p>
                <p>Votre formateur vous contactera d'ici peu pour programmer votre planning de formation.</p>
                <DarkButton destination={"/"} >Retourner à l'acceuil</DarkButton>
            </div>
        )
    }
}

export default PaymentStep