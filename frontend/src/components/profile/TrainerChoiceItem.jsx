import React, { useRef, useState } from 'react'
import '../../styles/profile/TrainerChoiceItem.css'
import { IoIosArrowForward } from "react-icons/io";
import TrainingProposal from './TrainingProposal';
import { FiPlusCircle } from "react-icons/fi";
import DarkButton2 from "../general/DarkButton2"

export default function TrainerChoiceItem() {

    let profile = '/assets/profile/Jack-Sparrow.png';

    const arrowItem = useRef(null)
    const Item = useRef(null)
    const [isOpen,setIsOpen] = useState(false)
    const [trainingProposals, setTrainingProposals] = useState([{}]);


    const handleItemClick = () => {
        setIsOpen(!isOpen);
        if(arrowItem.current && Item.current){
            arrowItem.current.classList.toggle("click");
        }
    }

    const addTrainingProposal = () => {
        setTrainingProposals([...trainingProposals, {}]); // Ajouter un nouvel élément
    };

    return (
        <div className={`trainerChoiceItem-container`} ref={Item}>
            <div className='trainerChoiceItem-userMainInfos-container' onClick={handleItemClick}>
                <div className='trainerChoiceItem-userMainInfos'>
                    <img className='trainerChoiceItem-userMainInfos-profilePic' src={profile} alt="photo" />
                    <p>Pirrera</p>
                    <p>Emric</p> 
                </div>
                <IoIosArrowForward className={`trainerChoiceItem-arrow ${isOpen ? "click" : ""}`} ref={arrowItem} color='var(--section-color)' size={30} />
            </div>
            {isOpen === true && (
                <>
                    {trainingProposals.map((proposal) => (
                        <TrainingProposal key={proposal.id} />
                        
                    ))}
                    <DarkButton2 className={"darkButton"} text={"Valider"}/>
                    <FiPlusCircle onClick={addTrainingProposal} className='TrainerChoiceItem-plusButton' size={25} color='var(--button-color)' />
                </>
            )}
        </div>
    )
}

