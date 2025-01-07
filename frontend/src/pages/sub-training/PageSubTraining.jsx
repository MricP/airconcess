import React from 'react'
import "../../styles/sub-training/PageSubTraining.css"
import FormSubTraining from '../../components/sub-training/FormSubTraining'
import CardSubTraining from '../../components/sub-training/CardSubTraining'

function PageSubTraining() {
  return (
    <main className="page-subTraining">
        <FormSubTraining/>
        <CardSubTraining/>
    </main>
  )
}

export default PageSubTraining