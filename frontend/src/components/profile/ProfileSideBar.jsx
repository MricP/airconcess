import React, { useEffect, useState, useRef } from 'react';
import { getUserData, updateProfileData, deleteProfilData } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import "../../styles/profile/ProfileSideBar.css"
import { BiPencil } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

export default function ProfileSideBar(){
    
    const contentInfosRef = useRef(null)
    const [userData, setUserData] = useState(null);
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        email: '',
        profilePictureURL: ''
      });
      const [isModalOpen, setIsModalOpen] = useState(false);
      const navigate = useNavigate();
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/sign-in');
          return;
        }
    
        const fetchData = async () => {
          try {
            const data = await getUserData(token);
            setUserData(data);
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              location: data.location || '',
              email: data.email || '',
              profilePictureURL: data.profilePictureURL || ''
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
      }, [navigate]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/sign-in');
            return;
          }
          await updateProfileData(formData,token);
          setUserData(formData)
          setIsModalOpen(false);
          contentInfosRef.current.classList.toggle("invisible")
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
        setUserData(null);
        setFormData({
          firstName: '',
          lastName: '',
          location: '',
          email: '',
          profilePictureURL: ''
        });
      };
    
      const handleDelete = () => {
        const token = localStorage.getItem('token');
          if (!token) {
            navigate('/sign-in');
            return;
          }
        deleteProfilData(token);
        navigate("/");
        localStorage.removeItem("token")
      }

      const handleIsModal = () => {
        
        if (!isModalOpen && contentInfosRef.current){
            contentInfosRef.current.classList.toggle("invisible");
            setIsModalOpen(true);
        }
        else{
            contentInfosRef.current.classList.toggle("invisible");
            setIsModalOpen(false);
        }
      }

      const handleProfileClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.click();
        fileInput.onchange = (event) => {
          const files = Array.from(event.target.files); 
          const validExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
          const imageFiles = files.filter(file => {
            const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
            return validExtensions.includes(extension);
          });
          console.log('Fichiers image avec extensions valides :', imageFiles);
          imageFiles.forEach(file => {
            console.log(`Nom : ${file.name}, Taille : ${file.size} bytes, Type : ${file.type}`);
          });
        };
      };

      if (!userData) {
        return <div>Chargement...</div>;
      }
    
    return (
        <main className='profile-sideBar-container'>
          <div className='profile-sideBarContent'>
                <div className='profile-picture-container' onClick={handleProfileClick}>
                {userData.profilePictureURL ? (
                    <img src={userData.profilePictureURL} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = "defaultProfilePictureURL"; }} />
                ) : ""}
                </div>
                <div className='profile-control-button'>
                    <button onClick={handleIsModal}><BiPencil size={30} /></button>
                    <button onClick={handleLogout}><IoExitOutline size={30}/></button>
                    <button onClick={handleDelete}><IoTrashOutline size={30}/></button>
                </div>
                <div className='profile-contentInfos' ref={contentInfosRef}>
                    <p>{userData.firstName} {userData.lastName}</p>
                    <p>{userData.email}</p>
                    <p>{userData.location ? userData.location : 'Location not define'}</p>
                    {userData.isAdmin === 1 && <button onClick={() => navigate("/admin")} className='profile-AdminButton'>Partie Administrateur</button>}
                    {userData.isTrainer === 1 && <p><strong>Rôle :</strong> Formateur</p>}
                </div>
                {isModalOpen && (
                    <div className="modal">
                    <div className="profile-modalSideBarContent">
                        <form className='profile-modifyForm' onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder='prenom'
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder='nom'
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder='localisation'
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <input
                                    type="hidden"
                                    name="email"
                                    value={formData.email}
                            />
                            <button type="submit" className='profile-AdminButton'>Enregistrer</button>
                        </form>
                    </div>
                    </div>
                )}   
          </div>
        </main>
      );
}
