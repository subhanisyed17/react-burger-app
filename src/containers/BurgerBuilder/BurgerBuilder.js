import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
    salad : 0.2,
    bacon : 0.7,
    cheese : 0.5,
    meat : 1.0
};

class BurgerBuilder extends Component{
    state = {
        ingredients : null,
        burgerPrice : 4,
        canOrder : false,
        clickedOrderNow : false,
        showSpinner : false,
        isError : false
    }

    componentDidMount = () => {
        axios.get('ingredients.json')
             .then(response => {
                 this.setState({ingredients : response.data})
             })
             .catch(error => {
                 this.setState({isError : true})
             })
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
        //alert('you selected to continue with order');
        this.setState({showSpinner : true})
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.burgerPrice,
            customer : {
                name : 'Dummy Customer',
                address : {
                    houseNumber : 3224,
                    street : 'Fictious Street',
                    city : 'Heaven',
                    country : 'Mesapatomia'
                },
                deliveryMethod : 'Express'
            }
        }
        axios.post('orders.json',order)
             .then(response => {
                    this.setState({showSpinner :false, clickedOrderNow :false})
             })
             .catch(error => {
                    this.setState({showSpinner :false, clickedOrderNow :false})
             });
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
        let orderSummary = null;

        let burger = this.state.isError ? <p>Issue With Adding Ingredients</p> : <Spinner/>
        if(this.state.ingredients){
            burger  =   <Aux>
                            <Burger ingredients = {this.state.ingredients}/>
                            <BuildControls 
                                ingredientsAdded = {this.addIngredientsHandler}
                                ingredientsRemoved = {this.removeIngredients}
                                disabled = {disabledInfo}
                                price = {this.state.burgerPrice}
                                orderNowStatus = {this.state.canOrder}
                                clickedOrder = {this.orderNowHandler}/>
                        </Aux>
             orderSummary  = <OrderSummary ingredients ={this.state.ingredients}
                                        cancelOrder = {this.cancelOrderHandler}
                                        continueOrder = {this.continueOrderHandler}
                                        finalPrice = {this.state.burgerPrice}
                                     />
        }
        if(this.state.showSpinner){
            orderSummary = <Spinner/>
         }
        return(
            <Aux>
            {burger}
            <Modal isOrdered = {this.state.clickedOrderNow}
                   clickedBackdrop = {this.cancelOrderHandler}>
                {orderSummary}
            </Modal>
            </Aux>
        )

    }
}

export default withErrorHandler(BurgerBuilder,axios);