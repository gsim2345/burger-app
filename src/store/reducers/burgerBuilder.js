import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    // we set initially null, before we fetch from the DB
    ingredients: null,
    totalPrice: 4,
    // add error to initalstate. if our loading fails, we set to true
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngrs = updateObject(state.ingredients, updatedIngr);
            const updatedSt = {
                ingredients: updatedIngrs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedSt);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    // to give the order of ingredients what we want, set manually:
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                // we need to update the totalprice too at every  Init , or it keeps the earlier value
                totalPrice: 4,
                // reset error to false in case there was an error already erlier
                error: false
            })
            
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
            
        default: 
            return state;
    }
}

export default reducer;