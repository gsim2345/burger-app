import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// the axios instance we set up, exported from BurgerBuilder component
const withErrorHandler = (WrappedComponent, axios) => {
    // anonymous class
    return class extends Component {
        state = {
            error: null
        }

        // this componentDidMount will only be called after in the child components (wrappedComponent - (BurgerBuilder)) componentDidMount was called. In that component's componentDidMount  we also reach out to the web, and as the interceptors are set up here, they are not yet set when we reach out to the web in BurgerBuilder => can't handle errors 
        // we change componentDidMount to componentWillMount, because it's called before the child components are being rendered. 
        componentWillMount() {
            axios.interceptors.request.use(req => {
                // removes the error at every request sending
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        };

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                // output error message only if error is true, if there is sg to output
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}
                    >
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>

                </>
            );
        }
    }
}

export default withErrorHandler;