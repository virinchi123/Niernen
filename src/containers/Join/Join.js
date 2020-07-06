import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './Join.module.css'

const Join = props =>{

    const [name,setName]=useState('')
    const [room, setRoom] = useState('')
    const [role,setRole]=useState('Operative')
    const[team,setTeam]=useState('Red')

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
            <Link to={`/game?name=${name}&room=${room}&team=${team}&role=${role}`}>
                <button type="button" className={[classes.button,classes.mt20].join(' ')}>Sign In</button>
            </Link>
        </div>
    )
}

export default Join;