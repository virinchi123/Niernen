import React from 'react';
import classes from './Centerpiece.module.css'
import CardList from '../../components/CardList/CardList';

const Centerpiece = props=>{

    const clueChangedHandler = event => {
        props.changeBotState({
            number: props.botState.number,
            clue: event.target.value
        })
    }

    const numberChangedHandler = event => {
        console.log('number: '+props.botState.number)
        props.changeBotState({
            clue:props.botState.clue,
            number: event.target.value
        })
        console.log('number: ' + props.botState.number)
    }

    const giveClue = props=>{
        let array=[props.user.team.toLowerCase(),'clue',props.user.nickname,props.botState.clue,props.botState.number]
        props.logFunction(array)
        props.nextFunction()
    }

    const words = props.words;
    let topCode=null;
    let botCode=null;
    let topText=null;
    console.log(props)
    switch(props.status){
        case 1:
            topText='The Blue Spymaster is giving a clue';
            break;
        case 2:
            topText='The Red Spymaster is giving a clue';
            break;
        case 3:
            topText = 'The Blue team is guessing';
            break;
        case 4:
            topText = 'The Red team is guessing';
            break;
        case 5:
            topText = 'The Blue team has won!';
            break;
        case 6:
            topText = 'The Red team has won!';
            break;
        default:
            topText="Default"
    }
    if(props.status===3||props.status===4){
        let guessCode=null;
        if(props.user.team==='Red'&&props.status===4&&props.user.role==='Spymaster'){
            guessCode = <button className={classes.endGuessingButton} type='button' onClick={props.nextFunction}>End Guessing</button>
        }
        else if(props.user.team==='Blue'&&props.status===3){
            guessCode = <button className={classes.endGuessingButton} type='button' onClick={props.nextFunction}>End Guessing</button>
        }
        botCode = (
            <div className={classes.bottomText}>
                <div className={classes.clue}>
                    <h2>{props.botState.clue}</h2>
                </div>
                <div className={classes.number}>
                    <h2>{props.botState.number}</h2>
                </div>
                {guessCode}

            </div>
        )
    }
    else if(props.status===1){
        if(props.user.team==='Blue'){
            if(props.user.role==='Spymaster')
            {
                botCode = (
                    <div className={classes.inputFlex}>
                        <input className={classes.clueInput} type='text' onChange={clueChangedHandler} />
                        <input className={classes.numberInput} type='number' onChange={numberChangedHandler} />
                        <button onClick={()=>giveClue(props)}>GO</button>
                    </div>
                )
            }
        }
    }

    else if (props.status === 2) {
        if (props.user.team === 'Red') {
            if (props.user.role === 'Spymaster') {
                botCode = (
                    <div className={classes.inputFlex}>
                        <input className={classes.clueInput} type='text' onChange={clueChangedHandler} />
                        <input className={classes.numberInput} type='number' onChange={numberChangedHandler} />
                        <button onClick={()=>giveClue(props)}>GO</button>
                    </div>
                )
            }
        }
    }

topCode=<h2>{topText}</h2>


    return(
        <div className={classes.center} style={{ gridArea: `${props.gridArea}` }}>
            {topCode}
            <CardList 
                serverState={props.serverState} 
                updateServerState={props.updateServerState} 
                tapState={props.tapState} 
                updateTapState={props.updateTapState} 
                black={props.black} 
                setImageState={props.setImageState} 
                imageState={props.imageState} 
                words={words}
                gridArea='center' 
                logFunction={props.logFunction} 
                user={props.user} 
                nextFunction={props.nextFunction} 
                gameState={props.gameState} 
                updateGameState={props.updateGameState} 
                status={props.status} 
                taps={props.botState.number}/>
            {botCode}
        </div>
    )
}

export default Centerpiece;