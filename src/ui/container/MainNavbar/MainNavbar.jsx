import React, { Component } from 'react';
import mainLogo from '../../../assets/kalUnite(Light).png';
import homeLogo from '../../../assets/home.png';
import footballLogo from '../../../assets/football-logo.png';
import './MainNavbar.css';

class MainNavbar extends Component {
    togglePages = () => {
        document.querySelector(`.main-nav`).classList.toggle(`slide-pages`);
        document.querySelectorAll(`.main-nav ul`).forEach(u => {
            u.classList.toggle(`slide-pages`);
        });
    };
    render() {
        return (
            <nav className="main-nav">
                <div className="title">
                    <img src={mainLogo} alt="main-logo" id="main-logo" />
                </div>
                <div className="main menu">
                    <input type="checkbox" onClick={this.togglePages} />
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul>
                    {/* max 8 */}
                    <a href="/"><img src={homeLogo} alt="home" className="home" /></a>
                    <a href="/football"><img src={footballLogo} alt="football-logo" className="football" /></a>
                </ul>
            </nav>
        );
    };
};

export default MainNavbar;