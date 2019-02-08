import React from 'react';
import classes from './Modal.module.css';
//import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                // -100vh - viewport height. Will slide off the screen if not show
                opacity: props.show ? '1' : '0'
            }}   >
            {props.children}
        </div>
    </>
);

export default modal;