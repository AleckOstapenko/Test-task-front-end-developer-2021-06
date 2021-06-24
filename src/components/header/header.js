import React, { Component } from 'react';
import './header.sass';
import logo from '../../img/Logo.svg';
import menuImg from '../../img/Menu.svg';
import { Link, animateScroll as scroll } from "react-scroll";
import MediaQuery from 'react-responsive';

export default class Header extends Component {
    scrollToTop = () => {
        scroll.scrollToTop();
    };

    openMenu = () => {
        const nav=document.querySelector('.mobile-menu-nav');
        nav.classList.toggle('menu-hide')
        this.props.updateOpenMenu(!this.props.openMobileMenu); 
    };

    closeMenu = () => {
        const nav=document.querySelector('.mobile-menu-nav');
        nav.classList.add('menu-hide')
        this.props.updateOpenMenu(false);         
    };

    render() {                
        return (
            <header>
                <div className="nav-section">
                    <nav className="nav">
                        <img src={logo} alt="Logo" className="logo-img" onClick={this.scrollToTop} />
                        <ul className="menu-nav">
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500}>About me</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500}>Relationships</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500}>Requirements</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500}>Users</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500}>Sign Up</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="mobile-menu">
                    <nav className="mobile-nav">
                        <div className="mobile-header">
                            <img src={logo} alt="Logo" className="logo-img" onClick={this.scrollToTop} />
                            <img src={menuImg} alt="Menu" className="menu-img" onClick={this.openMenu} />
                        </div>
                        <ul className="mobile-menu-nav menu-hide">
                            <img src={logo} alt="Logo" className="logo-img" onClick={this.scrollToTop} />
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>About me</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Relationships</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Users</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Sign Up</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Terms and Conditions</Link>
                            </li>

                            <li className="spacing">
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>How it works</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Partnership</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Help</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Level testimonial</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Contact us</Link>
                            </li>

                            <li className="spacing">
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Articles</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Our news</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Testimonials</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Licenses</Link>
                            </li>
                            <li>
                                <Link to="#register-section" smooth={true} offset={-70} duration={500} onClick={this.closeMenu}>Privacy Policy</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <section className={`header-section ${(this.props.openMobileMenu) ? "darker-span" : ""}`}>
                    <div className="header-banner">
                        <h1 className="header-h1">Test assignment for front-end developers</h1>
                        <MediaQuery minDeviceWidth={768}>
                            <p className="header-text">Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion. Therefore, responsive design, programming languages and specific frameworks are the must-have skillsets to look for when assessing your front-end developers.</p>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={767}>
                            <p className="header-text">Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion.</p>
                        </MediaQuery>
                        <Link to="#register-section" smooth={true} offset={-70} duration={500}><button className="button button-header">Sign up</button></Link>
                    </div>
                </section>
            </header>
        )
    }
}
