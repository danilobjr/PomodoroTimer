import * as React from 'react';
import { Icon } from './Icon';
import { iconStyles } from './styles';

const styles = Object.assign({}, 
    { crispEdges: iconStyles.crispEdges },
    {
        insideCircle: {
            strokeDasharray: 21
        },
        watchButton: {
            transformOrigin: 'bottom',
            transform: 'rotateZ(45deg)'
        }
    }
);

export const IconStopwatch = (props) => 
    <Icon {...props} name="stopwatch" width={14} height={16}>
        <g fill="none">
            <line x1="4.5" y1="0.5" x2="9.5" y2="0.5" />
            <line x1="7" y1="0" x2="7" y2="2" />
            <circle cx="7" cy="9" r="6.5" />
            <g style={styles.crispEdges}>
                <line x1="7" y1="4.1" x2="7" y2="9" />
                <line x1="6.5" y1="9" x2="10" y2="9" />
            </g>
            <line x1="11" y1="1.5" x2="11" y2="4.5" style={styles.watchButton}></line>
        </g>
    </Icon>