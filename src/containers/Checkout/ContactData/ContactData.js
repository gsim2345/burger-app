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
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
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
        // we don't want to send a request automatically, that would reaload the page, so we need event.preventDefault()
        event.preventDefault();
        
        // moved the code from Burger Builder here. We are sending the data to FireBase from here instead. 
        
        this.setState({loading: true});

        // we want to add our formData into our post request
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            // counrty: 'Denmark'
        }
        const order = {
            ingredients: this.props.ingredients,
            // price in real app would be calculated on the server, so it can't be manipulated
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            // to remove white spaces from start and end
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        // we check at every validation if isValid == true (&& isValid), so we know that the earlier validations passed. 
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
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
            <form onSubmit={this.orderHandler}> 
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            //checks if validationrules are set for this property at all - returns true/false
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button btnType='Success'>ORDER</Button>
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