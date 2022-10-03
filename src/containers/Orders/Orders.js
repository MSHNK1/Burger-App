import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    price={+order.price}
                    ingredients={order.ingredients}
                    key={order.id} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);