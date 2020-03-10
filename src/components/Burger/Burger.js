import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients'

const burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredients).map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((arrayElement,i) => {
            return <BurgerIngredients key= {igKey + i} type = {igKey} />
        })
    }).reduce((acc,curVal) => {return acc.concat(curVal)}
    ,[]);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Add Ingredients to Burger</p>
    }

return(
        <div className= {classes.Burger}>
            <BurgerIngredients type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type = "bread-bottom" />
        </div>
)
}

export default burger;