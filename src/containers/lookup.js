import React from 'react';
import SearchBox from '../components/searchBox';
import StockList from '../components/stockList';
import StockChart from '../components/stockChart';

class LookUp extends React.Component {
    constructor() {
        super();
        this.state = {
            searchField:'',
            results: []
        }
    }

    handleEnter=(e) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode === 13) {
            this.onLookup();
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value});
    }

    onLookup = () => {
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.searchField}/batch?types=quote,news,chart&range=1m&last=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({results:data});
                this.setState({ searchField: ''});
            })
            .catch(err=> this.setState({results:''}))
    }
    

    render(){
        const { results, searchField } = this.state;
        
        if(results.length !== 0){
            const chartLabels = results.chart.map(each => each.label);
            const chartData = results.chart.map(each => each.vwap);
            return(
                <div>
                    <p className="tc f2 fw6 ph0 mh0 pt0">Stock Lookup</p>
                    <div className="dib">
                        <SearchBox searchChange={this.onSearchChange} handleEnter={this.handleEnter} value={searchField} />
                        <input 
                            type="submit" 
                            onClick={this.onLookup}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            value="Lookup" />
                    </div>
                    <div className='flex center'>
                        <StockList className="w-30 w-10-ns" companies={results.quote}/>
                        <StockChart className="w-50 w-40-ns" chartLabels={chartLabels} chartData={chartData} />
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
                    <div className="dib">
                        <SearchBox searchChange={this.onSearchChange} handleEnter={this.handleEnter} value={searchField}/>
                        <input 
                            type="submit" 
                            onClick={this.onLookup}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            value="Lookup" />
                    </div>
                </div>
            )
        }
    }
}
export default LookUp;