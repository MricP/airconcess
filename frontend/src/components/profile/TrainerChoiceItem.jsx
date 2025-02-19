import React, { useRef, useState,useEffect } from 'react'
import '../../styles/profile/TrainerChoiceItem.css'
import { IoIosArrowForward } from "react-icons/io";
import TrainingProposal from './TrainingProposal';
import { FiPlusCircle } from "react-icons/fi";
import DarkButton from "../general/DarkButton"
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-toastify';


export default function TrainerChoiceItem({trainingData}) {
    const [proposals, setProposals] = useState([]); // Stocke des objets avec un identifiant unique
    const arrowItem = useRef(null)
    const Item = useRef(null)
    const [isOpen,setIsOpen] = useState(false)
    let profile = '/assets/profile/Jack-Sparrow.png';

    const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
        { defaultValues: {
            proposals: null, //Format : { IDPROPOSAL: {dateStart:VALUE,dateEnd:VALUE,hourMondayhourTuesdayhourWednesdayhourThursdayhourFriday} }
        }}
    );

    const formData = watch()

    const [isHovered, setIsHovered] = useState(false);

    const onSubmit = () => {
        
        if(formData.proposals) {
            let isValid = true;
            for (let key in formData.proposals) {
                if(!(formData.proposals?.[key]?.hourMonday || formData.proposals?.[key]?.hourTuesday || formData.proposals?.[key]?.hourWednesday ||
                    formData.proposals?.[key]?.hourThursday || formData.proposals?.[key]?.hourFriday)) isValid=false
            }
            if(isValid) {
                console.log("ok")
            } else {
                toast.error("Vous devez selectionner au moins une zone horaire par proposition")
            }
        }
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

    function handleDisplayPrefSlots() {
        let slots = [];
        for (let key in trainingData.prefSlots) {
            let hStart = trainingData.prefSlots[key].startTime.split(":");
            let hEnd = trainingData.prefSlots[key].endTime.split(":");
            slots.push(<p key={key}>{"De " + hStart[0] + "h" + hStart[1] + " à " + hEnd[0] + "h" + hEnd[1]}</p>);
        }
        return slots;
    }
    
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

    const handleStatus = () => {
        if(trainingData?.finalProposalId) {
            return <p style={{color:"green"}}>Traité</p>
        } else {
            if(trainingData.hasResponseFromTrainer) {
                return <p style={{color:"orange"}}>En attente du client</p>
            } else {
                return <p style={{color:"red"}}>Non traité</p>
            }
        }
    }

    return (
        <div className={`trainerChoiceItem-container`} >
            <div className='trainerChoiceItem-userMainInfos-container' onClick={handleItemClick}>
                <div className='trainerChoiceItem-userMainInfos'>
                    <img className='trainerChoiceItem-userMainInfos-profilePic' src={profile} alt='' />
                    <p>{trainingData.usrFirstName} {trainingData.usrLastName}</p>
                </div>
                <div>
                    {handleStatus()}
                    <IoIosArrowForward className={`trainerChoiceItem-arrow ${isOpen ? "click" : ""}`} color='var(--section-color)' size={30} />
                </div>
            </div>
            {isOpen === true && (
                <>
                    <div className='pref-container'>
                        <p className='title'>Préférences client</p>
                        <p>• Date de début : {trainingData?.startDate}</p>
                        <p>• Date de fin : {trainingData?.endDate}</p>
                        <p>• Fréquence des séances : {trainingData?.frequency} séance(s) par semaine</p>
                        <p>• Préférences horaires : {trainingData?.prefSlots ? null : "Non renseigné"}</p>
                        {trainingData.prefSlots ? <div className="value-container">{handleDisplayPrefSlots()}</div> : null}
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

