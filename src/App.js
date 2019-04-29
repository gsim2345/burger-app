import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders.js';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          {/* Switch not actually required in this case */}
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);
