import React, { Component} from 'react';
//import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        // use prevstate to avoid async problems
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return(
            // needs a wrapper root element , a div, or a hoc (Aux), (can return only array or wrapped componenets)
            <>
                <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
} 

export default Layout;