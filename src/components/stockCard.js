import React from 'react';

const stockCard = ({companyName,symbol,sector,latestPrice,changePercent}) => {
    return(
        <div className="bg-washed-blue shadow-5 tc grow dib pa3 ma2 br3">
            <h3>{companyName}</h3>
            <p>Symbol: {symbol} </p>
            <p>Sector: {sector}</p>
            <p>Latest Price: <strong>${latestPrice}</strong></p>
            <p className={changePercent<0 ? 'red' : 'green' }>Change: {changePercent}%</p>
        </div>
    );
}

export default stockCard;