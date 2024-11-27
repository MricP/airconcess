import React, { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
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
    const token = localStorage.getItem('token');
    try {
      const data = await updateUserData(formData, token);
      setUserData(data);
      setIsModalOpen(false);
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
      profilePictureURL: ''
    });
  };

  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <main>
      <h2>Page de Profil</h2>
      <div>
        <p><strong>Prénom :</strong> {userData.firstName}</p>
        <p><strong>Nom :</strong> {userData.lastName}</p>
        <p><strong>Email :</strong> {userData.email}</p>
        <p><strong>Localisation :</strong> {userData.location ? userData.location : 'Non défini'}</p>
        <p>
          <strong>Photo de Profil :</strong>
          {userData.profilePictureURL ? (
            <img src={userData.profilePictureURL} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = "defaultProfilePictureURL"; }} />
          ) : 'Non défini'}
        </p>
        {userData.isAdmin === '1' && <p><strong>Rôle :</strong> Admin</p>}
        {userData.isTrainer === '1' && <p><strong>Rôle :</strong> Formateur</p>}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Modifier le Profil</button>
      <button onClick={handleLogout}>Se Déconnecter</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Prénom :
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Nom :
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Localisation :
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  URL de la Photo de Profil :
                  <input
                    type="text"
                    name="profilePictureURL"
                    value={formData.profilePictureURL}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit">Enregistrer les Modifications</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
