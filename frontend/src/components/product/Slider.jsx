import React, { useState } from 'react';
import '../../styles/product/Slider.css';
import { HiOutlineChevronDoubleRight,HiOutlineChevronDoubleLeft} from "react-icons/hi";
import { BiDownload } from "react-icons/bi";


function Slider({ images, mode, onInputChange }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageAdd, setImageAdd] = useState([])

    const scrollToImage = (direction, tabImages) => {
        if (direction === 'prev') {
            setCurrentIndex((curr) => (curr === 0 ? tabImages.length - 1 : curr - 1));
        } else {
            setCurrentIndex((curr) => (curr === tabImages.length - 1 ? 0 : curr + 1));
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            if (file && file.type.startsWith("image/")) {
                if (file.size > 2 * 1024 * 1024) {
                    alert("Le fichier est trop volumineux.");
                    return;
                }
        
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageAdd((prev) => [...prev, { id: Date.now(), src: e.target.result }]);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Veuillez choisir un/des fichier(s) valide.");
            }
        });
        if (onInputChange) {
            onInputChange("files", files)
        }
    };

    if (mode === "add"){
        return (
            <div className="slider-container">
                <h2>GALERIE PHOTO</h2>
                <p>© Tous droits réservés</p>
                {imageAdd.length>0 ? ( 
                    <div className="container-images">
                        {currentIndex === 0 ? null : <HiOutlineChevronDoubleLeft className="leftArrow" onClick={() => scrollToImage('prev', imageAdd)}/>}
                        {currentIndex === imageAdd.length - 1 ? null : <HiOutlineChevronDoubleRight className="rightArrow" onClick={() => scrollToImage('next', imageAdd)}/>}
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
                                    <img src={sliderImg.src} alt={"SliderImg"+currentIndex} />
                                    <p className='indexImg'>{currentIndex+1+'/'+imageAdd.length}</p>
                                </li> : 
                                <li key={sliderImg.id} className='otherImg'>
                                    <img src={sliderImg.src} alt={"SliderImg"+currentIndex} />
                                </li>
                            ))}
                            <li></li> {/*élément invisible, permet de grader le dernier élément au centre*/}
                        </ul>
                    </div>) : 
                    (
                        <div className='label-container'>
                            <label htmlFor="input-picture">
                                <div className='label-content'>
                                    <BiDownload /> Insérer des photos 
                                </div> 
                                <input type="file" id="input-picture" onChange={handleFileChange} accept="image/*" multiple/>
                            </label>
                        </div>
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
                    {currentIndex === 0 ? null : <HiOutlineChevronDoubleLeft className="leftArrow" onClick={() => scrollToImage('prev', images)}/>}
                    {currentIndex === images.length - 1 ? null : <HiOutlineChevronDoubleRight className="rightArrow" onClick={() => scrollToImage('next', images)}/>}
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
