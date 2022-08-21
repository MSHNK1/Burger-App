import React from "react";
import './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = `sideDrawer close`;
    if (props.opened) {
        attachedClasses = 'sideDrawer open'
    }
    return (
        <Aux>
            <Backdrop show={props.opened} clicked={props.closed}/>
            <div className={attachedClasses}>
                <div className="logo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;