import React from 'react';
//import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const layout = (props) => (
    // needs a wrapper root element , a div, or a hoc (Aux), (can return only array or wrapped componenets)
    <>
        <Toolbar />
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default layout;