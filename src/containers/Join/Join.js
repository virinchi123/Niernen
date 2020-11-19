import React,{useState,useEffect} from 'react';
import classes from './Join.module.css';
import { useLocation,useHistory } from 'react-router-dom'

const Join = props =>{

    console.log(props)

    const [name,setName]=useState('')
    const [room, setRoom] = useState('')
    const [role,setRole]=useState('Operative')
    const[team,setTeam]=useState('Red')
    const location=useLocation();
    
    useEffect(()=>{
        console.log('here')
        console.log(location)
        if(!location.pathname.startsWith('/game')){
            props.setInGame(false)
        }
    },[props])
    const history=useHistory()
    const signIn=()=>{
        props.setInGame(true);
        history.push(`/game?name=${name}&room=${room}&team=${team}&role=${role}`);
    }

    return(
        <div className={classes.joinOuterContainer}>
            <div className={classes.joinInnerContainer}>
                <h1 className={classes.heading}>Join</h1>
                <input placeholder="Name" className={classes.joinInput} type="text" onChange={(event)=>setName(event.target.value)}/>
                <input placeholder="Room" className={[classes.joinInput,classes.mt20].join(' ')} type="text" onChange={(event)=>setRoom(event.target.value)} />
                <label className={classes.mt20} style={{ color: 'white' }}>Choose a role: </label>

                <select name="role" onChange={(event) => setRole(event.target.value)}>
                    <option value="Operative" onClick={() => setRole('Operative')}>Operative</option>
                    <option value="Spymaster" onClick={() => setRole('Spymaster')}>Spymaster</option>
                </select>
                <br/>

                <label style={{ color: 'white' }}>Choose a team: </label>

                <select name="team" onChange={(event) => setTeam(event.target.value)}>
                    <option value="Red" onClick={()=>setTeam('Red')}>Red</option>
                    <option value="Blue" onClick={() => setTeam('Blue')}>Blue</option>
                </select>
            </div>
                <button type="button" className={[classes.button,classes.mt20].join(' ')} onClick={signIn}>Sign In</button>
        </div>
    )
}

export default Join;