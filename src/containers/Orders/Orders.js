import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        const fetchedOrders = [];
        axios.get('/orders.json')
            .then(res => {
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrders })
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        price={+order.price}
                        ingredients={order.ingredients}
                        key={order.id} />
                ))}
            </div>
        )
    }
};

export default Orders;