import React from 'react'
import '../styles/ScrollDownButton.css'
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const ScrollDownButton = ({color,onClickComportment}) => {
    return (
        <HiOutlineChevronDoubleDown onClick={onClickComportment} className={'scroll-down-button'+ (color=='white'?' white':' black')}/>
    )
}

export default ScrollDownButton