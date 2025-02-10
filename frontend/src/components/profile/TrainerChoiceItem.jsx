import React, { useRef } from 'react'
import '../../styles/profile/TrainerChoiceItem.css'
import { IoIosArrowForward } from "react-icons/io";

export default function TrainerChoiceItem() {

    let profile = '/assets/profile/Jack-Sparrow.png';

    const arrowItem = useRef(null)
    const Item = useRef(null)

    const handleItemClick = () => {
        if(arrowItem.current && Item.current){
            arrowItem.current.classList.toggle("click");
            Item.current.classList.toggle("grow");
        }
    }

    return (
        <div className='trainerChoiceItem-container' ref={Item}>
                <div className='trainerChoiceItem-userMainInfos-container' onClick={handleItemClick}>
                    <div className='trainerChoiceItem-userMainInfos'>
                        <img className='trainerChoiceItem-userMainInfos-profilePic' src={profile} alt="photo" />
                        <p>Pirrera</p>
                        <p>Emric</p> 
                    </div>
                    <IoIosArrowForward ref={arrowItem} color='var(--section-color)' size={30} />
                </div>
        </div>
    )
}

