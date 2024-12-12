import "../../styles/graphic-charter/Footer.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom/dist";


export default function Footer() {

    const isMobile = useMediaQuery({ maxWidth: 992 });
    return (
        <footer>
            <div className="footer-high-footer">
                {!isMobile && <h2>Proposer<br></br>les meilleurs<br></br>aéronefs du marché</h2>}
                <img src='/assets/logo-white.png' alt="logo" />
                {!isMobile ?
                    <div className="footer-reseau">
                        <div className="footer-reseau-picture"><Link to=""><FaLinkedin className="footer-reseau-picture-child" size={30} /></Link></div>
                        <div className="footer-reseau-picture"><Link to=""><FaSquareXTwitter className="footer-reseau-picture-child" size={30} /></Link></div>
                        <div className="footer-reseau-picture"><Link to=""><FaInstagram className="footer-reseau-picture-child" size={30} /></Link></div>
                    </div> :
                    <div className="footer-reseau">
                        <div className="footer-reseau-picture"><Link to=""><FaLinkedin className="footer-reseau-picture-child" size={40} /></Link></div>
                        <div className="footer-reseau-picture"><Link to=""><FaSquareXTwitter className="footer-reseau-picture-child" size={40} /></Link></div>
                        <div className="footer-reseau-picture"><Link to=""><FaInstagram className="footer-reseau-picture-child" size={40} /></Link></div>
                    </div>}

            </div>
            <div className="footer-bottom-footer">
                <div className="footer-bottom-footer-child">
                    <h3>Liens rapides</h3>
                    <ul>
                        <li><Link to="">Accueil</Link></li>
                        <li><Link to="">Catalogue d'aéronefs</Link></li>
                        <li><Link to="">Prendre rendez-vous</Link></li>
                        <li><Link to="">Services et maintenance</Link></li>
                    </ul>
                </div>
                <div className="footer-bottom-footer-child separator">
                    <h3>Informations Légales</h3>
                    <ul>
                        <li><Link to="legal-notices">Mentions légales</Link></li>
                        <li><Link to="privacy">Politique de confidentialité</Link></li>
                        <li><Link to="cgu">Conditions générales de vente (CGV)</Link></li>
                    </ul>
                </div>
                <div className="footer-bottom-footer-child separator">
                    <h3>Coordonnées</h3>
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
