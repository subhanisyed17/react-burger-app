import React from 'react';
import classes from '../BuildControl/BuildControl.css';

const buildControl = (props) => (

    <div className = {classes.BuildControl}>

        <div className ={classes.Label}>{props.label}</div>

        <button 
            className = {classes.More} 
            onClick = {props.addIng}
        >More
        </button>

        <button 
            className = {classes.Less}
            onClick = {props.removIng}
            disabled = {props.disabledInfo}
        >Less
        </button>

    </div>
);

export default buildControl;