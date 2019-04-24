import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    // we set initially null, before we fetch from the DB
    ingredients: null,
    totalPrice: 4,
    // add error to initalstate. if our loading fails, we set to true
    error: false, 
    // building the burger. We need, so we know if we get redirected to the login page while bilding the burger, we don't lose the information. 
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}



const reducer = (state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default: return state;
    }
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngrs = updateObject(state.ingredients, updatedIngr);
            const updatedSt = {
                ingredients: updatedIngrs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
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
        error: false,
        // set to false, showing there is no burger building
        building: false
    })
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true})
}


export default reducer;