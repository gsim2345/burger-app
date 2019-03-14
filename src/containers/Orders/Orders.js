import React, { Component } from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {
    // we start with deleting all orders in firebase, and changed all ingredients to 0

    render() {
        return(
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders;