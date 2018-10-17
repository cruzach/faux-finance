import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Signin from './containers/signin';
import Register from './containers/register';
import Logo from './logo/logo.js';
import GettingStarted from './components/gettingStarted.js';
import Trade from './containers/trade';
import Lookup from './containers/lookup';
import Portfolio from './components/portfolio';

const initialState = {
      route: '',
      page: 'home',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        cash: 0,
        joined: ''
      }
    }

class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        cash: data.totalcash,
    }});
  }

  onRouteChange = (page, route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: true, page: page});
    } else if(route === 'signout'){
      this.setState({isSignedIn: false, page: page});
    } else {
      this.setState({isSignedIn: this.state.isSignedIn, page: page});
    }
  }

  render() {
    const { isSignedIn, page, user } = this.state;
    if(isSignedIn === false){
      switch(page){
              case 'home':
                return(
                  <div className="App">
                  <Navbar isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                  <GettingStarted />
                  </div>
                );
              case 'signin':
                return(
                <div className="App">
                  <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>
                );
              case 'register':
                return(
                <div className="App">
                  <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>);
              default:
                  return(<p>loading...</p>);
      }
    } else {
      switch(page){
                case 'portfolio':
                  return(
                  <div className="App">
                  <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                  <Portfolio user={user}/>
                  </div>);
                case 'lookup':
                  return(
                  <div className="App">
                  <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                  <Lookup />
                  </div>);
                case 'trade':
                  return(
                  <div className="App">
                  <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                  <Logo />
                  <Trade user={user} onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                  </div>);
                default:
                  return(<p>loading...</p>);
      }
    }
  }
}

export default App;
