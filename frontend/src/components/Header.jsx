import '../styles/Header.css'
import logoWhite from '../assets/logo-white.png'
import logoBlack from '../assets/logo-black.png'

export default  function Header({color}){
    let logo = logoWhite

    if (color === "white-black" || color === "transparent-black") {
        logo = logoBlack
    }

    return (
        <header className={`${color}`}>
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
        </header>
    );
}