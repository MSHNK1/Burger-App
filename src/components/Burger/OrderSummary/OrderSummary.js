import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => { 
                return (<li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                        {/* {igKey}: {props.ingredients[igKey]} */}
                    </li>
                )
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price of your Burger is {this.props.totalPrice.toFixed(2)}$.</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;