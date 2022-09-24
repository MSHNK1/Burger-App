import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredientss = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         console.log(param);
    //         // console.log('param[0]=' + param[0] + param[1]);
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredientss[param[0]] = +param[1];
    //         }
    //         // param[0] is salad and +param[1] is number of salad
    //         console.log('ings=' + ingredientss[param[0]])
    //     };
    //     this.setState({ ingredients: ingredientss, price: price });
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler} />
                <Route
                    path={this.props.match.path + "contact-data"}
                    component={ContactData} />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        prc: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout); 