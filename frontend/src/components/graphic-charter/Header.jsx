import '../../styles/graphic-charter/Header.css'
import { useMediaQuery } from 'react-responsive'
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Header({ color }) {
    const logoWhite = '/assets/logo-white.png'
    const logoBlack = '/assets/logo-black.png'
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
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
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