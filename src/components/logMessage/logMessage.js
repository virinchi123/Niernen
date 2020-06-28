import React from 'react';
import classes from './logMessage.module.css';

const logMessage=props=>{
    let divClass=null;
    if(props.team==="red"){
        divClass=[classes.message,classes.red].join(' ')
    }
    else{
        divClass = [classes.message, classes.blue].join(' ')
    }

    let text='';
    if(props.type==='tap'){
        let code = <span>{props.word.toUpperCase()}</span>
        code=props.word.toUpperCase()
        text = 'taps ' + code;
    }
    else if (props.type === 'clue'){
        text=`gives clue ${props.clue} ${props.number}`
    }
    return (
        <div className={divClass}>
            <p><span>{props.name}</span> {text}</p>
        </div>
    )
}

export default logMessage;