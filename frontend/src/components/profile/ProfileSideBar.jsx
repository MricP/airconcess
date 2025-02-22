import React, { useEffect, useState, useRef } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import GrayInput from "../general/GrayInput.jsx";
import useRedirect from '../Custom-hooks.jsx';
import { useForm } from 'react-hook-form';


import "../../styles/profile/ProfileSideBar.css"

import { getUserData, updateProfileData, deleteProfilData, changeProfilePicture } from '../../services/auth';
import CustomAlertDialog from '../general/CustomAlertDialog.jsx';


export default function ProfileSideBar(){
  /*############ INITIALISATION DES STATES ############*/
  const redirect = useRedirect()
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditHovered, setEditHovered] = useState(false); // Si le bouton 'edit' est hover
  const [isLogoutHovered, setLogoutHovered] = useState(false); // Si le bouton 'logout' est hover
  const [isDeleteHovered, setDeleteHovered] = useState(false); // Si le bouton 'delete-account' est hover
  const [isAdminHovered, setAdminHovered] = useState(false); // Si le bouton 'admin' est hover
  const [buttonDeleteClicked,setButtonDeleteClicked] = useState(false)

  const [profilePicture, setProfilePicture] = useState(null);
  const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
    { defaultValues: {
        firstName: null, 
        lastName: null,
        location: null,
        isTrainer: false,
        isAdmin: false,
        email: null,
        profilePictureURL: null,
    }}
  );

  const formData = watch()

  // const profilePictureRef = useRef(null)
  
  
  /*#################### FONCTIONS ####################*/
    
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     isAdmin: userData.isAdmin,
  //     isTrainer: userData.isTrainer,
  //     [name]: value
  //   });
  // };
    
  const onSubmit = async (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/sign-in');
      return;
    }

    try {
      await updateProfileData(formData,token);
      setIsModalOpen(false);
      setUserData(formData)
      // redirect('/my-profile');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    setValue('firstName',userData.firstName)
    setValue('lastName',userData.lastName)
    setValue('location',userData.location)
    setValue('email',userData.email)
    setIsModalOpen(false)
  }
    
  const handleLogout = () => {
    localStorage.removeItem('token');
    redirect('/sign-in');
    return;
  };
    
  const handleDeleteAccount = () => {
    const token = localStorage.getItem('token');
      if (!token) {
        redirect('/sign-in');
        return;
      }
    deleteProfilData(token);
    redirect("/");
    localStorage.removeItem("token")
  }

  const handleProfileClick = () => {
    const fileInput = document.createElement('input');
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/sign-in');
      return;
    }

    fileInput.type = 'file';
    fileInput.accept = '.png, .jpg, .jpeg, .webp'; 
    fileInput.click();
    
    fileInput.onchange = (event) => {
      const file = event.target.files[0]; 
      if (!file) {
        console.log('Aucun fichier sélectionné');
        return;
      }
      const validExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
      const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      if (validExtensions.includes(extension)) {
          changeProfilePicture(token, file)
          .then(() => {
              const newProfilePath = `/assets/profile/${file.name}`;
              setProfilePicture(newProfilePath);
          })
          .catch((error) => {
              console.error('Erreur lors de la mise à jour de l\'image de profil :', error);
              alert('Une erreur est survenue lors de la mise à jour de l\'image de profil.');
          });
      } else {
          console.log('Extension non valide. Veuillez sélectionner une image au format PNG, JPG, JPEG ou WEBP.');
          alert('Veuillez sélectionner une image valide (PNG, JPG, JPEG, WEBP).');
      }
    };
  };

  /*###################### AUTRE ######################*/
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/sign-in');
      return;
    }
    
    const fetchData = async () => {
      try {
        const data = await getUserData(token);
        setUserData(data);

        setValue("firstName",data.firstName)
        setValue("lastName",data.lastName)
        setValue("location",data.location)
        setValue("email",data.email)
        setValue("profilePictureURL",data.profilePictureURL)
        setValue('isAdmin',data.isAdmin)
        setValue('isTrainer',data.isTrainer)

        // setProfilePicture(data.profilePictureURL);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <main className='profileSideBar-container'>
      <CustomAlertDialog isOpen={buttonDeleteClicked} onOk={handleDeleteAccount} onCancel={() => setButtonDeleteClicked(false)}>
        Si vous validez cette étape, votre compte sera supprimé définitivement.
      </CustomAlertDialog>
      <div className='profileSideBar-content'>
        <form method="post" encType="multipart/form-data">
                <div className='profile-picture-container' onClick={handleProfileClick}>
                {/* {profilePicture ? ( ##CAUSE DES CRASH
                    <img ref={profilePictureRef} src={profilePicture} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = "defaultProfilePictureURL"; }} />
                ) : ""} */}
                </div>
        </form>

        <button onClick={() => setIsModalOpen(true)} className='edit-button' onMouseEnter={() => setEditHovered(true)} onMouseLeave={() => setEditHovered(false)}>
              <span className="icon-container">   
                <RiEdit2Fill size={24} className={`edit-icon ${isEditHovered ? "visible" : "invisible"}`} />
                <RiEdit2Line size={24} className={`edit-icon ${!isEditHovered ? "visible" : "invisible"}`} />
              </span>
              Modifier mes informations
        </button>
                  
        {isModalOpen ? 
          <form method='POST' onSubmit={handleSubmit(onSubmit)} className='editing-form' >
              <GrayInput
                placeholder={'Prénom'}
                value={formData.firstName ? formData.firstName : ""}
                onChange={(e) => setValue("firstName", e.target.value)}
              />
              <GrayInput
                placeholder={'Nom'}
                value={formData.lastName ? formData.lastName : ""}
                onChange={(e) => setValue("lastName", e.target.value)}
              />
              <GrayInput
                placeholder={'Localisation'}
                value={formData.location ? formData.location : ''}
                onChange={(e) => setValue("location", e.target.value)} 
              />
              <GrayInput
                type="hidden"
                name="email"
                value={formData.email ? formData.email : ""}
                onChange={(e) => setValue("email", e.target.value)}
              />
              <div className='edit-values-buttons'>
                <button className="cancel-button" type='button' onClick={handleCancel}>Annuler</button>
                <button className="ok-button" type='submit'>Valider</button>
              </div>
          </form>:
          <div className='profile-infos'>
            <p>{userData.firstName} {userData.lastName}</p>
            <p>{userData.email}</p>
            <p>{userData.location ? userData.location : 'Localisation inconnue'}</p>
          </div>
        }  
      </div>

      <div className='account-buttons-container'>
        <button onClick={handleLogout} className='logout-button' onMouseEnter={() => setLogoutHovered(true)} onMouseLeave={() => setLogoutHovered(false)}>
                <span className="icon-container">   
                  <IoLogOut size={27} className={`logout-icon ${isLogoutHovered ? "visible" : "invisible"}`} />
                  <IoLogOutOutline size={27} className={`logout-icon ${!isLogoutHovered ? "visible" : "invisible"}`} />
                </span>
                Se déconnecter
        </button>
        {formData.isAdmin === 1 ?
          <button onClick={() => redirect("/admin")} className='admin-button' onMouseEnter={() => setAdminHovered(true)} onMouseLeave={() => setAdminHovered(false)}>
            <span className="icon-container">   
              <MdAdminPanelSettings size={27} className={`admin-icon ${isAdminHovered ? "visible" : "invisible"}`} />
              <MdOutlineAdminPanelSettings size={27} className={`admin-icon ${!isAdminHovered ? "visible" : "invisible"}`} />
            </span>
            Espace admin
          </button>
        :null}
        <button onClick={() => setButtonDeleteClicked(true)} className='delete-account-button' onMouseEnter={() => setDeleteHovered(true)} onMouseLeave={() => setDeleteHovered(false)}>
                <span className="icon-container">   
                  <MdDelete size={27} className={`delete-account-icon ${isDeleteHovered ? "visible" : "invisible"}`} />
                  <MdOutlineDelete size={27} className={`delete-account-icon ${!isDeleteHovered ? "visible" : "invisible"}`} />
                </span>
                Supprimer ce compte
        </button>
      </div>
    </main>
  );
}
