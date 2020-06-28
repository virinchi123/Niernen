import React, { useEffect, useRef, useState } from 'react';
// Styling
import Styles from './styles.module.css';

const Tooltip = ({ title, position, children }) => {
    const node = useRef();
    const [isVisible, setState] = useState(false);
    const handleClick = ({ target }) => {
        if (node.current.contains(target)) {
            // inside click
            return;
        }
        // outside click
        setState(false);
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div className={Styles.container}
            data-testid="tooltip"
            ref={node}
            onClick={() => setState(!isVisible)}
        >
            <div data-testid="tooltip-placeholder">{children}</div>
            {isVisible && (
                <div
                    className={[Styles.tooltipContent, Styles[position]].join(' ')}
                    data-testid="tooltip-content"
                >
                    <span className={Styles.arrow}></span>
                    {title}
                </div>
            )}
        </div>
    );
};

Tooltip.defaultProps = {
    position: 'right',
};

export default Tooltip;