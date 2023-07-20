import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from "../NavBar/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import '../LandingPage/LandingPage.css'


function LandingPage() {
    useEffect(() => {
        axios.get('/')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
      <Navbar />
      <div className="apple-icon">
        <FontAwesomeIcon icon={faAppleAlt} size="4x" color="#e74c3c" />
      </div>
      <h2>Unlock Infinite Possibilities with GAN:ERATE :</h2>
      <h3>Your Gateway to Artificial Creativity</h3>
      <h4>AI 기반 데이터 증강 기능을 구현하여 고객이 필요한 이미지 데이터를 대량으로 제공해드립니다.</h4>
    </div>
    );
}

export default LandingPage;
