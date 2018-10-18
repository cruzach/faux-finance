import React from 'react';
import StockCard from './stockCard.js';

const StockList = ({ companies }) => {
    return(
        <div>
            <StockCard
                key={1} 
                companyName={companies.companyName}
                symbol={companies.symbol} 
                sector={companies.sector}
                latestPrice={companies.latestPrice} 
                changePercent={companies.changePercent} 
            />  
        </div>
    );
}

export default StockList;