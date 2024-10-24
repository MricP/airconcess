import React from 'react'
import '../styles/ScrollDownButton.css'
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const ScrollDownButton = ({color}) => {
    function scrollDown() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    }

    return (
        <HiOutlineChevronDoubleDown onClick={scrollDown}className={'scroll-down-button'+ (color=='white'?' white':' black')}/>
    )
}

export default ScrollDownButton