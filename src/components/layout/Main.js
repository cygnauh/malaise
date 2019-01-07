import './Main.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Catalogue from "../pages/Catalogue";
import Dictionnary from "../pages/Dictionnary";
import Homepage from "../pages/Homepage";

class Main extends React.Component {
    render() {
        return (
            <main className="Main">
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/catalogue" component={Catalogue} />
                    <Route path="/dictionnary" component={Dictionnary} />
                </Switch>

            </main>
        )
    }
}

export default Main;