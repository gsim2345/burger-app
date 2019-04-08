import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount () {
        // One way of doing: Add this.props.history, and call the push method 
        //this.props.onLogout(this.props.history);
        // What we do instead: redirect declaratively, more elegant way (a.k.a. render the <Rerdirect /> route)
        this.props.onLogout();
    }
    render() {
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
