import React, { useRef, useState,useEffect } from 'react'
import '../../styles/profile/TrainerChoiceItem.css'
import { IoIosArrowForward } from "react-icons/io";
import TrainingProposal from './TrainingProposal';
import { FiPlusCircle } from "react-icons/fi";
import DarkButton2 from "../general/DarkButton2"
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";


export default function TrainerChoiceItem({trainingData}) {
    const [proposals, setProposals] = useState([]); // Stocke des objets avec un identifiant unique

    const {register,handleSubmit,watch,setValue, formState: { errors }} = useForm (
        { defaultValues: {
            proposals: null, //Format : { IDPROPOSAL: {dateStart:VALUE,dateEnd:VALUE,times: [timeM,timeTu,timeTh,timeWe,timeF]} }
        }}
    );

    const formData = watch()

    const [isHovered, setIsHovered] = useState(false);

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
    
    // let profile = '/assets/profile/Jack-Sparrow.png';
    // const arrowItem = useRef(null)
    // const Item = useRef(null)
    // const [isOpen,setIsOpen] = useState(false)
    // const [trainingProposals, setTrainingProposals] = useState([{}]);


    // const handleItemClick = () => {
    //     setIsOpen(!isOpen);
    //     if(arrowItem.current && Item.current){
    //         arrowItem.current.classList.toggle("click");
    //     }
    // }

    // const addTrainingProposal = () => {
    //     setTrainingProposals([...trainingProposals, {}]); // Ajouter un nouvel élément
    // };

    return (
        <div className={`trainerChoiceItem-container`} >
            {/* <div className='trainerChoiceItem-userMainInfos-container' onClick={handleItemClick}>
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
                        
                        
                    ))}
                    <DarkButton2 className={"darkButton"} text={"Valider"}/>
                    <FiPlusCircle onClick={addTrainingProposal} className='TrainerChoiceItem-plusButton' size={25} color='var(--button-color)' />
                </>
            )} */}
        
        
        <div>
            <p>Préférences client</p>
            <p>LES PREFERENCES</p>
        </div>
        

        
        <div className='proposals' id={proposals.length === 0 ? "nothing" : ""}>
            {proposals.length === 0 ? 
                <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>Aucune proposition</div> :               
            proposals?.map((proposal) => (
                <div className="proposal" key={proposal.id}>
                    <p>{proposal.id}</p>
                    <TrainingProposal proposId={proposal.id} formData={formData} errors={errors} setValue={setValue} register={register}/>
                        
                    <RxCross1  className='button-del' onClick={() => removeProposal(proposal.id)}>
                        Supprimer
                    </RxCross1 > 
                </div>
            ))}

            <div className="icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>   
                <IoIosAddCircle
                    className={`add-time-slot ${isHovered ? "visible" : "hidden"} ${proposals.length < 3 ? "" : "invisible"}`}
                    onClick={proposals.length < 5 ? addProposal : null}
                />
                <IoIosAddCircleOutline
                    className={`add-time-slot ${!isHovered ? "visible" : "hidden"} ${proposals.length < 3 ? "" : "invisible"}`}
                    onClick={proposals.length < 5 ? addProposal : null}
                />
            </div>
        </div>
    </div>
    )
}

