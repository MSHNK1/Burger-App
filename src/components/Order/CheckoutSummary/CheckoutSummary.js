import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";


export const CheckoutSummary = props => {
  return (
    <div className='checkoutSummary'>
      <h1>Hope, it's delicious!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger
          ingredients={props.ingredients} />
      </div>
      <Button
        btnType="danger"
        clicked={props.checkoutCancelHandler}>CANCEL</Button>
      <Button
        btnType='success'
        clicked={props.checkoutContinueHandler}>CONTINUE</Button>
    </div>
  )
};

export default CheckoutSummary;