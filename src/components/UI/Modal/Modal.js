import React, { Component } from "react";
import "./Modal.css";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate( nextProps ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children ;
    }

    componentDidUpdate() {
        console.log('[OrderSummary] updated');
    }

    render() {
        return (
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.click} />
            <div
                className="modal"
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </Aux>)
    }
};

export default Modal;