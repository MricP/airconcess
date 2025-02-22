import React, {useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar,Badge } from 'rsuite'
import TrainerTrainingDisplayer from './TrainerTrainingDisplayer.jsx'

import { getAppointmentByUser } from "../../services/appointment.js"
import { getUserData, createTestimonial } from '../../services/auth.js'
import { getTrainingsOfTrainer,getTrainingsOfUser } from "../../services/training.js"

import "../../styles/general/Rsuite-custom.css"
import "../../styles/profile/ProfileContent.css"
import UserTrainingDisplayer from './UserTrainingDisplayer.jsx'

export default function ProfileContent() {
  /*############ INITIALISATION DES STATES ############*/
  const navigate = useNavigate()
  const testimonialRef = useRef(null)
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);

  const [trainerTrainings,setTrainerTrainings] = useState();
  const [userTrainings,setUserTrainings] = useState();  

  /*################### CONSTANTES ####################*/

  const token = localStorage.getItem("token")
  
  /*#################### FONCTIONS ####################*/
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

  const loadTrainingsDataOfTrainer = async (id) => {
    try {
      const trainingsD = await getTrainingsOfTrainer(id)
      setTrainerTrainings(trainingsD.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const loadTrainingsDataOfUser = async (id) => {
    try {
      const trainingsD = await getTrainingsOfUser(id)
      console.log(trainingsD.data)
      setUserTrainings(trainingsD.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const reloadPage = async () => {
    // await window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
    loadTrainingsDataOfTrainer(userData.idUser)
    loadTrainingsDataOfUser(userData.idUser)
  }

  /*###################### AUTRE ######################*/
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(token);
        setUserData(data);
        await loadTrainingsDataOfUser(data.idUser)
        if(data?.isTrainer) {
          await loadTrainingsDataOfTrainer(data.idUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  },[])

  if(!token){
    navigate("sign-in")
    return
  }

  return (
    <main className='profile-content-container'>
      <div className='profile-actionStatus'>
        <Calendar renderCell={renderCell} isoWeek />
      </div>
      <div className='training-zone'>  
        {userTrainings ? 
          <>
            <p>Vos actions en cours</p> 
            <div className='trainings-container'>
              {userTrainings?.map(tr => { return <UserTrainingDisplayer reloadPage={reloadPage} trainingData={tr} key={tr.trainingId}/>})}
            </div>
          </>
        :null}
      </div>

      {userData?.isTrainer === 1 ?
        <div className='trainer-zone'>
          {trainerTrainings ?
            <>
              <p>Espace formateur</p>
              <div className='trainings-container'>
                {trainerTrainings?.map(tr => { return <TrainerTrainingDisplayer reloadPage={reloadPage} trainingData={tr} key={tr.trainingId}/>})}
              </div>
            </>
          :null}
        </div>
      : null}

      <div className='profile-commentaire-container'>
        <form method='POST' onSubmit={handleSubmitTestimonial}>
          <p><strong>Ajouter un commentaire</strong></p>
          <textarea ref={testimonialRef} name='testimonial' placeholder='Donnez nous votre avis...'></textarea>
          <button type='submit'>Publier</button>
        </form> 
      </div> 
    </main>
  )
  
}
