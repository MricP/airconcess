import React, { useState } from 'react'
import CustomAlertDialog from '../general/CustomAlertDialog';

import "../../styles/profile/StepProposalsSummary.css"


function StepProposalsSummary({trainingData}) {
  const [isOpen,setIsOpen] = useState(false);


  const handleDisplaySlot = (time) => {
    let hour = time.split(":");
    return <> de <strong>{hour[0] + "h" + hour[1]}</strong> à <strong>{(parseInt(hour[0])+1) + "h" + hour[1]}</strong></>
  }

  const handleDisplayDate = (date) => {
    return (new Date(date)).toLocaleDateString()
  }

  const handleDeleteProposals = async () => {
    console.log("Annuler les propositions")
    setIsOpen(false)
    // window.location.reload()
  }

  return (
    <div className='stepProposalsSummary-container'>
      <CustomAlertDialog isOpen={isOpen} onOk={handleDeleteProposals} onCancel={() => setIsOpen(false)}>
        Si vous validez cette étape, les propositions que vous avez faites à votre client seront annulées. Vous devrez alors en réaliser de nouvelles.
      </CustomAlertDialog>

      <div className='title-container'>
        <p className='title'>Recapitulatif des propositions</p>
        <button onClick={() => setIsOpen(true)} className='cancel-proposals-button'>Annuler les propositions</button>
      </div>
      
      {trainingData?.proposals?.map((proposal,index) => {return(
        <div key={index+1} className='proposal'>
          <p className='proposal-number'>Proposition {index+1}</p>
          <section>
            <p>○ Du <strong>{handleDisplayDate(proposal?.dateStart)}</strong> au <strong>{handleDisplayDate(proposal?.dateEnd)}</strong></p>
            <p>○ Avec des séances programmées les :</p>
            <section className='section-days'>
              {proposal?.hourMonday ? <p>○ Lundis{handleDisplaySlot(proposal?.hourMonday)}</p> : null}
              {proposal?.hourTuesday ? <p>○ Mardis{handleDisplaySlot(proposal?.hourTuesday)}</p> : null}
              {proposal?.hourWednesday ? <p>○ Mercredis{handleDisplaySlot(proposal?.hourWednesday)}</p> : null}
              {proposal?.hourThursday ? <p>○ Jeudis{handleDisplaySlot(proposal?.hourThursday)}</p> : null}
              {proposal?.hourFriday ? <p>○ Vendredis{handleDisplaySlot(proposal?.hourFriday)}</p> : null}
            </section>
          </section>
        </div>
      )})}
    </div>
  )
}

export default StepProposalsSummary