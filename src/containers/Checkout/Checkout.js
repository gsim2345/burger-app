import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        // goes back to last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }


    render() {
        // if ingredients are not yet loaded, we get an error message
        // we redirect to burger builder page, where there is a loader until no ingredients are loaded. 
        let summary = <Redirect to='/'/>;
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                    {/* we no longer need pass in props, that will go through Redux, so we simply add as component, and not render as JSX*/}
                </div>
            )
        }

        return summary;
    }
}

// we use Redux now, no longer need to extract query params. 
// get the ingredients from the Redux store instead

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

// we don't do mapDispatchToProps here, as there is nothing to dispatch

export default connect(mapStateToProps)(Checkout);