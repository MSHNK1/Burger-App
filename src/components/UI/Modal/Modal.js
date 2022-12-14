import React, { useEffect } from "react";
import "./Modal.css";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {

    useEffect(() => {
        console.log('[OrderSummary] updated');
    }, []);

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.click} />
            <div
                className="modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>)
};

export default React.memo(Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);