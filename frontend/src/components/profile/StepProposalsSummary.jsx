import React, { useState } from 'react'
import CustomAlertDialog from '../general/CustomAlertDialog';

import "../../styles/profile/StepProposalsSummary.css"

import { deleteProposals,deleteProposal,acceptProposal } from '../../services/training';

function StepProposalsSummary({reloadPage,trainingData,mode="trainer"}) {
  /*############ INITIALISATION DES STATES ############*/
  const [proposalToDelete,setProposalToDelete] = useState(null); // Pour le trainer
  const [proposalToAccept,setProposalToAccept] = useState(null); // Pour le user

  /*#################### FONCTIONS ####################*/
  const handleDisplaySlot = (time) => {
    let hour = time.split(":");
    return <> de <strong>{hour[0] + "h" + hour[1]}</strong> à <strong>{(parseInt(hour[0])+1) + "h" + hour[1]}</strong></>
  }

  const handleDisplayDate = (date) => {
    return (new Date(date)).toLocaleDateString()
  }

  const handleDeleteProposal = async () => {
    try {
      if(proposalToDelete === "all") {
        await deleteProposals(trainingData?.trainingId);
      } else {
        await deleteProposal(proposalToDelete);
      }
    } catch (error) {      
      console.error('Error deleting proposals :', error);
    }
    setProposalToDelete(null)
    reloadPage()
  }

  const handleDeleteMessage = () => {
    return (proposalToDelete === "all" ? "Si vous validez cette étape, les propositions que vous avez faites à votre client seront annulées. Vous devrez alors en réaliser de nouvelles." 
      : "Si vous validez cette étape, cette proposition ne sera plus proposée à votre client.")
  }

  const handleAcceptProposal = async () => {
    try {
      await acceptProposal(trainingData.trainingId,proposalToAccept);
    } catch (error) {      
      console.error('Error accepting proposals :', error);
    }
    setProposalToAccept(null)
    reloadPage()
  }

  return (
    <div className='stepProposalsSummary-container'>
      <CustomAlertDialog isOpen={proposalToDelete!==null} onOk={handleDeleteProposal} onCancel={() => setProposalToDelete(null)}>
        {handleDeleteMessage()}
      </CustomAlertDialog>

      <CustomAlertDialog isOpen={proposalToAccept!==null} onOk={handleAcceptProposal} onCancel={() => setProposalToAccept(null)}>
        {handleDeleteMessage()}
      </CustomAlertDialog>

      <div className='title-container'>
        <p className='title'>Recapitulatif des propositions</p>
        {mode === "trainer" ? <button onClick={() => setProposalToDelete("all")} className='proposal-button cancel'>Annuler les propositions</button>:null}
      </div>
      
      <div className={`proposals ${trainingData?.proposals?.length > 2 ? "two-rows":null}`}>
        {trainingData?.proposals?.map((proposal,index) => {return(
          <div key={index+1} className='proposal'>
            <div>
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
            {mode === "trainer" ? <button onClick={() => setProposalToDelete(proposal?.proposalId)} className='proposal-button cancel'>Annuler la proposition {index+1}</button> 
            :<button onClick={() => setProposalToAccept(proposal?.proposalId)} className='proposal-button accept'>Accepter la proposition {index+1}</button>}
          </div>
        )})}
      </div>
    </div>
  )
}

export default StepProposalsSummary