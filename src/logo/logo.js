import React from 'react';
import coins from './coins.png';
import Tilt from 'react-tilt'
import './logo.css';
const Logo = () => {
    return (
        <div className='mainguy ma3 pt0'>
            <Tilt className="Tilt shadow-2" options={{ max : 50 }} style={{ height: 125, width: 125 }} >
                <div className="Tilt-inner pt2"><img alt='logo' src={coins}></img></div>
            </Tilt>
        </div>
    );
}

export default Logo;