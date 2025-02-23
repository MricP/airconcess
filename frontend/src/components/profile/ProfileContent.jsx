import React, {useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar,Badge, CustomProvider } from 'rsuite'
import frFR from "rsuite/locales/fr_FR";
import TrainerTrainingDisplayer from './TrainerTrainingDisplayer.jsx'
import UserTrainingDisplayer from './UserTrainingDisplayer.jsx'
import CalendarPopup from './CalendarPopup.jsx'

import { getAppointmentByUser } from "../../services/appointment.js"
import { getUserData, createTestimonial } from '../../services/auth.js'
import { getTrainingsOfTrainer,getTrainingsOfUser } from "../../services/training.js"

import "../../styles/general/Rsuite-custom.css"
import "../../styles/profile/ProfileContent.css"


export default function ProfileContent() {
  /*############ INITIALISATION DES STATES ############*/
  const navigate = useNavigate()
  const testimonialRef = useRef(null)
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState(null);

  const [apptVisible,setApptVisible] = useState(null)

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

  const handleTime = (time) => {
    let hour = time.split(":");
    return hour[0] + "h" + hour[1]
  }

  const renderCell = (date) => {
    const formattedDate = date.toLocaleDateString('en-CA');
    const appt = appointments.find((event) => event.appt_timestamp.split(' ')[0] === formattedDate);
    if (appt) {
      return (
        <div className="calendar-cell" onClick={()=>setApptVisible(appt.appt_id)}>
          <Badge className="calendar-todo-item-badge" />
          <p>Rendez-vous à</p>
          <p>{handleTime(appt.appt_timestamp.split(" ")[1])}</p>
          <CalendarPopup apptLinked={appt} isOpen={appt.appt_id===apptVisible} onOk={() => {
            setAppointments([]); //Force un refresh des 'appointments' pour mettre 'apptVisible' à null
          }}/>
        </div>
      );
    }
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
        const appts = await getAppointmentByUser(token);
        setAppointments(appts.data) 
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
      }
    };
    fetchAppointments();
  }, [navigate]);

  // Permet de quitter la CalendarPopup car sinon le apptVisible ne se met pas à jour
  useEffect(() => {
    if(appointments.length === 0) {
      const fetchAppointments = async () => {
        try {
          const appts = await getAppointmentByUser(token);
          setAppointments(appts.data) 
        } catch (error) {
          console.error("Erreur lors de la récupération des rendez-vous :", error);
        }
      }
      setApptVisible(null);
      fetchAppointments()
    }
  },[appointments,token])

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
      <div className='profile-calendar'>
        <CustomProvider locale={frFR}>
          <Calendar locale={frFR} renderCell={renderCell} isoWeek />
        </CustomProvider>
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
