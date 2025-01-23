import '../../styles/graphic-charter/Header.css'
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
    const [isClicked, updateClicked] = useState(false);
    const [user, setUser] = useState({ session: false });

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
                            <li><Link to="/catalog">Nos aéronefs</Link></li>
                            <li><Link to="/services">Nos services</Link></li>
                            <li><Link to="/contact-us">Contact</Link></li>
                            <li><Link to="/about">A propos</Link></li>
                        </ul>
                        <form action="">
                            {user.session ? (
                                <button className="profile-button" onClick={handleProfileButton}>Profile</button>
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
                            <button onClick={handleProfileButton}><CgProfile size={30} /></button>
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
