import React, { Component } from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";


export class CheckoutSummary extends Component {
  render() {
    return (
      <div className='checkoutSummary'>
        <h1>Hope, it's delicious!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Burger
            ingredients={this.props.ingredients} />
        </div>
        <Button 
          btnType="danger"
          clicked={this.props.checkoutCancelHandler}>CANCEL</Button>
        <Button
          btnType='success'
          clicked={this.props.checkoutContinueHandler}>CONTINUE</Button>
      </div>
    )
  }
};

export default CheckoutSummary;