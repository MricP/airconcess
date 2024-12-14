import React, { useState } from 'react';
import '../../styles/product/Slider.css';
import { HiOutlineChevronDoubleRight,HiOutlineChevronDoubleLeft} from "react-icons/hi";
import { BiDownload } from "react-icons/bi";


function Slider({ images, mode }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageAdd, setImageAdd] = useState([])

    const scrollToImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
        } else {
            setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Le fichier est trop volumineux.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setImageAdd([...imageAdd, e.target.result]);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Veuillez choisir un fichier valide.");
        }
    };

    if (mode === "add"){
        return (
            <div className="slider-container">
                <h2>GALERIE PHOTO</h2>
                <p>© Tous droits réservés</p>
                {imageAdd.length>0 ? ( 
                    <div className="container-images">
                        {currentIndex === 0 ? null : <HiOutlineChevronDoubleLeft className="leftArrow" onClick={() => scrollToImage('prev')}/>}
                        {currentIndex === imageAdd.length - 1 ? null : <HiOutlineChevronDoubleRight className="rightArrow" onClick={() => scrollToImage('next')}/>}
                        <ul
                            style={{
                                transform: `translateX(-${currentIndex * (35)}%)`,
                                transition: "transform 0.5s ease"
                            }}
                        >
                            <li></li> {/*élément invisible, permet de garder le premier élément au centre*/}
                            {imageAdd.map((sliderImg) => (
                                sliderImg === imageAdd[currentIndex] ?
                                <li key={sliderImg.id} className='currentImg'>
                                    <img src={sliderImg.url} alt={"SliderImg"+currentIndex} />
                                    <p className='indexImg'>{currentIndex+1+'/'+imageAdd.length}</p>
                                </li> : 
                                <li key={sliderImg.id} className='otherImg'>
                                    <img src={sliderImg.url} alt={"SliderImg"+currentIndex} />
                                </li>
                            ))}
                            <li></li> {/*élément invisible, permet de grader le dernier élément au centre*/}
                        </ul>
                    </div>) : 
                    (
                        <label htmlFor="input-picture">
                            <div className='label-content'>
                                <BiDownload /> Insérer des photos 
                            </div> 
                            <input type="file" id="input-picture" onChange={handleFileChange} accept="image/*"/>
                        </label>
                    )
            }
                
            </div>
        );
    }

    return (
        <div className="slider-container">
            <h2>GALERIE PHOTO</h2>
            <p>© Tous droits réservés</p>
            {images.length>0 ? ( 
                <div className="container-images">
                    {currentIndex === 0 ? null : <HiOutlineChevronDoubleLeft className="leftArrow" onClick={() => scrollToImage('prev')}/>}
                    {currentIndex === images.length - 1 ? null : <HiOutlineChevronDoubleRight className="rightArrow" onClick={() => scrollToImage('next')}/>}
                    <ul
                        style={{
                            transform: `translateX(-${currentIndex * (35)}%)`,
                            transition: "transform 0.5s ease"
                        }}
                    >
                        <li></li> {/*élément invisible, permet de garder le premier élément au centre*/}
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
                </div>) : 
                (<div className="no-image-available">
                    <p>Aucune image disponible</p>
                </div>)
        }
            
        </div>
    );
}

export default Slider;
