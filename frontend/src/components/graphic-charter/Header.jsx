import '../../styles/graphic-charter/Header.css'
import { useMediaQuery } from 'react-responsive'
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRedirect from '../Custom-hooks';

export default function Header({ color }) {
    const logoWhite = '/assets/logo-white.png';
    const logoBlack = '/assets/logo-black.png';
    let logo = logoWhite;
    const isMobile = useMediaQuery({ maxWidth: 992 });
    const [isClicked, updateClicked] = useState(false);
    const [user, setUser] = useState({ session: false });
    const redirect = useRedirect();

    if (color === "white-black" || color === "transparent-black") {
        logo = logoBlack;
    }

    const handleMenuClick = () => {
        updateClicked(!isClicked);
        if(isClicked){
            
        }
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

    const handleProfileButton = () => {
        navigate('/my-profile');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ session: true });
        }else{
            setUser({ session: false });
        }

    }, [navigate]);

    return (
        <header className={`${color}`}>

            {!isMobile ?
                <div className="header-default-menu">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                    <nav>
                        <ul>
                            <li onClick={() => redirect("/catalog")}>Nos aéronefs</li>
                            <li onClick={() => redirect("/services")}>Nos services</li>
                            <li onClick={() => redirect("/contact-us")}>Contact</li>
                            <li onClick={() => redirect("/about")}>A propos</li>
                        </ul>
                        <form action="">
                            {user.session ? (
                                <button className="profile-button" onClick={handleProfileButton}>Profil</button>
                            ) : (
                                <button onClick={handleConnexionButton}>Connexion</button>
                            )}
                        </form>
                    </nav>
                </div> :
                <div className='header-mobile-menu'>
                    <div className="header-menu-bar">
                        <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
                        <div className="header-icon">
                            {user.session ? 
                                <button onClick={handleProfileButton}><CgProfile size={30} /></button> :
                                <button onClick={handleConnexionButton}><CgProfile size={30} /></button>
                            }
                            {isClicked ? (
                                <RxCross2 onClick={handleMenuClick} size={30} />
                            ) : (
                                <IoIosMenu onClick={handleMenuClick} size={30} />
                            )}
                        </div>
                    </div>

                    {isClicked &&
                        <nav className={`${color} nav-mobile`}>
                            <ul>
                                <li onClick={() => redirect("/catalog")}>Nos aéronefs</li>
                                <li onClick={() => redirect("/services")}>Nos services</li>
                                <li onClick={() => redirect("/contact-us")}>Contact</li>
                                <li onClick={() => redirect("/about")}>A propos</li>
                            </ul>
                        </nav>}
                </div>

            }
        </header>
    );
}
