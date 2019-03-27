import * as actionTypes from './actions.js';

const initialState = {
    // temporarily we set ingredients without the ajax request
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
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
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    // need to copy this as well, because objects are still pointing to the old object. Copy first, than mutate
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        default: 
            return state;
    }
}

export default reducer;