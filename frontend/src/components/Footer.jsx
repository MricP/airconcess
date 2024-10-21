import "../styles/Footer.css";
import logoWhite from '../assets/logo-white.png'
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive'




export default function Footer() {
    const isMobile = useMediaQuery({ maxWidth: 992 });
    return (
        <footer>
            <div className="high-footer">
                {!isMobile && <p>Proposer les meilleurs aéronefs du marché</p>}
                <img src={logoWhite} alt="logo" />
                {!isMobile ?
                    <div className="reseau">
                        <a href=""><FaLinkedin className="reseau-picture" size={40} /></a>
                        <a href=""><FaSquareXTwitter className="reseau-picture" size={40} /></a>
                        <a href=""><FaInstagram className="reseau-picture" size={40} /></a>
                    </div> :
                    <div className="reseau">
                        <a href=""><FaLinkedin className="reseau-picture" size={30} /></a>
                        <a href=""><FaSquareXTwitter className="reseau-picture" size={30} /></a>
                        <a href=""><FaInstagram className="reseau-picture" size={30} /></a>
                    </div>}

            </div>
            <div className="bottom-footer">
                <div className="bottom-footer-child">
                    <h2>Liens rapides</h2>
                    <ul>
                        <li><a href="">Accueil</a></li>
                        <li><a href="">Catalogue d'aéronefs</a></li>
                        <li><a href="">Prendre rendez-vous</a></li>
                        <li><a href="">Services et maintenance</a></li>
                    </ul>
                </div>
                <div className="bottom-footer-child separator">
                    <h2>Informations Légales</h2>
                    <ul>
                        <li><a href="">Mentions légales</a></li>
                        <li><a href="">Politique de confidentialité</a></li>
                        <li><a href="">Conditions générales de vente (CGV)</a></li>
                    </ul>
                </div>
                <div className="bottom-footer-child separator">
                    <h2>Coordonnées</h2>
                    <ul>
                        <li>Adresse : 123 Rue des Ailes, 75008 Paris, France</li>
                        <li>Téléphone : +33 1 23 45 67 89</li>
                        <li>E-mail : contact@airconcess.com</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}