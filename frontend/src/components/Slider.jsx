import React, { useState } from 'react';
import '../styles/Slider.css';

function Slider({images}) {
    const [i, updateSlider] = useState(0);

    function handlePrev () {
        if (i > 0) {
            updateSlider(i - 1);
        }
    };

    function handleNext () {
        if (i < images.length - 1) { // Assure-toi que tu n'excèdes pas la longueur du tableau d'images
            updateSlider(i + 1);
        }
    };

    return (
        <div className='slider'>
            {i}
            {i-1>=0 ? <img className='img-left-slider img-slider'src={images[i-1]} alt={`Image ${i-1}`} /> : <div className='img-left-slider img-slider'></div>}
            <button type="button" className='button-prev-slider' onClick={handlePrev}>Precedent</button>
            <img className='img-middle-slider img-slider'src={images[i]} alt={`Image ${i}`} />
            <button type="button" className='button-next-slider' onClick={handleNext}>Suivant</button>
            {i+1<=images.length-1 ? <img className='img-right-slider img-slider'src={images[i+1]} alt={`Image ${i+1}`} /> : <div className='img-left-slider img-slider'></div>}
        </div>
    );
}

export default Slider;
