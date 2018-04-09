import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/Headers.js'
import Home from './containers/home/Home';
import ListProduk from './containers/listProduk/ListProduk';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div>
        <Header/>
            <div>
              <Route exact path="/home" component={Home}/>
              <Route path="/kategori/:id" render={({match}) => 
                <ListProduk 
                  url={match.url}
                  idSeason={match.params.id}
                />
              }/>
              {/* <Home/> */}
              {/* <Route path = "/home" render = {() => <Main season={this.state.kategori}/>}/> */}
            </div>  
        </div>
      </div>
    );
  }
}

export default App;
