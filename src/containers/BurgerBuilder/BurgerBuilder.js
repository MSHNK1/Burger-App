import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
// import * as actionTypes from "../../store/actions/";
import * as actions from '../../store/actions/index';


// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

export class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     cheese: 0,
        //     meat: 0,
        //     bacon: 0
        // },
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

        // this.setState({ purchasable: sum > 0 });
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            console.log('11111111111');
            console.log(this.props.history);
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        // alert('You continued!')
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ins[i]));
        // }
        // queryParams.push('price=' + this.props.prc);
        // const queryString = queryParams.join('&');
        console.log("history.push   /checkout");
        this.props.history.push('/checkout');
        // console.log(this.props.history);
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
        //     axios.get('https://fastfoodburger-b4f23-default-rtdb.europe-west1.firebasedatabase.app/Ingredients.json')
        //         .then(response => this.setState({ ingredients: response.data }))
        //         .catch(error => {this.setState({error: true})});
        //     // console.log("fetched data");
        //     // console.log(this.state.error.message);
        //     // console.log(this.state.ingredients);
    }

    render() {
        // console.log(this.props);
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.props.error ? <p>Something is wrong...</p> : <Spinner />

        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.prc}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>;

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                totalPrice={this.props.prc} />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

//export default withErrorHandler(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);