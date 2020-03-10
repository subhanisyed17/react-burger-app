import React, { Component } from 'react';
import classes from '../Modal/Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.isOrdered !== this.props.isOrdered
    }

    componentDidUpdate(){
        console.log("[Modal] is updated");
    }

    render(){
        return(
            <Aux>
            <BackDrop show = {this.props.isOrdered}
                    clicked = {this.props.clickedBackdrop}/>
            <div className ={classes.Modal}
                style = {{
                    transform : this.props.isOrdered ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : this.props.isOrdered ? '1' : '0'
                }}>
                {this.props.children}
            </div>
            </Aux>
        )
    }
}

export default Modal;