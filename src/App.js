import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './components/homePage'
import Form from './components/form'

import './App.css';



class App extends Component {
  render() {
    return (

      <div className="container">      

       <Switch>
        <Route path="/form" component={Form} />
        <Route path="/birds-watching-app" exact component={HomePage} />
        
        
        
        
        
        </Switch>
       
      
        </div>
    );
  }
}

export default App;
