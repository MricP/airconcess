import '../styles/Header.css'
import logoWhite from '../assets/logo-white.png'
import logoBlack from '../assets/logo-black.png'
import { useMediaQuery } from 'react-responsive'
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';


export default function Header({ color }) {
    let logo = logoWhite
    const isMobile = useMediaQuery({ maxWidth: 992 });
    const [isClicked, updateClicked] = useState(false)

    if (color === "white-black" || color === "transparent-black") {
        logo = logoBlack
    }

    const handleMenuClick = () => {
        updateClicked(!isClicked);
    };

    useEffect(() => {
        if (!isMobile) {
            updateClicked(false);
        }
    }, [isMobile]);


    return (
        <header className={`${color}`}>

            {!isMobile ?
                <div className="header-default-menu">
                    <img src={logo} alt="Logo" />
                    <nav>
                        <ul>
                            <li><a href="">Nos aéronefs</a></li>
                            <li><a href="">Nos services</a></li>
                            <li><a href="">Contact</a></li>
                            <li><a href="">A propos</a></li>
                        </ul>
                        <form action="">
                            <button>Connexion</button>
                        </form>
                    </nav>
                </div> :
                <div className='header-mobile-menu'>
                    <div className="header-menu-bar">
                        <img src={logo} alt="Logo" />
                        <div className="header-icon">
                            <button><CgProfile size={30} /></button>
                            {isClicked ? (
                                <RxCross2 onClick={handleMenuClick} size={30}/>
                            ) : (
                                <IoIosMenu onClick={handleMenuClick} size={30}/>
                            )}
                        </div>
                    </div>

                    {isClicked &&
                        <nav>
                            <ul>
                                <li><a href="">Nos aéronefs</a></li>
                                <li><a href="">Nos services</a></li>
                                <li><a href="">Contact</a></li>
                                <li><a href="">A propos</a></li>
                            </ul>
                        </nav>}
                </div>

            }
        </header>
    );
}