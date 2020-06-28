import React,{useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/Topbar/Topbar';
import classes from './Main.module.css';
import Centerpiece from '../Centerpiece/Centerpiece';
import Log from '../Log/Log';
import Modal from '../../components/Modal/Modal';
import FormElement from '../../components/FormElement/FormElement';
import blueBG from '../../assets/bg-blue.jpg'
import redBG from '../../assets/bg-red.jpg'

const Main = props=>{

    const [userState,updateUserState]=useState({
        nickname:'virinchi',
        team:'Red',
        role:'Operative'
    })

    const [modalState,updateModalState]=useState({
        show:false
    })

    const [operativesState,updateOperativesState]=useState({
        blueOperatives:['bluePlayer1','bluePlayer2'],
        blueSpymasters:['blueSpymaster'],
        redOperatives:['virinchi','dummy2'],
        redSpyMasters:['redSpyMaster']
    })

    const [gameState,updateGameState]=useState({
        status:1
    })

    const [logState,updateLogState]=useState({
        messages :[['red', 'clue', 'masterDummy', 'SDF', '2'], ['red', 'tap', 'dummy1', 'board'], ['red', 'tap', 'dummy2', 'film']]
    })

    const addLogMessage=array=>{
        const dummyState={...logState};
        dummyState.messages.push(array);
        console.log(dummyState.messages)
        updateLogState({
            messages:dummyState.messages
        })
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
    }

    const progressFunction = props=>{
        console.log('progressing')
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
            dummyState.redOperatives=removeFromList(dummyState.redOperatives,userState.nickname);
            dummyState.redSpyMasters.push(userState.nickname)
            updateOperativesState(dummyState)
        }
        else{
            console.log('hi')
            dummyState.blueOperatives = removeFromList(dummyState.blueOperatives, userState.nickname);
            dummyState.blueSpymasters.push(userState.nickname)
            updateOperativesState(dummyState)
        }
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
    }

    const switchTeams=props=> {
        const team=userState.team;
        const dummyState={...userState}
        const opState={...operativesState}
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
            return array
        }
        else{
            const altArray=array.filter(el=>el!==element)
            return altArray
        }
    }

    console.log(userState)
    return(
        <div className={classes.main}>
            <TopBar gridArea='topbar' userState={userState} changeFunction={updateUserState} formFunction={showModal} players={operativesState.blueOperatives.length+operativesState.blueSpymasters.length+operativesState.redOperatives.length+operativesState.redSpyMasters.length}/>
            <Sidebar gridArea='leftcol' type='red' number='9' operatives={operativesState.redOperatives} spymasters={operativesState.redSpyMasters}/>
            <div className={classes.rightcol}>
                <Sidebar type='blue' number='8' operatives={operativesState.blueOperatives} spymasters={operativesState.blueSpymasters}/>
                <Log messages={logState.messages}/>
            </div>
            <Modal show={modalState.show} backHandler={noModal}>
                    <FormElement type="text" value={userState.nickname} onChange={nameChangedHandler}/>
                    <button className={classes.operativeButton} onClick={becomeOperative}>Become Operative</button>
                    <button className={classes.spyMasterButton} onClick={becomeSpymaster}>Become Spymaster</button>
                    <button className={classes.switchTeamsButton} onClick={switchTeams}>Switch Teams</button>
            </Modal>
            <Centerpiece gridArea='center' status={gameState.status} clue="bot" number="2" nextFunction={progressFunction} user={userState} logFunction={addLogMessage}/>
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