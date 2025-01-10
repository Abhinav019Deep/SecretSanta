import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import videofile1 from '../Videos/SecretSantaVideo720.mp4';
import './SecretSantaLogin.css';

const SecretSantaLogin = ({login}) => {

  const navigate = useNavigate();

  const handlelogin = () => {
    // Logic for logging in (if needed)
    navigate('/secretsanta'); // Navigate to the /secretsanta route
  };

  return (
    <div className="secret-santa-page">
      <video autoPlay loop  className="background-video">
        <source src={videofile1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to Secret Santa!</h1>
        <button onClick={handlelogin} className="cta-button">
          Login
        </button>
      </div>
      <p style={{ position: 'absolute', bottom: 5, left: 10, margin: 0, padding: 5, color:"white" , background: "rgb(0 0 0 / 50%)" , }}>     Created By GBS-UK (India) Team.      </p>
    </div>
  );
};

export default SecretSantaLogin;
