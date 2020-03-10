import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) =>{
    let sideDrawerClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        sideDrawerClasses = [classes.SideDrawer, classes.Open]
    }

    return(
        <Aux>
        <BackDrop show = {props.open} clicked = {props.sideDrawerClicked} />
        <div className = {sideDrawerClasses.join(' ')}>
            <div className= {classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    )

}

export default sideDrawer;