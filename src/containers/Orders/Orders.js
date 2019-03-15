import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';


class Orders extends Component {
    // we start with deleting all orders in firebase, and changed all ingredients to 0

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    // we are pushing an object, with the copy of data, and add key manually
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {

            });
    }

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