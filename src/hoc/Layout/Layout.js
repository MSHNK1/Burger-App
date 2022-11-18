import React, { useState } from 'react';
import { connect } from "react-redux";
import Aux from "../Auxiliary/Auxiliary";
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                opened={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className="content">
                {props.children}
            </main>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);