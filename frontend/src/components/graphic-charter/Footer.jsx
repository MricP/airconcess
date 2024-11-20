import "../../styles/graphic-charter/Footer.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive'


export default function Footer() {

    const isMobile = useMediaQuery({ maxWidth: 992 });
    return (
        <footer>
            <div className="footer-high-footer">
                {!isMobile && <h2>Proposer<br></br>les meilleurs<br></br>aéronefs du marché</h2>}
                <img src='/assets/logo-white.png' alt="logo" />
                {!isMobile ?
                    <div className="footer-reseau">
                        <div className="footer-reseau-picture"><a href=""><FaLinkedin className="footer-reseau-picture-child" size={30} /></a></div>
                        <div className="footer-reseau-picture"><a href=""><FaSquareXTwitter className="footer-reseau-picture-child" size={30} /></a></div>
                        <div className="footer-reseau-picture"><a href=""><FaInstagram className="footer-reseau-picture-child" size={30} /></a></div>

                    </div> :
                    <div className="footer-reseau">
                        <div className="footer-reseau-picture"><a href=""><FaLinkedin size={40} /></a></div>
                        <div className="footer-reseau-picture"><a href=""><FaSquareXTwitter className="footer-reseau-picture" size={40} /></a></div>
                        <div className="footer-reseau-picture"><a href=""><FaInstagram className="footer-reseau-picture" size={40} /></a></div>



                    </div>}

            </div>
            <div className="footer-bottom-footer">
                <div className="footer-bottom-footer-child">
                    <h3>Liens rapides</h3>
                    <ul>
                        <li><a href="">Accueil</a></li>
                        <li><a href="">Catalogue d'aéronefs</a></li>
                        <li><a href="">Prendre rendez-vous</a></li>
                        <li><a href="">Services et maintenance</a></li>
                    </ul>
                </div>
                <div className="footer-bottom-footer-child separator">
                    <h3>Informations Légales</h3>
                    <ul>
                        <li><a href="">Mentions légales</a></li>
                        <li><a href="">Politique de confidentialité</a></li>
                        <li><a href="">Conditions générales de vente (CGV)</a></li>
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