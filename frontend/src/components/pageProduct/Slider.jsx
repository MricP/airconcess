import React, { useState } from 'react';
import '../../styles/pageProduct/Slider.css';
import { HiOutlineChevronDoubleRight,HiOutlineChevronDoubleLeft} from "react-icons/hi";


function Slider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
        } else {
            setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
        }
    };

    return (
        <div className="slider-container">
            <h2>GALERIE PHOTO</h2>
            <p>© Tous droits réservés</p>
            
            <div className="container-images">
                {currentIndex === 0 ? null : <HiOutlineChevronDoubleLeft className="leftArrow" onClick={() => scrollToImage('prev')}/>}
                {currentIndex === images.length - 1 ? null : <HiOutlineChevronDoubleRight className="rightArrow" onClick={() => scrollToImage('next')}/>}
                <ul
                    style={{
                        transform: `translateX(-${currentIndex * (35)}%)`,
                        transition: "transform 0.5s ease"
                    }}
                >
                    <li></li> {/*élément invisible, permet de grader le premier élément au centre*/}
                    {images.map((sliderImg) => (
                        sliderImg === images[currentIndex] ?
                        <li key={sliderImg.id} className='currentImg'>
                            <img src={sliderImg.url} alt={"SliderImg"+currentIndex} />
                            <p className='indexImg'>{currentIndex+1+'/'+images.length}</p>
                        </li> : 
                        <li key={sliderImg.id} className='otherImg'>
                            <img src={sliderImg.url} alt={"SliderImg"+currentIndex} />
                        </li>
                    ))}
                    <li></li> {/*élément invisible, permet de grader le dernier élément au centre*/}
                </ul>
                
            </div>
            
        </div>
    );
}

export default Slider;
