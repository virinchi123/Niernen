import React from 'react';

const PlayerList = props =>{
    //console.log(props)
    let playerCode = props.names.map((el,index)=>{
        return (
            <h4 key={index}>{el}</h4>
        )
    })
    return(
        <React.Fragment>
            <h3>{props.type}</h3>
            {playerCode}
        </React.Fragment>
    )
}

export default PlayerList;