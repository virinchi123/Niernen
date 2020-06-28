import React from 'react';
import classes from './Tooltip.module.css'

const Tooltip =props=>{
    let tooltipClass=[classes.tooltip,classes.bottom].join(' ');
    return(
        <div className={tooltipClass}>
            <div className={classes.tooltipArrow} />
            <div class={classes.tooltipLabel}>Tooltip Component</div>
        </div>
    )
}

export default Tooltip;