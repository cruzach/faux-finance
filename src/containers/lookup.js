import React from 'react';
import SearchBox from '../components/searchBox';
import StockList from '../components/stockList';
import StockChart from '../components/stockChart';

class LookUp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: []
        }
    }
    onSearchChange = (event) => {
        if(event.key === 'Enter'){
            fetch(`https://api.iextrading.com/1.0/stock/${event.target.value}/batch?types=quote,news,chart&range=1m&last=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({results:data});
                console.log(this.state.results.news[0])
            })
            .catch(err=> this.setState({results:''}))
            event.target.value = '';
            }

        }
    

    render(){
        const { results } = this.state;
        
    if(results.length !== 0){
        const chartLabels = results.chart.map(each => each.label);
        const chartData = results.chart.map(each => each.vwap);
        return(
        <div>
            <p className="tc f2 fw6 ph0 mh0">Stock Lookup</p>
           <SearchBox searchChange={this.onSearchChange}/>
           <div className='flex center'>
           <StockList companies={results.quote}/>
           <StockChart chartLabels={chartLabels} chartData={chartData} />
           </div>
           <div>
               <p><strong>Related Recent News: </strong><a href={results.news[0].url}>{results.news[0].headline}</a></p>
           </div>
        </div>
        )
    }
    else{
        return(
        <div>
            <p className="tc f2 fw6 ph0 mh0">Stock Lookup</p>
            <SearchBox searchChange={this.onSearchChange}/>
        </div>
        )
    }
    
        

    
    }
    

}
export default LookUp;