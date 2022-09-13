import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            beacon: 1,
            meat: 1,
            cheese: 2
        },
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientss = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            console.log(param);
            // console.log('param[0]=' + param[0] + param[1]);
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredientss[param[0]] = +param[1];
            }
            // param[0] is salad and +param[1] is number of salad
            console.log('ings=' + ingredientss[param[0]])
        };
        this.setState({ ingredients: ingredientss, price: price });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler} />
                <Route
                    path={this.props.match.path + "contact-data"}
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.price}
                            {...this.props} />)} />
            </div>
        )
    }
};

export default Checkout; 