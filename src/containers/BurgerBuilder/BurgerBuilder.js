import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    //constructor(props) {
    //    super(props);
    //    this.state = {...}
    //}
    state = {
        // we set ingredients to null, we get it from database from now on.
        // we move over ingredients and totalPrice to the reducer
        totalPrice: 4,
        // the following: local UI states (showing modals, error messages, disable/enable button , etc) Not neceserraly needs Redux
        purchasable: false,
        purchasing:false,
        loading: false, 
        error: false
    }

    // best place to fetch data: componentDidMount
    // In the guidelines discouraged is that you immediately call setState(), because It'll trigger an instant re-render 
    //it's fine to use it in some callback/ async code (ajax ), because it then doesn't run instantly. 
    componentDidMount() {
        console.log(this.props.ings);
        // we set the ingredients from the database
        /* we comment out ajax request for now, add to redux later
        axios.get('https://react-my-burger-e8a39.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(err => {
            this.setState({error: true});
        });
        */
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);

        this.setState({purchasable: sum > 0});
    } 

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
         })
         this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if there were no ingredients, doesn't remove any
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
         })
         this.updatePurchaseState(updatedIngredients);
    }

    
    purchaseHandler = () => {
        //this.setState works only with arrow functions (because of 'this')
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
    
            // we pass in the data as query params:
            const queryParams = [];
            for (let i in this.state.ingredients) {
                // encodes the params
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            // adding in total price as well
            queryParams.push('price=' + this.state.totalPrice);
            const queryString = queryParams.join('&');

            this.props.history.push({
                pathname: "/checkout",
                search: '?' + queryString
            });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // returns true/false
        }
       
        
        
        // we add spinner to those components, that are waiting for the data to load (Burger, BuildControls)
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        //this.state.ingredients !== null
        
        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                />
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = state => {
    return { 
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

// exporting the axios instance we use
// can add as many hoc here as we want
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));