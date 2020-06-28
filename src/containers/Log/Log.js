import React from 'react';
import LogMessage from '../../components/logMessage/logMessage';
import classes from './Log.module.css';

const Log = props=>{
    let messageCode=null;
    if(props.messages.length>0){
        messageCode=props.messages.map((el,index)=>{
            if(el[1]==='clue'){
                return <LogMessage key={index} team={el[0]} type={el[1]} name={el[2]} clue={el[3]} number={el[4]}/>
            }
            else{
                return <LogMessage key={index} team={el[0]} type={el[1]} name={el[2]} word={el[3]}/>
            }
        })
    }
    return (
    <div className={classes.log}>
        <h2>Game Log</h2>
        {messageCode}

    </div>
    )
}

export default Log;