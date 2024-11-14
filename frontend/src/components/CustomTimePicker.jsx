import React from 'react'
import '../styles/rsuite.css'; 
import { TimePicker, CustomProvider } from 'rsuite';
import { frFR } from 'rsuite/locales';  // Import de la locale française à partir de 'rsuite/locale'

function CustomTimePicker() {
    return (
        <CustomProvider locale={frFR}>
            <TimePicker
              format="hh:mm"
              appearance="default"
              placeholder="Sélectionner l'heure"
            />
        </CustomProvider>
      );
}

export default CustomTimePicker