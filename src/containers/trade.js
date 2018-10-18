import React from 'react';

class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyORsell: '',
            searchfield: '',
            searchResult: '',
            results: [],
            shareCount: 0,
        };
  }

  onConfirmTrade = (transactionType) => {
      if(this.state.shareCount%1 !== 0){
        alert('ERROR: Shares purchased must be a whole number.')
      }else {
        fetch('https://rocky-everglades-18419.herokuapp.com/trade', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                transactionType: transactionType,
                symbol: this.state.results.symbol,
                shareCount: this.state.shareCount,
                costPerShare:this.state.results.latestPrice,
                cash: this.props.user.cash
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    if(user === 'Unable to purchase.'){
                        alert('Unable to purchase.');
                    } else if (user === 'Insufficient funds'){
                        alert('Sorry, not enough funds in your account for that purchase.')
                    } else if (user === 'Unable to sell.'){
                        alert('Unable to sell.')
                    } else if (user === 'Insufficient shares.'){
                        alert('Insufficient shares.')
                    }
                    else{ 
                        this.props.loadUser(user);
                        this.props.onRouteChange('portfolio');       
                    }
                }
            })
      }
    }

    onSearchChange = (event) => {
            if((event.target.value).length>0){
            this.setState({ searchfield: event.target.value});
            fetch(`https://api.iextrading.com/1.0/stock/${event.target.value}/batch?types=quote,news,chart&range=1m&last=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({results:data.quote, searchResult:`${data.quote.companyName} @ $${data.quote.latestPrice}`});
            })
            .catch(err=> {
                this.setState({searchfield: '', results:'', searchResult:'No stocks found for that symbol.'});
            })
        }

    }

    updateShareCount = (event) => {
        this.setState({shareCount: event.target.value});
    }

    render(){
        const { results, shareCount, searchResult} = this.state;
        return(
            <div className='flex flex-column pa5 tc br3 ba b--black-10 shadow-5 w-80 w-30-m mw8 center pt3 pb4'>
            <p className="f2 fw6 ph0 mh0">Trade</p>
                <div className='flex flex-row center'>
                    <label htmlFor='symbol' className="pa1 mt3 mr2" >Symbol: </label> 
                    <input id='symbol' type='search' className="mt3 pa1 ba w-40" onChange={this.onSearchChange}/>
                </div>
                {results.length !== 0 ? 
                <div>
                    <p className="f6 moon-gray">{searchResult}</p>
                </div>
                :
                <div>
                </div>
                }
                <div className='pt2 flex flex-row center'>
                    <label htmlFor='shares' className="pa1 mt3 mr2" >Shares: </label> 
                    <input id='shares' className="mt3 pa1 ba w-40" type="number" step="1" min='0'
                    onChange={this.updateShareCount}
                    />
                </div>
                {shareCount > 0 ? 
                    <div>
                        <p className="f6 moon-gray">Estimated Price: ${(results.latestPrice*shareCount).toFixed(2)}</p>
                    </div>
                :
                    <div>
                    </div>
                }
                <div className="flex flex-row tc center mt3 pt2">
                    <p className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-blue pointer mr3"
                    onClick={() => {if (window.confirm(`Are you sure you want to BUY ${shareCount} shares of ${results.companyName} @ $${results.latestPrice} per share for a total of $${(results.latestPrice*shareCount).toFixed(2)}?`)) this.onConfirmTrade('BUY')}}
                     >Buy</p>
                    <p className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-blue pointer ml3" 
                    onClick={() => {if (window.confirm(`Are you sure you want to SELL ${shareCount} shares of ${results.companyName} @ $${results.latestPrice} per share for a total of $${(results.latestPrice*shareCount).toFixed(2)}?`)) this.onConfirmTrade('SELL')}}
                    >Sell</p>
                </div>
            </div>
        )
    }
}
export default Trade;