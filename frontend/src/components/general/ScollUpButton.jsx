import React from 'react'
import "../../styles/general/ScrollDownButton.css"
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const ScrollUpButton = ({colorIcon,scrollLength}) => {
    function handleScroll() {
        window.scrollTo({
            top: -scrollLength,
            behavior: 'smooth',
        });
    }

    return (
        <HiOutlineChevronDoubleUp onClick={handleScroll} className={'scroll-down-button'+ (colorIcon == 'white'?' white':' black')}/>
    )
}

export default ScrollUpButton