import React, { useEffect, useState, useRef } from 'react';
import { getUserData, updateProfileData, deleteProfilData, changeProfilePicture } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import "../../styles/profile/ProfileSideBar.css"
import { BiPencil } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

export default function ProfileSideBar(){
    
    const contentInfosRef = useRef(null)
    const profilePictureRef = useRef(null)
    const [profilePicture, setProfilePicture] = useState('');
    const [userData, setUserData] = useState(null);
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        isAdmin: '',
        isTrainer: '',
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
            setProfilePicture(data.profilePictureURL);
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
          isAdmin: userData.isAdmin,
          isTrainer: userData.isTrainer,
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
          navigate('/my-profile');
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
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/sign-in');
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
                changeProfilePicture(token, file);
                setProfilePicture("/assets/profile/"+file.name);
                if(profilePictureRef.current){
                  profilePictureRef.current.src = profilePicture;
                }
                
            } else {
                console.log('Extension non valide. Veuillez sélectionner une image au format PNG, JPG, JPEG ou WEBP.');
                alert('Veuillez sélectionner une image valide (PNG, JPG, JPEG, WEBP).');
            }
        };
    };

      if (!userData) {
        return <div>Chargement...</div>;
      }
    
    return (
        <main className='profile-sideBar-container'>
          <div className='profile-sideBarContent'>
                <form action="upload.php" method="post" enctype="multipart/form-data">
                  <div className='profile-picture-container' onClick={handleProfileClick}>
                  {profilePicture ? (
                      <img ref={profilePictureRef} src={profilePicture} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = "defaultProfilePictureURL"; }} />
                  ) : ""}
                  </div>
                </form>
                
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
