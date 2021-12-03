import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './WelcomePage/WelcomePage';


class App extends Component {

  state = {};

  componentDidMount() {
    setInterval(this.hello, 250);
  }

  hello = () => {
    fetch('/hello')
        .then(response => response.text())
        .then(message => {
          this.setState({message: message});
        });
  };

  render() {
    return (
        /*<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">{this.state.message}</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <img src={backgroundimage} style={{backgroundSize:'cover',width:'100%',height:'100%'}}/>
        */
        <WelcomePage />
    );
  }
}

export default App;
