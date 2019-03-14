import React, { Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {

    state= {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        // moved the code from Burger Builder here. We are sending the data to FireBase from here instead. 
        
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            // price in real app would be calculated on the server, so it can't be manipulated
            price: this.props.price,
            // dummy data for now
            customer:{
                name: 'Max Schwarzmuller',
                adress: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'

        }
        // we send data to the database - anyname.json(.json needed because of firebase)
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                // stop spinner
                this.setState({
                    loading: false,
                    // set to false, so we close the modal
                    purchasing:false
                });
            })
            .catch(error => {
                console.log(error);
                // stop loading spinner
                this.setState({
                    loading: false, 
                    // set to false, so we close the modal
                    purchasing: false
                });
            })

    }

    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact information:</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }


}

export default ContactData;