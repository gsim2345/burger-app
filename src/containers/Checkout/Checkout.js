import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // summary with price
    // burger itself
    // button to cancel and go back
    // continue button => load form

    // dummy data for now
    state= {
        ingredients: null,
        price: 0
    }


    // we don't need to check componentDidUpdate, because that component will always loads itself, there won't be refresh. 
    // we change to componentWillMount, because that happenes before the child component renders , and we can set the state before the child component renders, so we don't send null. 
    // to get rid of componentWillMount() (because it will be deprecated), simply expose the code to the class (a.k.a remove componentWillMount() around the code, and simply leave it as it is. )
    componentWillMount() {
        // extract queryparameters
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            // ['salad', 1]

            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            // convert to number by adding +
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        // goes back to last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
                {/* passing in router params with props*/}
            </div>
        );
    }

}

export default Checkout;