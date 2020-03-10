import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    salad : 0.2,
    bacon : 0.7,
    cheese : 0.5,
    meat : 1.0
};

class BurgerBuilder extends Component{
    state = {
        ingredients : {
        salad : 0,
        bacon : 0,
        cheese : 0,
        meat : 0
        },
        burgerPrice : 4,
        canOrder : false,
        clickedOrderNow : false
    }

    updateCanOrder = (updatedIngrs) =>{
        const ingrs = {...updatedIngrs}
        const sum = Object.keys(ingrs)
                          .map(igKey => {return ingrs[igKey]})
                          .reduce((acc,cur) => acc+cur)
        this.setState({canOrder : sum > 0})
    }

    orderNowHandler = () => {
        this.setState({clickedOrderNow : true});
    }

    cancelOrderHandler = () => {
        this.setState({clickedOrderNow : false});
    }

    continueOrderHandler = () => {
        alert('you selected to continue with order');
    }

    addIngredientsHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients}
        let typeOldCount = updatedIngredients[type]
        let typeCurCount = typeOldCount + 1;
        updatedIngredients[type] = typeCurCount;
        const additionalPrice = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.burgerPrice
        const newBurgerPrice = oldPrice + additionalPrice;
        this.setState({burgerPrice : newBurgerPrice , ingredients : updatedIngredients})
        this.updateCanOrder(updatedIngredients);
    }

    removeIngredients = (type) => {
        let curIngredients = {...this.state.ingredients}
        const oldCount = curIngredients[type]
        if(oldCount <= 0){
            return;
        }
        curIngredients[type] = oldCount-1
        const typePrice = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.burgerPrice
        const updatedPrice =  oldPrice - typePrice
        this.setState({burgerPrice : updatedPrice, ingredients : curIngredients})
        this.updateCanOrder(curIngredients);
    }
    render(){
        let disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return(
            <Aux>
            <Burger ingredients = {this.state.ingredients}/>
            <Modal isOrdered = {this.state.clickedOrderNow}
                   clickedBackdrop = {this.cancelOrderHandler}>
                <OrderSummary ingredients ={this.state.ingredients}
                              cancelOrder = {this.cancelOrderHandler}
                              continueOrder = {this.continueOrderHandler}
                              finalPrice = {this.state.burgerPrice}/>
            </Modal>
            <BuildControls 
                ingredientsAdded = {this.addIngredientsHandler}
                ingredientsRemoved = {this.removeIngredients}
                disabled = {disabledInfo}
                price = {this.state.burgerPrice}
                orderNowStatus = {this.state.canOrder}
                clickedOrder = {this.orderNowHandler}/>
            </Aux>
        )

    }
}

export default BurgerBuilder;