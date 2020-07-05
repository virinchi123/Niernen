import React,{useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/Topbar/Topbar';
import classes from './Main.module.css';
import Centerpiece from '../Centerpiece/Centerpiece';
import Log from '../Log/Log';
import Modal from '../../components/Modal/Modal';
import FormElement from '../../components/FormElement/FormElement';
import blueBG from '../../assets/bg-blue.jpg'
import redBG from '../../assets/bg-red.jpg'
const io = require('socket.io-client')
const socket = io('http://localhost:8080')


const Main = props=>{

    const [userState,updateUserState]=useState({
        nickname:'virinchi',
        team:'Red',
        role:'Operative'
    })

    const [serverState,updateServerState]=useState({
        words:[],
        reveal:[],
        types:[]
    })

    const [modalState,updateModalState]=useState({
        show:false
    })

    const [operativesState,updatedOperativesState]=useState({
        blueOperatives:[],
        blueSpymasters:[],
        redOperatives:['virinchi'],
        redSpyMasters:[]
    })

    const [gameState,updateGameState]=useState({
        status:1
    })

    const [logState,updateLogState]=useState({
        messages :[['red', 'clue', 'masterDummy', 'SDF', '2'], ['red', 'tap', 'dummy1', 'board'], ['red', 'tap', 'dummy2', 'film']]
    })

    const updateOperativesState = data=>{
        updatedOperativesState({
            blueOperatives: data.blueOperatives,
            redOperatives: data.redOperatives,
            blueSpymasters: data.blueSpymasters,
            redSpyMasters: data.redSpyMasters
        });
    }

    const [wordState,updateWordState]=useState({
        words:[]
    })

    const [botState, updateBotState] = useState({
        clue: 'bot',
        number: '2'
    })

    let [imageState, updatedImageState] = useState({
        show: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    })

    const updateImageState=data=>{
        socket.emit('shown',data.show)
        updatedImageState(data)
    }

    let [scoreState,updateScoreState] = useState({
        red:8,
        blue:9
    })

    useEffect(()=>{
        socket.emit('join', {
            id: socket.id, user: {
                nickname: 'virinchi',
                team: 'Red',
                role: 'Operative'
            }})
        socket.on('words-ready',data=>{
            console.log(data)
            updateServerState({
                words:data.words,
                reveal:data.reveal,
                types:data.types
            })
            updatedImageState({show:data.reveal})
            updateWordState({words:data.words})
        })
        socket.on('currentStatus',status=>{
            updateGameState({status:status})
        })

    },[])

    socket.off('currentPlayers').on('currentPlayers',data=>{
        const redOps = [];
        const blueOps=[];
        const redSpy=[];
        const blueSpy=[];
        data.forEach(player=>{
            if(player.team==='Red'){
                if(player.role==='Operative'){
                    redOps.push(player.name)
                }
                else{
                    redSpy.push(player.name)
                }
            }else{
                if (player.role === 'Operative') {
                    blueOps.push(player.name)
                }
                else {
                    blueSpy.push(player.name)
                }
            }
        })
        const obj={
            redOperatives:redOps,
            blueOperatives:blueOps,
            redSpyMasters:redSpy,
            blueSpymasters:blueSpy
        }
        updateOperativesState(obj)
    })

    socket.off('addUser').on('addUser',user=>{
        if(user.team==='Red'){
            if(user.role==='Operative'){
                updateOperativesState({
                    ...operativesState,
                    redOperatives:[...operativesState.redOperatives,user.name]})
            }
            else{
                updateOperativesState({
                    ...operativesState,
                    redSpyMasters: [...operativesState.redSpyMasters, user.name]
                })
            }
        }else{
            if(user.role==='Operative'){
                updateOperativesState({
                    ...operativesState,
                    blueOperatives: [...operativesState.blueOperatives, user.name]
                })
            }
            else{
                updateOperativesState({
                    ...operativesState,
                    blueSpymasters: [...operativesState.blueSpymasters, user.name]
                })
            }
        }
        //console.log(dummyState)
        //updateOperativesState({...dummyState})
    })

    socket.off('removeUser').on('removeUser',user=>{
        let dummyState = {...operativesState}
        let index
        if (user.team === 'Red') {
            if (user.role === 'Operative') {
                index=dummyState.redOperatives.findIndex(el=>el===user.name)
                dummyState.redOperatives.splice(index,1)
            }
            else {
                index = dummyState.redSpyMasters.findIndex(el => el === user.name)
                dummyState.redSpyMasters.splice(index, 1)
            }
        } else {
            if (user.role === 'Operative') {
                index = dummyState.blueOperatives.findIndex(el => el === user.name)
                dummyState.blueOperatives.splice(index, 1)
            }
            else {
                index = dummyState.blueSpymasters.findIndex(el => el === user.name)
                dummyState.blueSpymasters.splice(index, 1)
            }
        }
        updateOperativesState({ ...dummyState })
    })

    socket.off('changeName').on('changeName',({oldName,user})=>{
        //let dummyState = {...operativesState}
        console.log('name change request')
        //let index
        console.log(user)
        if (user.team === 'Red') {
            if (user.role === 'Operative') {
                //index = operativesState.redOperatives.findIndex(el => {console.log(el);return el === oldName})
                //dummyState.redOperatives[index]=user.name;
                updateOperativesState({
                    ...operativesState,
                    redOperatives:[...operativesState.redOperatives.filter(el=>(el!==oldName&&el!==user.name)),user.name]
                })
            }
            else {
                //index = dummyState.redSpyMasters.findIndex(el => el === oldName)
                //dummyState.redSpyMasters[index] = user.name;
                updateOperativesState({
                    ...operativesState,
                    redSpyMasters: [...operativesState.redSpyMasters.filter(el => el !== oldName), user.name]
                })
            }
        } else {
            if (user.role === 'Operative') {
                //index = dummyState.blueOperatives.findIndex(el => el === oldName)
                //dummyState.blueOperatives[index] = user.name;
                updateOperativesState({
                    ...operativesState,
                    blueOperatives: [...operativesState.blueOperatives.filter(el => el !== oldName), user.name]
                })
            }
            else {
                //index = dummyState.blueSpymasters.findIndex(el => el === oldName)
                //dummyState.blueSpymasters[index] = user.name;
                updateOperativesState({
                    ...operativesState,
                    blueSpymasters: [...operativesState.blueSpymasters.filter(el => el !== oldName), user.name]
                })
            }
        }
        //console.log(dummyState)
        //updateOperativesState({ ...dummyState })
    })

    socket.off('isSpymaster').on('isSpymaster',user=>{
        let dummyState = {...operativesState}
        //console.log(user)
        let index
        if (user.team === 'Red') {
            if (user.role === 'Operative') {
                index = dummyState.redOperatives.findIndex(el => el === user.nickname)
                dummyState.redOperatives.splice(index, 1)
                dummyState.redSpyMasters.push(user.nickname)
            }
        } else {
            if (user.role === 'Operative') {
                index = dummyState.blueOperatives.findIndex(el => el === user.nickname)
                dummyState.blueOperatives.splice(index, 1)
                dummyState.blueSpymasters.push(user.nickname)
            }
        }
        updateOperativesState({ ...dummyState })
    })

    socket.off('isOperative').on('isOperative',user=>{
        let dummyState = {...operativesState}
        let index
        if (user.team === 'Red') {
            if (user.role === 'Spymaster') {
                index = dummyState.redSpyMasters.findIndex(el => el === user.nickname)
                dummyState.redSpyMasters.splice(index, 1)
                dummyState.redOperatives.push(user.nickname)
            }
        } else {
            if (user.role === 'Spymaster') {
                index = dummyState.blueSpymasters.findIndex(el => el === user.nickname)
                dummyState.blueSpymasters.splice(index, 1)
                dummyState.blueOperatives.push(user.nickname)
            }
        }
        updateOperativesState({ ...dummyState })
    })

    socket.off('teamSwitched').on('teamSwitched',user=>{
        console.log(user)
        let dummyState = {...operativesState}
        let index
        if (user.team === 'Red') {
            if (user.role === 'Operative') {
                index = dummyState.redOperatives.findIndex(el => el === user.nickname)
                dummyState.redOperatives.splice(index, 1)
                dummyState.blueOperatives.push(user.nickname)
            }
            else {
                index = dummyState.redSpyMasters.findIndex(el => el === user.nickname)
                dummyState.redSpyMasters.splice(index, 1)
                dummyState.blueSpymasters.push(user.nickname)
            }
        } else {
            if (user.role === 'Operative') {
                index = dummyState.blueOperatives.findIndex(el => el === user.nickname)
                dummyState.blueOperatives.splice(index, 1)
                dummyState.redOperatives.push(user.nickname)
            }
            else {
                index = dummyState.blueSpymasters.findIndex(el => el === user.nickname)
                dummyState.blueSpymasters.splice(index, 1)
                dummyState.redSpyMasters.push(user.nickname)
            }
        }
        updateOperativesState({ ...dummyState })
    })

    socket.off('updateProgress').on('updateProgress',status=>{
        console.log(status)
        console.log(wordState)
        updateGameState({
            status:parseInt(status)
        })
    })

    socket.off('giveClue').on('giveClue',data=>{
        updateBotState(data);
    })

    socket.off('logMessage').on('logMessage',array=>{
        const dummyState = { ...logState };
        dummyState.messages.push(array);
        console.log(dummyState.messages)
        updateLogState({
            messages: dummyState.messages
        })
    })

    socket.off('cardShown').on('cardShown',data=>{
        console.log(data)
        updateServerState({
            ...serverState,
            reveal:data
        })
        updatedImageState({
            show:data
        })
    })

    useEffect(()=>{
        console.log('cardmat ',serverState.types)
        const dummyState=[...serverState.types]
        const dummyImageState=[...imageState.show]
        let redScore=0;
        let blueScore=0;
        for(let i=0;i<imageState.length;i++){
            if(dummyImageState[i]===true){
                if(dummyState[i]==='red'){
                    redScore++
                }
                else if(dummyState[i]==='blue'){
                    blueScore++
                }
            }
        }
        //console.log('red score ',redScore)
        //console.log('blue score ', blueScore)
        redScore=8-redScore;
        blueScore=9-blueScore;
        updateScoreState({
            redScore:redScore,
            blueScore: blueScore
        })
    },[imageState,serverState.types])

    const addLogMessage=array=>{
        const dummyState={...logState};
        dummyState.messages.push(array);
        console.log(dummyState.messages)
        updateLogState({
            messages:dummyState.messages
        })
        socket.emit('addLog',array)
    }

    const noModal=props=>{
        updateModalState({
            show:false
        })
    }

    const showModal = props => {
        updateModalState({
            show: true
        })
    }

    const nameChangedHandler=event=>{
        updateUserState({
            ...userState,
            nickname: event.target.value
        })
        let dummyState = {...operativesState}
        let index
        let user={...userState}
        if (user.team === 'Red') {
            if (user.role === 'Operative') {
                index = dummyState.redOperatives.findIndex(el => el === user.nickname)
                dummyState.redOperatives[index]=event.target.value
            }
            else {
                index = dummyState.redSpyMasters.findIndex(el => el === user.nickname)
                dummyState.redSpyMasters[index] = event.target.value
            }
        } else {
            if (user.role === 'Operative') {
                index = dummyState.blueOperatives.findIndex(el => el === user.nickname)
                dummyState.blueOperatives[index] = event.target.value
            }
            else {
                index = dummyState.blueSpymasters.findIndex(el => el === user.nickname)
                dummyState.blueSpymasters[index] = event.target.value
            }
        }
        updateOperativesState({ ...dummyState })
        socket.emit('nameChanged',event.target.value)
    }

    const progressFunction = props=>{
        console.log('progressing')
        socket.emit('progress')
        if(gameState.status===1){
            updateGameState({
                status:3
            })
        }
        else if(gameState.status===2){
            updateGameState({
                status:4
            })
        }
        else if (gameState.status===3){
            updateGameState({
                status:2
            })
        }
        else if(gameState.status===4){
            updateGameState({
                status:1
            })
        }
    }

    const becomeSpymaster = props=>{
        const usState={...userState}
        if(userState.role==='Spymaster'){
            return;
        }
        updateUserState({
            ...userState,
            role:'Spymaster'
        })
        const dummyState={...operativesState};
        if(usState.team==='Red'){
            dummyState.redOperatives=removeFromList(dummyState.redOperatives,usState.nickname);
            dummyState.redSpyMasters.push(usState.nickname)
            updateOperativesState(dummyState)
        }
        else{
            console.log('hi')
            dummyState.blueOperatives = removeFromList(dummyState.blueOperatives, userState.nickname);
            dummyState.blueSpymasters.push(userState.nickname)
            updateOperativesState(dummyState)
        }
        console.log(dummyState)
        console.log(operativesState)
        socket.emit('becomeSpymaster',usState)
    }

    const becomeOperative = props => {
        if(userState.role==='Operative'){
            return;
        }
        const usState={...userState}
        updateUserState({
            ...userState,
            role: 'Operative'
        })
        const dummyState={...operativesState}
        if (usState.team === 'Red') {
            dummyState.redSpyMasters = removeFromList(dummyState.redSpyMasters, userState.nickname);
            dummyState.redOperatives.push(userState.nickname)
            updateOperativesState(dummyState)
        }
        else {
            dummyState.blueSpymasters = removeFromList(dummyState.blueSpymasters, userState.nickname);
            dummyState.blueOperatives.push(userState.nickname)
            updateOperativesState(dummyState)
        }
        socket.emit('becomeOperative',userState)
    }

    const changeBotState=data=>{
        console.log(data)
        socket.emit('setClue',data);
        updateBotState(data)
    }

    const switchTeams=props=> {
        const team=userState.team;
        const dummyState={...userState}
        const opState={...operativesState}
        socket.emit('switchTeams',userState)
        if(team==='Red'){
            updateUserState({
                ...userState,
                team:'Blue'
            })
            if(dummyState.role==='Operative'){
                opState.redOperatives=removeFromList(opState.redOperatives,dummyState.nickname);
                opState.blueOperatives.push(dummyState.nickname)
                //addOperative(dummyState.nickname,'Blue')
                updateOperativesState(opState)
            }
            else{
                opState.redSpyMasters=removeFromList(opState.redSpyMasters, dummyState.nickname);
                opState.blueSpymasters.push(dummyState.nickname)
                //addSpymaster(dummyState.nickname, 'Blue')
                updateOperativesState(opState)
            }
            const body=document.querySelector('body');
            console.log(body)
            body.style.backgroundImage=`url(${blueBG})`;
        }
        else{
            updateUserState({
                ...userState,
                team:'Red'
            })
            if (dummyState.role === 'Operative') {
                opState.blueOperatives=removeFromList(opState.blueOperatives, dummyState.nickname);
                opState.redOperatives.push(dummyState.nickname)
                //addOperative(dummyState.name, 'Red')
                updateOperativesState(opState)
            }
            else {
                opState.blueSpymasters=removeFromList(opState.blueSpymasters, dummyState.nickname);
                opState.redSpyMasters.push(dummyState.nickname)
                //addSpymaster(dummyState.name, 'Red')
                updateOperativesState(opState)
            }
            const body = document.querySelector('body');
            console.log(body)
            body.style.backgroundImage = `url(${redBG})`;
        }
    }

    const removeFromList = (array,element)=>{
        if(!array.includes(element)){
            console.log('not found!')
            return array
        }
        else{
            console.log('removing '+element)
            const altArray=array.filter(el=>el!==element)
            return altArray
        }
    }

    console.log(userState)
    console.log(wordState)
    return(
        <div className={classes.main}>
            <TopBar gridArea='topbar' userState={userState} changeFunction={updateUserState} formFunction={showModal} players={operativesState.blueOperatives.length+operativesState.blueSpymasters.length+operativesState.redOperatives.length+operativesState.redSpyMasters.length}/>
            <Sidebar gridArea='leftcol' type='red' number={scoreState.red} operatives={operativesState.redOperatives} spymasters={operativesState.redSpyMasters}/>
            <div className={classes.rightcol}>
                <Sidebar type='blue' number={scoreState.blue} operatives={operativesState.blueOperatives} spymasters={operativesState.blueSpymasters}/>
                <Log messages={logState.messages}/>
            </div>
            <Modal show={modalState.show} backHandler={noModal}>
                    <FormElement type="text" value={userState.nickname} onChange={nameChangedHandler}/>
                    <button className={classes.operativeButton} onClick={becomeOperative}>Become Operative</button>
                    <button className={classes.spyMasterButton} onClick={becomeSpymaster}>Become Spymaster</button>
                    <button className={classes.switchTeamsButton} onClick={switchTeams}>Switch Teams</button>
            </Modal>
            <Centerpiece setImageState={updateImageState} imageState={imageState} serverState={serverState} botState={botState} changeBotState={changeBotState} gridArea='center' words={wordState.words} status={gameState.status} clue="bot" number="2" nextFunction={progressFunction} user={userState} logFunction={addLogMessage}/>
        </div>
    )
}

export default Main;


/*Status: {
    1:blue spymaster is giving clue,
    2:red spymaster is giving clue,
    3:blue team is guessing,
    4:red team is guessing,
    5:blue team has won,
    6:red team has won
}*/