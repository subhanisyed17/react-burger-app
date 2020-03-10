import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const items = Object.keys(props.ingredients)
                        .map(igKey => {
                            return <li key={igKey}>
                                        <span style = {{textTransform : "capitalize"}}>
                                            {igKey}
                                        </span> :
                                        {props.ingredients[igKey]}
                                   </li>
                        })

   return <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {items}
            </ul>
            <p><strong>Total Price : {props.finalPrice.toFixed(2)}</strong></p>
            <p>Continue to CheckOut?</p>
            <Button btnType = "Danger"
                    clicked = {props.cancelOrder}
            >CANCEL
            </Button>

            <Button btnType = "Success"
                    clicked = {props.continueOrder}
            >CONTINUE
            </Button>
        </div>
}

export default orderSummary;