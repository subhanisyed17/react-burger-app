import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state= {
        showSideDrawer : false
    }
    
    hideSideDrawerHandler = () =>{
        this.setState({showSideDrawer : false});
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => { return {showSideDrawer : !prevState.showSideDrawer}})
    }

    render(){
        return(
            <Aux>
            <Toolbar clicked = {this.toggleSideDrawerHandler}/>
            <SideDrawer
                open = {this.state.showSideDrawer}
                sideDrawerClicked = {this.hideSideDrawerHandler} 
            />
            <main className = {classes.Layout}>
                {this.props.children}
            </main>
            </Aux>
        )
    }
}

export default Layout;