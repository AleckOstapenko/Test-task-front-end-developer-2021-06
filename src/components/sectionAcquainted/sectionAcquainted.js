import React, {Component} from 'react';
import './sectionAcquainted.sass';
import { Link } from "react-scroll";


export default class SectionAcquainted extends Component {

    render() {
        return (
            <section className={`acquainted-section ${(this.props.openMobileMenu) ? "darker-span" : ""}`}>
                <div className="acquainted">
                    <h1 className="acquainted-h1">Let's get acquainted</h1>
                    <h2 className="acquainted-h2">I'm a good front-end developer</h2>
                    <p className="acquainted-text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                    <Link to="#register-section" smooth={true} offset={-70} duration={500}><button className="button button-acquainted">Sign up</button></Link>
                </div>
            </section>
        )
    }
}

