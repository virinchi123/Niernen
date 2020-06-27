import React from 'react';
import classes from './Centerpiece.module.css'
import CardList from '../../components/CardList/CardList';

const Centerpiece = props=>{
    const words = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12', 'word13', 'word14', 'word15', 'word16', 'word17', 'word18', 'word19', 'word20', 'word21', 'word22', 'word23', 'word24', 'word25']
    let topCode=null;
    let botCode=null;
    let topText=null;
    switch(props.status){
        case '1':
            topText='The Blue Spymaster is giving a clue';
            break;
        case '2':
            topText='The Red Spymaster is giving a clue';
            break;
        case '3':
            topText = 'The Blue team is guessing';
            break;
        case '4':
            topText = 'The Red team is guessing';
            break;
        case '5':
            topText = 'The Blue team has won!';
            break;
        case '6':
            topText = 'The Red team has won!';
            break;
        default:
            topText="Default"
    }

    botCode=(
        <div className={classes.bottomText}>
            <div className={classes.clue}>
                <h2>{props.clue}</h2>
            </div>
            <div className={classes.number}>
                <h2>{props.number}</h2>
            </div>

        </div>
    )

topCode=<h2>{topText}</h2>


    return(
        <div className={classes.center} style={{ gridArea: `${props.gridArea}` }}>
            {topCode}
            <CardList words={words} gridArea='center' />
            {botCode}
        </div>
    )
}

export default Centerpiece;