import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/Topbar/Topbar';
import classes from './Main.module.css';
import Centerpiece from '../Centerpiece/Centerpiece';

const Main = props=>{
    return(
        <div className={classes.main}>
            <TopBar gridArea='topbar'/>
            <Sidebar gridArea='leftcol' type='red' number='9'/>
            <Sidebar gridArea='rightcol' type='blue' number='8'/>
            <Centerpiece gridArea='center' status='1' clue="bot" number="2"/>
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