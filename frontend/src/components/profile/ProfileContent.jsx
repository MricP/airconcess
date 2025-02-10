import React, {useRef,useState,useEffect} from 'react'
import "../../styles/profile/ProfileContent.css"
import {createTestimonial} from "../../services/auth.js"
import {getAppointmentByUser} from "../../services/appointment.js"
import { useNavigate } from 'react-router-dom'
import {Calendar,Badge} from 'rsuite'
import { getUserData } from '../../services/auth.js'
import TrainerChoiceItem from './TrainerChoiceItem.jsx'
import "../../styles/general/Rsuite-custom.css"

export default function ProfileContent() {

  const navigate = useNavigate()
  const testimonialRef = useRef(null)
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(token);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  },[])

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("sign-in");
        return;
      }
      try {
        const appointments = await getAppointmentByUser(token);
        setEvents(appointments.data) 
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
      }
    };
    fetchAppointments();
  }, [navigate]);

  const token = localStorage.getItem("token")
  if(!token){
    navigate("sign-in")
    return
  }

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    if(!token){
      navigate("sign-in")
      return
    }
    if(testimonialRef.current){
      const value = testimonialRef.current.value;
      createTestimonial(token,value);
      testimonialRef.current.value = ''
    } 
  }

  
  const renderCell = (date) => {
    const formattedDate = date.toLocaleDateString('en-CA');
    const eventForDate = events.find((event) => event.appt_timestamp.split(' ')[0] === formattedDate);
    if (eventForDate) {
      return (
        <div className="calendar-cell">
          <Badge className="calendar-todo-item-badge" />
          <div className="calendar-event">{eventForDate.appt_reason} à {eventForDate.appt_timestamp.split(" ")[1]}</div>
          <div className="calendar-event">{eventForDate.agency_name}</div>
        </div>
      );
    }
    return null;
  }


  return (
    <>
      {userData?.isTrainer !== 1 && userData?.isTrainer !== null && (
        <main className='profile-content-container'>
          <div className='profile-actionStatus'>
              <Calendar renderCell={renderCell} isoWeek />
          </div>
          <div className='profile-commentaire-container'>
            <form method='POST' onSubmit={handleSubmitTestimonial}>
              <p><strong>Ajouter un commentaire</strong></p>
              <textarea ref={testimonialRef} name='testimonial' placeholder='Donnez nous votre avis...'></textarea>
              <button type='submit'>Publier</button>
            </form> 
          </div> 
        </main>
       )} 
       {userData?.isTrainer === 1 && userData?.isTrainer !== null && (
        <main className='profile-content-container'>
          <TrainerChoiceItem />
        </main>
       )} 
    </>
  )
  
}
