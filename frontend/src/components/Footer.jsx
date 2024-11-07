import "../styles/Footer.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive'




export default function Footer() {
    
    const isMobile = useMediaQuery({ maxWidth: 992 });
    return (
        <footer>
            <div className="footer-high-footer">
                {!isMobile && <h2>Proposer les meilleurs aéronefs du marché</h2>}
                <img src='/assets/logo-white.png' alt="logo" />
                {!isMobile ?
                    <div className="footer-reseau">
                        <a href=""><FaLinkedin className="footer-reseau-picture" size={60} /></a>
                        <a href=""><FaSquareXTwitter className="footer-reseau-picture" size={60} /></a>
                        <a href=""><FaInstagram className="footer-reseau-picture" size={60} /></a>
                    </div> :
                    <div className="footer-reseau">
                        <a href=""><FaLinkedin className="footer-reseau-picture" size={40} /></a>
                        <a href=""><FaSquareXTwitter className="footer-reseau-picture" size={40} /></a>
                        <a href=""><FaInstagram className="footer-reseau-picture" size={40} /></a>
                    </div>}

            </div>
            <div className="footer-bottom-footer">
                <div className="footer-bottom-footer-child">
                    <p>Liens rapides</p>
                    <ul>
                        <li><a href="">Accueil</a></li>
                        <li><a href="">Catalogue d'aéronefs</a></li>
                        <li><a href="">Prendre rendez-vous</a></li>
                        <li><a href="">Services et maintenance</a></li>
                    </ul>
                </div>
                <div className="footer-bottom-footer-child separator">
                    <p>Informations Légales</p>
                    <ul>
                        <li><a href="">Mentions légales</a></li>
                        <li><a href="">Politique de confidentialité</a></li>
                        <li><a href="">Conditions générales de vente (CGV)</a></li>
                    </ul>
                </div>
                <div className="footer-bottom-footer-child separator">
                    <p>Coordonnées</p>
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