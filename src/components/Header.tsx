import logo from "../assets/logo.png";
import "./Header.css";


function Header () {
    return(
        <header className="header">
            <img src={logo} alt="yoQuiz Logo" className="header-logo" />
        </header>

    );
}

export default Header;