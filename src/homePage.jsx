import React, { Component } from 'react';
import { Link } from "react-router-dom";



class Home extends Component {
    state = {}
     render() { 
        
        return ( 
            <React.Fragment>
                <div className="App">
                    <header className="App-header">
                    <h1 className="App-title">Birds Watching Application</h1>
                    <button><Link to="/form">Add New Observation</Link></button>
                    </header>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home