import React,{useState} from 'react'
import "./userfooter.css"
import logo from "../../assets/tripgenielogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faPinterestSquare, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

function UserFooter() {
    const {t} = useTranslation();

    return (
        <div className='footer'>
            <div className="logo-container">
                <img className="footer-logo" src={logo} alt="Logo" />
            </div>
            <div className='button-container'>
                <h5 className="button-txt">
                    {t("FooterDes")}
                </h5>
                <button className='button-list' onClick={() => window.location.href = "/registerseller"}>{t("ListProparty")}</button>
            </div>
            <div className="line">
                <hr />
            </div>
            <div className="footer-bottom">
                <div className="links">
                    <div className='textlinks'>{t("Aboutus")}</div>
                    <div className='textlinks'>{t("terms")}</div>
                    <div className='textlinks'>{t("privacy")}</div>
                    <div className='textlinks'>{t("payment")}</div>
                </div>
                <div className="socialmedia">
                    <FontAwesomeIcon icon={faInstagram} className='sicon' />
                    <FontAwesomeIcon icon={faFacebookSquare} className='sicon' />
                    <FontAwesomeIcon icon={faTwitterSquare} className='sicon' />
                    <FontAwesomeIcon icon={faRedditSquare} className='sicon' />
                    <FontAwesomeIcon icon={faPinterestSquare} className='sicon' />
                </div>
            </div>
            <div className="copyright">
                <p className='copywrite-txt'>Copyright © 20022-2023 TRIPGENIE Inc. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default UserFooter;
