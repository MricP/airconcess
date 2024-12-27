import React,{useState} from 'react'

function CardNumberInput({setCardIssuer,onChange,...rest}) {
    const [value, setValue] = useState('');

    function detectCardIssuer(number) {
        if (/^4/.test(number)) return 'visa';
        if (/^5[1-5]/.test(number) || /^2(2[2-9]|[3-6][0-9]|7[01]|720)/.test(number)) return 'mastercard'; //51 à 55, 2221 à 2720
        if (/^3[47]/.test(number)) return 'american-express'; //34 ou 37
        if (/^6(011|5|4[4-9])/.test(number)) return 'discover'; //6011, 644 à 649, 65
        return null; //Non pris en compte
    }

    async function handleChange(event) {
        setCardIssuer(detectCardIssuer(event.target.value)); //Change le cardIssuer en fonction de l'input

        // await car on attend la valeur de retour pour éviter qu'une valeur incorrecte soit transmise
        await setValue(formatCardNumber(event.target.value)); 

        if (onChange) onChange(event); //Pour ne pas biaser les appels à onChange externes
    }

    function handleMaxLength() {
        return (detectCardIssuer(value) === "american-express") ? 17 : 19;
    }

    function formatCardNumber(val) {
        // Supprimer tous les caractères non numériques
        let numericValue = val.replace(/\D/g, '')+"";
        
        if (detectCardIssuer(val) === "american-express") {
            // Format pour American Express : 4 chiffres, 6 chiffres, 4 chiffres
            if (numericValue.length > 4 && numericValue.length <= 10) {
                return numericValue.replace(/(\d{4})(\d{0,6})/, '$1 $2'); // Ajoute un espace après les 4 premiers chiffres
            } else if (numericValue.length > 10) {
                return numericValue.replace(/(\d{4})(\d{6})(\d{0,4})/, '$1 $2 $3'); // Ajoute un espace après les 4 et 6 premiers chiffres
            }
        }

        return numericValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Ajouter des espaces tous les 4 chiffres
        
        
    }

    return (
        <input maxLength={handleMaxLength()} value={value} onChange={handleChange} {...rest}></input>
    )
}

export default CardNumberInput