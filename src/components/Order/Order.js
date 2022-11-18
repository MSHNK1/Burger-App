import React from 'react';
import './Order.css';

export const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      }
    )
  }

  const ingredientOutput = ingredients.map(ig => {
    return (<span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}>{ig.name} ({ig.amount}) </span>)
  })

  return (
    <div className='order'>
      <p>ingredients: {ingredientOutput}</p>
      <p>price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
};

export default Order;