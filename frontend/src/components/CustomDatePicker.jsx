import React from 'react'
import '../styles/rsuite.css';
import { DatePicker,CustomProvider } from 'rsuite';
import { frFR } from 'rsuite/locales';  // Import de la locale française à partir de 'rsuite/locale'
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';  // Import de la locale française pour date-fns

function CustomDatePicker() {
    return (
        <CustomProvider locale={frFR}>
            <DatePicker
              format="dd/MM/yyyy"
              renderValue={value => {
                const formattedDate = format(value, 'EEEE d MMM yyyy', { locale: fr });
                return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);;
              }}
              appearance="default"
              placeholder="Sélectionner la date"
              
            />
        </CustomProvider>
    )
}

export default CustomDatePicker