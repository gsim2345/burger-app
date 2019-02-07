import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // convert ingredientlist from object to array

    /*
    const ingredientnames = Object.entries(props.ingredients);
    console.log(ingredientnames);
    let ingredientlist = [];
    ingredientnames.forEach(function(ingr) {
        let ingrName = ingr[0];
        let ingNr = ingr[1];
        let typelist = [];
        for (var i= 0; i< ingNr; i++) {
            typelist.push(<BurgerIngredient key={ingrName + i} type={ingrName}/>);
        }
        ingredientlist.push(typelist);
    });*/
    

    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        //console.log(props.ingredients);
        //console.log(props.ingredients[igKey]);// 1, 1, 2, 2 the numbers
    
        return [...Array(props.ingredients[igKey])].map((_,i) => {  // Array(2) fx returns an array with 2 empty or undefined position[]
        // _ in map just indicates it's doesn't matter what's there, we only use i   
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;