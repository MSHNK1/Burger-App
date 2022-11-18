import React, { Suspense, useEffect } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// });

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });


const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

export const App = (props) => {
  const {onAuthCheckState} = props;

  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState])

  let routes = (
    <Switch>
      {/* <Route path='/auth/' component={asyncAuth} />   this is used only in class-based components */}
      <Route path='/auth/' render={(props) => <Auth {...props}/>} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout/' render={(props) => <Checkout {...props}/>} />
        <Route path='/orders/' render={(props) => <Orders {...props}/>} />
        <Route path='/logout/' component={logout} />
        <Route path='/auth/' render={(props) => <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));