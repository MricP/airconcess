import '../styles/Header.css'
import { useMediaQuery } from 'react-responsive'
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ color }) {
    const logoWhite = '/assets/logo-white.png';
    const logoBlack = '/assets/logo-black.png';
    let logo = logoWhite;
    const isMobile = useMediaQuery({ maxWidth: 992 });
    const [isClicked, updateClicked] = useState(false)

    if (color === "white-black" || color === "transparent-black") {
        logo = logoBlack;
    }

    const handleMenuClick = () => {
        updateClicked(!isClicked);
    };

    useEffect(() => {
        if (!isMobile) {
            updateClicked(false);
        }
    }, [isMobile]);

    const navigate = useNavigate();
    const handleConnexionButton = () => {
        navigate('/sign-in');
    }
    return (
        <header className={`${color}`}>

            {!isMobile ?
                <div className="header-default-menu">
                    <img src={logo} alt="Logo" />
                    <nav>
                        <ul>
                            <li><Link to="/catalog">Nos aéronefs</Link></li>
                            <li><Link to="/services">Nos services</Link></li>
                            <li><Link to="/contact-us">Contact</Link></li>
                            <li><Link to="/about">A propos</Link></li>
                        </ul>
                        <form action="">
                            <button onClick={handleConnexionButton}>Connexion</button>
                        </form>
                    </nav>
                </div> :
                <div className='header-mobile-menu'>
                    <div className="header-menu-bar">
                        <img src={logo} alt="Logo" />
                        <div className="header-icon">
                            <button><CgProfile size={30} /></button>
                            {isClicked ? (
                                <RxCross2 onClick={handleMenuClick} size={30} />
                            ) : (
                                <IoIosMenu onClick={handleMenuClick} size={30} />
                            )}
                        </div>
                    </div>

                    {isClicked &&
                        <nav>
                            <ul>
                                <li><Link to="/catalog">Nos aéronefs</Link></li>
                                <li><Link to="/services">Nos services</Link></li>
                                <li><Link to="/contact-us">Contact</Link></li>
                                <li><Link to="/about">A propos</Link></li>
                            </ul>
                        </nav>}
                </div>

            }
        </header>
    );
}
