import React from "react";
import './Logo.css';
import burgerLogo from '../../assets/Images/burgerLogo.png';

const logo = ( props ) => (
    <div className="logo" style={{height: props.height}}>
        <img src={burgerLogo} alt='Burger Logo' />
    </div>
);

export default logo;