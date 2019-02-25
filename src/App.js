import React, { Component } from 'react';
import Observations from './components/observations';
import Form from './components/form'
import NotFound from './components/notFound'
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './navBar';
//import './App.css';



class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <main className="container">
        <switch>
          <Route path='/observations' component={Observations} />
          <Route path='/form' component={Form} />
          <Route path='/notFound' component={NotFound} />

          <Redirect from='/' exact to='/observations' />
        </switch>
      </main>
      </div>
    );
  }
}

export default App;
