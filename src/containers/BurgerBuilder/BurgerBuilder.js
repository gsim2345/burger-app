import React, { Component } from 'react';
//import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return(
            <>
                <Burger />
                <div>Build Controls</div>
            </>
        )
    }
}

export default BurgerBuilder;