import React, { useRef, useState,useEffect } from 'react'
import '../../styles/profile/TrainerChoiceItem.css'
import { IoIosArrowForward } from "react-icons/io";
import TrainingProposal from './TrainingProposal';
import { FiPlusCircle } from "react-icons/fi";
import DarkButton from "../general/DarkButton"
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";


export default function TrainerChoiceItem({trainingData}) {
    const [proposals, setProposals] = useState([]); // Stocke des objets avec un identifiant unique
    const arrowItem = useRef(null)
    const Item = useRef(null)
    const [isOpen,setIsOpen] = useState(false)
    let profile = '/assets/profile/Jack-Sparrow.png';

    const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
        { defaultValues: {
            proposals: null, //Format : { IDPROPOSAL: {dateStart:VALUE,dateEnd:VALUE,times: [timeM,timeTu,timeTh,timeWe,timeF]} }
        }}
    );

    const formData = watch()

    const [isHovered, setIsHovered] = useState(false);

    const onSubmit = () => {
        console.log("ok")
    }

    const addProposal = () => {
        const newProposal = {id: "id"+Math.round(Math.random()*10000) }; // Crée un objet unique avec un id
        setProposals([...proposals, newProposal]);
    }
    
    const removeProposal = (id) => {
        setProposals((prev) => prev.filter((proposal) => proposal.id !== id));   // Suppression
        if (formData?.proposals) {
            // Suppression de la proposation dans le useForm
            delete formData.proposals[id];
        }
    };
    
    useEffect(() => {
        let temp = proposals;
        for(let key in formData.proposals) {
            temp = [...temp,{id:key}]
            setProposals(temp)
        }
    },[]);
    
    const handleItemClick = () => {
        setIsOpen(!isOpen);
        if(arrowItem.current && Item.current){
            arrowItem.current.classList.toggle("click");
        }
    }

    return (
        <div className={`trainerChoiceItem-container`} >
            <div className='trainerChoiceItem-userMainInfos-container' onClick={handleItemClick}>
                <div className='trainerChoiceItem-userMainInfos'>
                    <img className='trainerChoiceItem-userMainInfos-profilePic' src={profile} alt='' />
                    <p>Pirrera</p>
                    <p>Emric</p> 
                </div>
                <IoIosArrowForward className={`trainerChoiceItem-arrow ${isOpen ? "click" : ""}`} color='var(--section-color)' size={30} />
            </div>
            {isOpen === true && (
                <>
                    <div className='pref-container'>
                        <p className='title'>Préférences client</p>
                        <p>• Date de début : </p>
                        <p>• Date de fin : </p>
                        <p>• Fréquence des séances : </p>
                        <p>• Préférences horaires : </p>
                    </div>
                    
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className='proposals' id={proposals.length === 0 ? "nothing" : ""}>
                        {proposals.length === 0 ? 
                            <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>Aucune proposition</div> :               
                        proposals?.map((proposal,index) => (
                            <div className="proposal" key={proposal.id}>
                                <hr />
                                <TrainingProposal noProposal={index+1} proposId={proposal.id} formData={formData} errors={errors} setValue={setValue} register={register} removeProposal={removeProposal}/>
                            </div>
                        ))}

                        <div className="icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>   
                            <IoIosAddCircle
                                className={`add-time-slot ${isHovered ? "visible" : "invisible"} ${proposals.length < 3 ? "" : "invisible"}`}
                                onClick={proposals.length < 5 ? addProposal : null}
                            />
                            <IoIosAddCircleOutline
                                className={`add-time-slot ${!isHovered ? "visible" : "invisible"} ${proposals.length < 3 ? "" : "invisible"}`}
                                onClick={proposals.length < 5 ? addProposal : null}
                            />
                        </div>
                        <DarkButton>Valider les propositions</DarkButton>
                    </form>
                    
                </>
            )} 
        </div>
    )
}

