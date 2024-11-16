import React from 'react';
import FirstSectionLanding from '../components/landing-page/FirstSectionLanding';
import SecondSectionLanding from '../components/landing-page/SecondSectionLanding';
import ThirdSectionLanding from '../components/landing-page/ThirdSectionLanding';
import FourthSectionLanding from '../components/landing-page/FourthSectionLanding';

export default function LandingPage() {
  return (
    <main className="landing-page-main">
      <FirstSectionLanding />
      <SecondSectionLanding />
      <ThirdSectionLanding />
      <FourthSectionLanding />
    </main>
  )
}