/* eslint-disable no-unused-vars */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './footer.sass';
import footer2560 from '../../img/Footprint-972x177.svg';
import footer1024 from '../../img/Footprint-467x177.svg';
import footer360 from '../../img/Footprint-328x124.svg';

const Footer = () => {
    
    const is1024 = useMediaQuery({ query: '(-webkit-min-device-pixel-ratio: 2) and (min-width: 1025px), (max-resolution: 192dpi) and (min-width: 1025px), (min-width: 1025px)' });
    const is768 = useMediaQuery({ query: '(-webkit-min-device-pixel-ratio: 2) and (min-width: 768px), (max-resolution: 192dpi) and (min-width: 768px), (min-width: 768px)' });
    const is360 = useMediaQuery({ query: '(-webkit-min-device-pixel-ratio: 2) and (min-width: 360px), (max-resolution: 192dpi) and (min-width: 360px), (min-width: 360px)' });
    return (
       <footer>
           {is360 && <img src={footer360} alt="footer"/>}
           {is768 && <img src={footer1024} alt="footer"/>}
           {is1024 && <img src={footer2560} alt="footer"/>}
            <div className="footer-text">
                <p>&copy; abz.agency specially for the test task</p>                     
            </div>
       </footer>
    )
} 

export default Footer;