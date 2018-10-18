import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            holdings:[]
        }
    }
    componentDidMount() {
        fetch('https://rocky-everglades-18419.herokuapp.com/portfolio', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(list => {
                list.forEach((each,index)=>{
                    fetch(`https://api.iextrading.com/1.0/stock/${each.symbol}/batch?types=quote,news,chart&range=1m&last=1`)
                    .then(response => response.json())
                    .then(data => {
                        var newState = this.state.holdings.concat({
                            companyName: data.quote.companyName,
                            symbol: each.symbol,
                            shares: each.sum,
                            averageCostPerShare: parseFloat(each.avg),
                            currentCostPerShare: data.quote.latestPrice,
                            profit: data.quote.latestPrice - parseFloat(each.avg)
                        })
                        this.setState({holdings:newState});
                    })
                })
            })
    }
    
    render(){
        const filteredHoldings = this.state.holdings.filter(each => each.shares>0);
        var totalHoldings = 0;
        if(filteredHoldings.length){
            totalHoldings = parseFloat(filteredHoldings.reduce((acc,each)=> acc+((each.currentCostPerShare)*(each.shares)),0));
        }
        const remainingCash = (parseFloat(this.props.user.cash));
        return(
            <div className="pa1">
                <div className="center">
                    <table className="f6 w-100 mw8" cellSpacing="0">
                        <thead>
                            <tr>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Company</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Symbol</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Shares</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Average Cost Paid per Share</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Current Cost per Share</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Total Holding</th>
                            <th className="fw6 bb b--black-20  pb3 pr3 bg-white">Total Profit</th>
                            </tr>
                        </thead>
                        <tbody className="lh-copy">
                            {filteredHoldings.map((user,i) => {
                                return(
                                    <tr className="grow" key={i}>
                                        <td className="pv3 pr3 bb b--black-20">{filteredHoldings[i].companyName}</td>
                                        <td className="pv3 pr3 bb b--black-20">{filteredHoldings[i].symbol}</td>
                                        <td className="pv3 pr3 bb b--black-20">{filteredHoldings[i].shares}</td>
                                        <td className="pv3 pr3 bb b--black-20">${(filteredHoldings[i].averageCostPerShare).toFixed(2)}</td>
                                        <td className={"pv3 pr3 bb b--black-20 "+(filteredHoldings[i].profit >= 0 ? 'green' : 'red')}>
                                            ${(filteredHoldings[i].currentCostPerShare).toFixed(2)}
                                        </td>
                                        <td className="pv3 pr3 bb b--black-20">${((filteredHoldings[i].currentCostPerShare)*(filteredHoldings[i].shares)).toFixed(2)}</td>
                                        <td className={"pv3 pr3 bb b--black-20 "+(filteredHoldings[i].profit >= 0 ? 'green' : 'red')}>
                                            ${(filteredHoldings[i].profit*filteredHoldings[i].shares).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="grow">
                                <td className="pv3 pr3 bb b--black-20"><strong>Cash Remaining</strong></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"><strong>${remainingCash}</strong></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                            </tr>
                            <tr className="grow">
                                <td className="pv3 pr3 bb b--black-20"><strong>TOTAL ASSETS</strong></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"></td>
                                <td className="pv3 pr3 bb b--black-20"><strong>${(remainingCash+totalHoldings).toFixed(2)}</strong></td>
                                <td className={"pv3 pr3 bb b--black-20 "+((remainingCash+totalHoldings-10000)>=0 ? 'green' : 'red')}>${(remainingCash+totalHoldings-10000).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    

}
export default Portfolio;


/*
{this.state.holdings.map((user,i) => {
    return(
        <tr className="grow" key={i}>
            <td className="pv3 pr3 bb b--black-20">{this.state.holdings[i].companyName}</td>
            <td className="pv3 pr3 bb b--black-20">{this.state.holdings[i].symbol}</td>
            <td className="pv3 pr3 bb b--black-20">{this.state.holdings[i].shares}</td>
            <td className="pv3 pr3 bb b--black-20">{this.state.holdings[i].costPerShare}</td>
            <td className="pv3 pr3 bb b--black-20">{(this.state.holdings[i].costPerShare)*(this.state.holdings[i].shares)}</td>
        </tr>
    );
})}*/        