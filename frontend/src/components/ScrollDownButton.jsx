import React from 'react'
import '../styles/ScrollDownButton.css'
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const ScrollDownButton = ({colorIcon,scrollLength}) => {
    function handleScroll() {
        window.scrollTo({
            top: scrollLength,
            behavior: 'smooth',
        });
    }

    return (
        <HiOutlineChevronDoubleDown onClick={handleScroll} className={'scroll-down-button'+ (colorIcon === 'white'?' white':' black')}/>
    )
}

export default ScrollDownButton