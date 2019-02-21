import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Home extends Component {
    state = {}
    render() {

        return (
            <div className="bg">
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Birds Watching <br />Application</h1>
                        <button className='button'><Link to="/form">Add New Observation</Link></button>
                    </header>
                    <div className='container'>



                    </div>

                </div>
            </div>
        );
    }
}

export default Home