import React, { Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state= {
        orderForm: {
            name: {
                // we want to use normal html element tags as elementType
                elementType: 'input',
                // the attributes we can set up for the chosen html tag
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest',displayValue: 'Fastest'},
                        {value: 'cheapest',displayValue: 'Cheapest'}
                ]
                },
                value: ''
            },
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
            

        }
        // we send data to the database - anyname.json(.json needed because of firebase)
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                // stop spinner
                this.setState({
                    loading: false,
                    // set to false, so we close the modal
                    //purchasing:false
                    //not needed anymore, as we don't use the modal
                });
                // we redirect to the root 
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                // stop loading spinner
                this.setState({
                    loading: false, 
                    // set to false, so we close the modal
                    //purchasing: false
                    //not needed anymore, as we don't use the modal
                });
            })

    }

    inputChangedHandler = (event, inputIdentifier) => {

        console.log(event.target.value);
        // to ensure immutability, we do a lot of cloning 
        // first we clone the whole orderForm
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // then from there we clone only the element to update
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        // switch value to new
        updatedFormElement.value = event.target.value;

        // switch in the whole only the formElement that got changed
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form> 
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact information:</h4>
                {form}
            </div>
        );
    }


}

export default ContactData;