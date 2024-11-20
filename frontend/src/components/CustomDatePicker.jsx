import React from 'react'
import '../styles/Rsuite-custom.css';
import { DatePicker } from 'rsuite';
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';  // Import de la locale française pour date-fns



/**
 * Composant CustomDatePicker
 *
 * @param {Array<{date: string, hour: number, minutes: Array<number>}>} disabledSlots 
 *        Tableau d'objets représentant les créneaux horaires désactivés. Chaque objet contient :
 *        - `date` (string) : La date au format `YYYY-MM-DD`.
 *        - `hour` (number) : L'heure désactivée (entre 0 et 23).
 *        - `minutes` (Array<number>) : Les minutes désactivées pour cette heure (0, 15, 30, 45).
 * 
 * @param {Date|null} selectedTime 
 *        Date contenant le crénaux sélectionné dans le composant TimePicker. Peut être `null` si aucune heure n'est sélectionnée.
 * 
 * @param {function} setDate 
 *        Fonction appelée lorsque l'utilisateur sélectionne ou supprime une date. 
 *        Reçoit un argument :
 *        - `value` (string|null) : La date sélectionnée au format `YYYY-MM-DD`, ou `null` si aucune date n'est sélectionnée.
 */
function CustomDatePicker({disabledSlots,selectedTime,setDate}) {
    /* 
      PARAMETRE POSSIBLEMENT MODIFIABLES 
      • Première heure = 7
      • Dernière heure = 18
      • Nombre de crénaux = 4 (*15min)
      • Nombre d'heures de rdv = 12
      • Crénaux reservables 7j à l'avance
    */

    const handleDisableDates = (date) => {
      if (isNaN(new Date(date).getTime())) return true; // Désactiver les dates invalides 
      
      let today = new Date();
      let sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);
    
      // Désactiver les dates dans les 7 prochains jours
      if (date < sevenDaysLater || date.getDay()===0) {
        return true;
      }
    
      // Cas où un crénaux a été sélectionné mais que le crénaux n'est pas dispo à cette date
      if (selectedTime != null && selectedTime.getHours() >= 7) {
        return disabledSlots?.some(
          (slot) =>
            format(date, 'yyyy-MM-dd') === slot.date &&
            selectedTime.getHours() === slot.hour &&
            slot.minutes.includes(selectedTime.getMinutes())
        );
      }
    
      // Cas où un crénaux a été sélectionné mais qu'aucun crénaux n'est dispo à cette date
      const disabledSlotsForDate = disabledSlots.filter(
        (slot) => format(date, 'yyyy-MM-dd') === slot.date
      );
    
      // Désactiver si chaque heure contient 4 créneaux désactivés
      if (disabledSlotsForDate.length === 12) {
        const allHoursDisabled = disabledSlotsForDate.every(
          (slot) => slot.minutes.length === 4
        );
        return allHoursDisabled;
      }
    
      return false; // Par défaut, la date est activée
    };
      
    return (
      <DatePicker
        onOk={(value) => value==null ? setDate(null) : setDate(format(value, 'yyyy-MM-dd'))}
        onClean={() => setDate(null)} 
        format="dd/MM/yyyy"
        renderValue={(value) => {
          const formattedDate = format(value, 'EEEE d MMM yyyy', { locale: fr });
          return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);;
        }}
        shouldDisableDate={handleDisableDates}
        appearance="default"
        placeholder="Sélectionner la date"
      />
    )
}

export default CustomDatePicker