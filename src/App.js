import './App.css';
import React, { Component } from 'react';
import Started from "./components/interactions/started";

class App extends Component {
    constructor(){
        super();
        this.state = {render:''}
    }
    render() {
        return (
            <main>
                <Started />
            </main>
        )
    }
}

export default App;
