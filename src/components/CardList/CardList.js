import React,{useEffect} from 'react';
import Card from '../Card/Card';
import classes from './CardList.module.css';

const CardList = props =>{
    let cardCode=null;
    console.log(props)

    const {updateTapState}=props
    useEffect(()=>{
        //console.log('updated '+props.taps)
        updateTapState({
            taps: parseInt(props.taps)
        })
    },[props.taps,updateTapState])

    const clickHandler=(event,word,index)=>{
        //console.log(event)
        let black=props.serverState.types.indexOf('black');
        var indices = [];

        props.serverState.types.forEach(function (currentItem, index) {
            if (currentItem === "grey") {
                indices.push(index);
            }
        });

        console.log(indices);
        const logArray=[props.user.team,'tap',props.user.nickname,word]
        const tempArray= [...props.imageState.show]
        tempArray[index]=true
        console.log(tempArray)
        props.setImageState({
            show: tempArray
        })

        props.logFunction(logArray)
        if(props.nextFunction)
        {
            console.log(props.tapState.taps)
            if(props.tapState.taps>0){
                props.updateTapState({
                    ...props.tapState,
                    taps:props.tapState.taps-1
                })
            }
            else{
                props.nextFunction()
            }
        }
        if (index === black) {
            if (props.user.team === 'Red') {
                props.updateGameState({
                    status:5
                })
            }
            else{
                props.updateGameState({
                    status: 6
                })
            }
        }
        if(indices.includes(index)){
            props.nextFunction()
        }
    }

    if(props.status===1||props.status===2){
        if(props.user.role==='Spymaster'){
            cardCode = props.words.map((el, index) => {
                let type=props.serverState.types[index]
                let show=props.imageState.show[index]
                console.log(type)
                return (
                    <Card 
                        key={index} 
                        word={el} 
                        type={type} 
                        reveal={type} 
                        show={show} 
                        index={index}
                    />
                )
            })
        }
        else{
            cardCode=props.words.map((el,index)=>{
            //console.log(el)
                let type = props.serverState.types[index]
                let show = props.imageState.show[index]
                return(
                    <Card 
                        key={index} 
                        word={el} 
                        reveal={type} 
                        show={show} 
                        index={index}
                    />
                )
    })
        }
    }
    else if(props.status===3){
        console.log('in here')
        if(props.user.team==='Blue'){
            if(props.user.role==='Spymaster'){
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            type={type} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
            else{
                console.log('in herer')
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            click={clickHandler} 
                            hover={true} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
        }
        else{
            if (props.user.role === 'Spymaster') {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            type={type} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
            else{
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            hover={true} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
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
                    let show = props.imageState.show[index]
                    let type = props.serverState.types[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            type={type} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
            else {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            click={clickHandler} 
                            hover={true} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
        }
        else{
            if (props.user.role === 'Spymaster') {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            type={type} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
                    )
                })
            }
            else {
                cardCode = props.words.map((el, index) => {
                    //console.log(el)
                    let type = props.serverState.types[index]
                    let show = props.imageState.show[index]
                    return (
                        <Card 
                            key={index} 
                            word={el} 
                            hover={true} 
                            reveal={type} 
                            show={show} 
                            index={index}
                        />
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
    console.log(cardCode)
    return(
        <div className={classes.playmat} style={{ gridArea: props.gridArea }}>
            {cardCode}
        </div>
    )
}

export default CardList;