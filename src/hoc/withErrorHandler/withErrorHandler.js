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

        // Because componentWillMount() won't be supported soon. The general idea is that this code gets executed, when the component gets created, therefore using the constructor() instead of componentWillMount() will work in exactly the same way.

        componentWillMount() {
            // as this component can be wrapped around multiple components, whenever withErrorHandler will be called, this componentWillMount will be called, and we are ataching multiple interceptors to the same axios instance in our application. When we call a new one, the old interceptors still exist, and sitting in memory.
            //We need to get rid of them when this instance doesn't need the interceptors anymore => in componentWillUnmount()
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // removes the error at every request sending
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        };

        // will be executed when the component is not needed anymore
        // if you use hooks (useEffect), will write in the return part of useEffect, since this function runs whenever the cleanup is done for this component
        componentWillUnmount() {
            console.log("Will Unmount", this.reqInterceptor, this.resInterceptor);
            // we get rid of not needed interceptor instances
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

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