import React, {Component} from 'react';
import classes from './Modal.module.css';
//import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

// turning modal component to class component, to be able to implement shouldComponentUpdate
class Modal extends Component {
    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        // -100vh - viewport height. Will slide off the screen if not show
                        opacity: this.props.show ? '1' : '0'
                    }}   >
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal;