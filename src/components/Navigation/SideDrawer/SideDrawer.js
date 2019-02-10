import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';


const sideDrawer = (props) => {
    //...
    return (
        // we can set the logo height as props
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;