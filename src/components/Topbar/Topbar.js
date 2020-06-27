import React from 'react';
import playerIcon from '../../assets/icon_player.png';
import classes from './Topbar.module.css';

const Topbar = props=>{
    console.log(props.gridArea)
    return(
        <div className={classes.topbar} style={{gridArea:`${props.gridArea}`}}>
            <div className={classes.playerTracker}>
                <div className={classes.player}>
                    <p>Players</p>
                </div>
                <div className={classes.image}>
                    <img src={playerIcon} alt="player icon"/>
                </div>
                    <div className={classes.count}>
                        <p>2</p>
                    </div>
                </div>
                <div className={classes.rightTop}>
                    <div className={classes.resetButton}>
                        <p>Reset Game</p>
                    </div>
                    <div className={classes.profile}>
                        <p>Soc-Red Spymaster</p>
                    </div>
                </div>
            </div>
    )
}

export default Topbar;