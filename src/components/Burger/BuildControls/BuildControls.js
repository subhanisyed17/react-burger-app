import React from 'react';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
import classes from '../BuildControls/BuildControls.css';
import orderButtonClasses from '../BuildControls/OrderButton.css';

const burgerItems = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'}
]
const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Burger Price : <strong>{props.price.toFixed(2)}</strong></p>
        {
            burgerItems.map(items => {
               return <BuildControl 
                            key = {items.label} 
                            label = {items.label} 
                            addIng = {() => props.ingredientsAdded(items.type)}
                            removIng = {() => props.ingredientsRemoved(items.type)}
                            disabledInfo = {props.disabled[items.type]}
                      />
            })
        }
        <button 
            className = {orderButtonClasses.OrderButton}
            disabled = {!props.orderNowStatus}
            onClick = {props.clickedOrder}>ORDER NOW
        </button>
    </div>
)

export default buildControls;