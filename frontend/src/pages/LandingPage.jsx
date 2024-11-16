import React from 'react';
import '../styles/landing-page/LandingPage.css';

// Components
import FirstSectionLanding from '../components/landing-page/FirstSectionLanding';
import SecondSectionLanding from '../components/landing-page/SecondSectionLanding';
import ThirdSectionLanding from '../components/landing-page/ThirdSectionLanding';
import FourthSectionLanding from '../components/landing-page/FourthSectionLanding';
import FifthSectionLanding from '../components/landing-page/FifthSectionLanding';

export default function LandingPage() {
  return (
    <main className="landing-page-main">
      <FirstSectionLanding />
      <SecondSectionLanding />
      <ThirdSectionLanding />
      <FourthSectionLanding />
      <FifthSectionLanding />
    </main>
  )
}