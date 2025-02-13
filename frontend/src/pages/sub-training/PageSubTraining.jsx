import React, { useState, useEffect, useRef } from 'react';
import FormSubTraining from '../../components/sub-training/FormSubTraining';
import CardSubTraining from '../../components/sub-training/CardSubTraining';
import PaymentStep from '../../components/sub-training/PaymentStep';

import "../../styles/sub-training/PageSubTraining.css";

function PageSubTraining() {
  const [step, updateStep] = useState(0);

  // const stepRef = useRef(step)

  // useEffect(() => {
  //   const handlePopState = () => {
  //     if (stepRef === 0) {
  //       window.history.pushState(null, "", window.location.href);
  //       console.log("step : "+stepRef.current);
  //     } else {
  //       window.history.pushState(null, "", window.location.href);
  //       console.log("step : "+stepRef.current);
  //       updateStep(prevStep => prevStep - 1);
  //     }
  //   };

  //   window.history.pushState(null, "", window.location.href);
  //   window.addEventListener("popstate", handlePopState);
  
  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);

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
          <FormSubTraining step={step} updateStep={updateStep} />
          <CardSubTraining />
        </div>
      </main>
    );
  }
}

export default PageSubTraining;
