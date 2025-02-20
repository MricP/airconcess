import React from 'react'
import "../../styles/profile/StepDisplayFinalProposal.css"

function StepDisplayFinalProposal({trainingData}) {
  const handleDisplaySlot = (time) => {
    let hour = time.split(":");
    return <> de <strong>{hour[0] + "h" + hour[1]}</strong> à <strong>{(parseInt(hour[0])+1) + "h" + hour[1]}</strong></>
  }

  const handleDisplayDate = (date) => {
    return (new Date(date)).toLocaleDateString()
  }

  return (
    <section className='stepDisplayFinalProposal-container'>
      <p>○ Cette formation se déroulera du <strong>{handleDisplayDate(trainingData?.finalProposal?.dateStart)}</strong> au <strong>{handleDisplayDate(trainingData?.finalProposal?.dateEnd)}</strong></p>
      <p>○ Les séances auront peu les :</p>
      <section className='section-days'>
        {trainingData?.finalProposal?.hourMonday ? <p>○ Lundis{handleDisplaySlot(trainingData?.finalProposal?.hourMonday)}</p> : null}
        {trainingData?.finalProposal?.hourTuesday ? <p>○ Mardis{handleDisplaySlot(trainingData?.finalProposal?.hourTuesday)}</p> : null}
        {trainingData?.finalProposal?.hourWednesday ? <p>○ Mercredis{handleDisplaySlot(trainingData?.finalProposal?.hourWednesday)}</p> : null}
        {trainingData?.finalProposal?.hourThursday ? <p>○ Jeudis{handleDisplaySlot(trainingData?.finalProposal?.hourThursday)}</p> : null}
        {trainingData?.finalProposal?.hourFriday ? <p>○ Vendredis{handleDisplaySlot(trainingData?.finalProposal?.hourFriday)}</p> : null}
      </section>
    </section>
  )
}

export default StepDisplayFinalProposal