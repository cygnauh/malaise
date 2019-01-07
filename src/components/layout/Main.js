import './Main.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Catalogue from "../pages/Catalogue";
import Dictionnary from "../pages/Dictionnary";
import StartProcess from "../StartProcess";

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Switch>
                    <Route exact path="/" component={StartProcess} />
                    <Route path="/catalogue" component={Catalogue} />
                    <Route path="/dictionnary" component={Dictionnary} />
                </Switch>

            </main>
        )
    }
}

export default Main;