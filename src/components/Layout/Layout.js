import React from 'react';
//import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

const layout = (props) => (
    // needs a wrapper root element , a div, or a hoc (Aux), (can return only array or wrapped componenets)
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default layout;