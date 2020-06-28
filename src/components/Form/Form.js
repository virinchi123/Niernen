import React from 'react';
import classes from './Form.module.css';

const Form = props=>{

    let button = (
        <div className={classes.submitButton} onClick={props.submit} tabIndex='0'>
            <p>Submit</p>
        </div>
    )

    if(props.disabled){
        button = <div className={[classes.submitButton,classes.disabled].join(' ')}>
            <p>Submit</p>
        </div>
    }

    return(
        <div className={classes.container}>
            {props.children}
           {button}
        </div>
    )
}

export default Form;