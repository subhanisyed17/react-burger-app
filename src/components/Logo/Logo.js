import React from 'react';
import burgerLogo from '../../assets/images/burger-image.png';
import classes from '../Logo/Logo.css';

const logo = (props) => (

    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt=""/>
    </div>
    
)

export default logo;
