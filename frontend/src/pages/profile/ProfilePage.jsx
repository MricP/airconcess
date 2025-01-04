import React from 'react';
import ProfileSideBar from '../../components/profile/ProfileSideBar'
import "../../styles/profile/ProfilePage.css"
import ProfileContent from '../../components/profile/ProfileContent';

export default function ProfilePage() {

  return (
    <main>
      <div className='profile-backgroundPrincipal'>
        <ProfileSideBar/>
        <ProfileContent/>
      </div>
      
    </main>
  );
}
