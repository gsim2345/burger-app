import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    // summary with price
    // burger itself
    // button to cancel and go back
    // continue button => load form

    // dummy data for now
    state= {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }


    // we don't need to check componentDidUpdate, because that component will always loads itself, there won't be refresh. 
    componentDidMount() {
        // extract queryparameters
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', 1]
            ingredients[param[0]] = +param[1];
            // convert to number by adding +
        }
        this.setState({ingredients: ingredients});
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
            </div>
        );
    }

}

export default Checkout;