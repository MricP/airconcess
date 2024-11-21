import React,{useState, forwardRef} from 'react'
import '../styles/Rsuite-custom.css'; 
import { TimePicker  } from 'rsuite';
import { format } from 'date-fns';

/**
 * Composant CustomTimePicker
 *
 * @param {Array<{date: string, hour: number, minutes: Array<number>}>} disabledSlots 
 *        Tableau d'objets représentant les créneaux horaires désactivés. Chaque objet contient :
 *        - `date` (string) : La date au format `YYYY-MM-DD`.
 *        - `hour` (number) : L'heure désactivée (entre 0 et 23).
 *        - `minutes` (Array<number>) : Les minutes désactivées pour cette heure (0, 15, 30, 45).
 * 
 * @param {Date|null} selectedDate 
 *        La date actuellement sélectionnée dans le composant DatePicker. Peut être `null` si aucune date n'est sélectionnée.
 * 
 * @param {function} setTime 
 *        Fonction appelée lorsque l'utilisateur sélectionne ou supprime une heure. 
 *        Reçoit un argument :
 *        - `value` (string|null) : L'heure sélectionnée au format `HH:mm:ss`, ou `null` si aucune heure n'est sélectionnée.
 */
const CustomTimePicker = forwardRef(({className,disabledSlots,selectedDate,setTime},ref) => {
    // forwardRef permet à ce composant d'accepter une ref provenant de son parent

    const [selectedTime, setSelectedTime] = useState(null); // Stocke l'heure sélectionnée

    const handleDisableHour = (hour) => {
      // Par default on disable les heures <7h et >18h
      if(hour<7 || hour>18) return true;

      // Si une date a été sélectionnée (ou qu'une heure n'a pas déjà été choisie)
      if (selectedDate != null && format(selectedDate, 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd')) {
        // Trouver les créneaux désactivés pour cette date
        const disabledSlotForDate = disabledSlots.filter(
          (slot) => format(selectedDate, 'yyyy-MM-dd') === slot.date
        );
    
        // Retourne true si l'heure est désactivée
        return disabledSlotForDate.some((slot) => slot.hour === hour && slot.minutes.length === 4);
      }
      return false; // Par défaut, l'heure est activé puisque pas de date selectionnée
    };
    
    const handleDisableMinutes = (minute) => {
      // Par default on disable les minutes hors crénaux
      if(![0,15,30,45].includes(minute)) return true;

      // Si une date a été sélectionnée (ou qu'une heure n'a pas déjà été choisie)
      if (selectedDate != null && format(selectedDate, 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd')) {
        // Trouver les créneaux désactivés pour cette date et cette heure
        const disabledSlotForDate = disabledSlots.filter(
          (slot) =>
            format(selectedDate, 'yyyy-MM-dd') === slot.date &&
            selectedTime?.getHours() === slot.hour // Vérifie l'heure sélectionnée
        );

        // return true si la minute fait partie des créneaux désactivés
        return disabledSlotForDate.some((slot) => slot.minutes.includes(minute));
      }
      return false; // Par défaut, le crénaux est activé puisque pas de date selectionnée
    };

    const handleTimeSelect = (value) => {
        if (value == null) {
            setTime(null);
            setSelectedTime(null); // Si aucune heure n'est sélectionnée, réinitialiser
        } else {
            setSelectedTime(value); // Mettre à jour l'heure sélectionnée
        }
    };

    return (
            <TimePicker
              ref={ref}
              className={className}
              onSelect={handleTimeSelect}
              onOk={(value) => value==null ? setTime(null) : setTime(format(value,"HH:mm:ss"))}
              onClean={() => setTime(null)}
              format="HH:mm"
              appearance="default"
              placeholder="Sélectionner l'heure"
              hideHours={(hour) => hour<7 || hour>18} //De 7 à 18h
              hideMinutes={(min) => min%15!==0 } //Avoir des crénaux de 15min
              shouldDisableHour={handleDisableHour}
              shouldDisableMinute={handleDisableMinutes}
            />
      );
});

export default CustomTimePicker