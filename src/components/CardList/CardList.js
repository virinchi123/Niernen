import React,{useState,useEffect} from 'react';
import Card from '../Card/Card';
import classes from './CardList.module.css';

const CardList = props =>{
    let cardCode=null;
    let [tapState,updateTapState]=useState({
        taps:parseInt(props.taps)
    })

    useEffect(()=>{
        console.log('updated '+props.taps)
        updateTapState({
            taps: parseInt(props.taps)
        })
    },[props.taps])

    /*useEffect(()=>{
        if(tapState.taps===0){
            updateTapState({
                taps: parseInt(props.taps) + 1
            })
        }
    },[props.taps,tapState])*/

    const clickHandler=(event,word)=>{
        console.log(event)
        const logArray=[props.user.team,'tap',props.user.nickname,word]
        props.logFunction(logArray)
        if(props.nextFunction)
        {
            console.log(tapState.taps)
            if(tapState.taps>0){
                updateTapState({
                    ...tapState,
                    taps:tapState.taps-1
                })
            }
            else{
                props.nextFunction()
            }
        }
    }

    if(props.status===1||props.status===2){
        if(props.user.role==='Spymaster'){
            cardCode = props.words.map((el, index) => {
                //console.log(el)
                return (
                    <Card key={index} word={el} type='red' />
                )
            })
        }
        else{
            cardCode=props.words.map((el,index)=>{
            //console.log(el)
                return(
                    <Card key={index} word={el}/>
                )
    })
        }
    }
    else if(props.status===3){
        if(props.user.team==='Blue'){
            if(props.user.role==='Spymaster'){
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    return (
                        <Card key={index} word={el} type='red'/>
                    )
                })
            }
            else{
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    return (
                        <Card key={index} word={el} click={clickHandler} hover={true}/>
                    )
                })
            }
        }
    }
    else if(props.status===4){
        if (props.user.team === 'Red') {
            if (props.user.role === 'Spymaster') {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    return (
                        <Card key={index} word={el} type='red' />
                    )
                })
            }
            else {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    return (
                        <Card key={index} word={el} click={clickHandler} hover={true}/>
                    )
                })
            }
        }
    }


    /*cardCode=props.words.map((el,index)=>{
        //console.log(el)
        return(
            <Card key={index} word={el} click={props.nextFunction}/>
        )
    })*/
    return(
        <div className={classes.playmat} style={{ gridArea: props.gridArea }}>
            {cardCode}
        </div>
    )
}

export default CardList;