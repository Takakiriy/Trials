import React from 'react';
import logo from './logo.svg';
import './App.css';
import axiosBase from 'axios';

class  App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>
            <input type="button" onClick={this.handleButton.bind(this)} value="HTTP GET"/><br/>
            {this.state.html}
          </p>
        </header>
      </div>
    );
  }

  constructor() {
     super();
     this.state = {html: ""};
     this.axios = axiosBase.create({
       baseURL: '__BaseURL__',
       headers: {
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       },
       responseType: 'json'  
     });
   }

  handleButton() {
    this.axios.get('/__RelativeURL__')
    .then( (response) => {
      console.log(response);
      this.setState({html: response.data});
    })
    .catch( (err) => {
      console.log(err);
      this.setState({html: "Error"});
    })
  }
}

export default App;
