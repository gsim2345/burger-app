import * as actionTypes from '../actions/actionTypes';

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
            return {
                ...state,
                ingredients: {
                    // need to copy this as well, because objects are still pointing to the old object. Copy first, than mutate
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    // need to copy this as well, because objects are still pointing to the old object. Copy first, than mutate
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default: 
            return state;
    }
}

export default reducer;