import React, { useState, useEffect } from 'react';
import FormSubTraining from '../../components/sub-training/FormSubTraining';
import CardSubTraining from '../../components/sub-training/CardSubTraining';
import PaymentStep from '../../components/sub-training/PaymentStep';

import "../../styles/sub-training/PageSubTraining.css";

function PageSubTraining() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Êtes vous sûr de vouloir annuler le processus ?";
      event.returnValue = confirmationMessage; // Affiche la fenêtre de confirmation
      return confirmationMessage; // Certaines versions de navigateurs exigent cette ligne
    };

    // Ajoute l'événement avant de quitter la page
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (step === 5) {
    return (
      <main className="page-subTraining">
        <div>
          <PaymentStep />
        </div>
      </main>
    );
  } else {
    return (
      <main className="page-subTraining">
        <div>
          <FormSubTraining step={step} updateStep={setStep} />
          <CardSubTraining />
        </div>
      </main>
    );
  }
}

export default PageSubTraining;
