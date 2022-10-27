import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import './BuildControls.css';

const Controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
    <div className="buildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        {Controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        
        <button 
            className="orderButton"
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Sign up to order'}</button>
    </div>
);

export default buildControls;