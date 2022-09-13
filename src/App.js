import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import CheckoutSummary from './components/Order/CheckoutSummary/CheckoutSummary';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout/' component={Checkout} />
            <Route path='/orders/' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;