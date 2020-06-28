import React from 'react';
import classes from './FormElement.module.css';

const FormElement = (props) =>{
    let element = null;
    switch(props.type){
        case 'text':
        case 'email':
        case 'password':
            element=<input type={props.type} className={classes.input} {...props}/>
            break;
        case 'select':
            let options = null;
            options = props.options.map(option=>{
                return <option value={option.value.toLowerCase()}>{option.value}</option>
            })
            element=<select className={classes.select}>
                {options}
            </select>
            break;

        case 'textarea':
            element=<textarea {...props}/>
            break;

        default: element=<input className={classes.input} {...props}/>
    }

    return(
        <div className={classes.container}>
            <p>{props.name}</p>
            {element}
        </div>
    )
}

export default FormElement;