import React from 'react';
import Card from '../Card/Card';
import classes from './CardList.module.css';

const CardList = props =>{
    let cardCode=props.words.map((el,index)=>{
        console.log(el)
        return(
            <Card key={index} word={el}/>
        )
    })
    return(
        <div className={classes.playmat} style={{ gridArea: props.gridArea }}>
            {cardCode}
        </div>
    )
}

export default CardList;