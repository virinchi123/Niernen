import React from 'react';
import PlayerList from '../PlayerList/PlayerList';
import classes from './Sidebar.module.css';
import redImage from '../../assets/card-red-back-13.png';
import blueImage from '../../assets/card-blue-back-12.png';

const Sidebar=props=>{
    let imageCode=null;
    let profilerClass=classes.profiler
    let sidebarClass=classes.sidebar
    if(props.type==='red'){
        imageCode=<img src={redImage} alt="red"/>
        sidebarClass=[classes.sidebar,classes.red].join(' ')
    }
    else{
        imageCode = <img src={blueImage} alt="blue" />
        profilerClass=[classes.profiler,classes.reverse].join(' ')
        sidebarClass = [classes.sidebar, classes.blue].join(' ')
    }
    return(
        <div className={sidebarClass} style={{ gridArea: `${props.gridArea}` }}>
            <div className ={profilerClass}>
                {imageCode}
                <h1>{props.number}</h1>
            </div>
            <PlayerList type="Operatives" names={props.operatives}/>
            <PlayerList type="Spymasters" names={props.spymasters}/>
        </div>
    )
}

export default Sidebar