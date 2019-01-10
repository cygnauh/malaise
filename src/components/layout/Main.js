import './Main.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Query } from "react-apollo";
import { getEpisodes } from '../../graphql/queries';
import Catalogue from "../pages/Catalogue";
import Dictionnary from "../pages/Dictionnary";
import StartProcess from "../StartProcess";
import Hours from "../interactions/Hours";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

class Main extends Component {
    render() {
        return (

            <Query
                query={getEpisodes}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return (
                        <main className="Main">
                            <Switch>
                                <Route exact path="/" component={StartProcess} />
                                <Route path="/catalogue" render={(props) => <Catalogue {...props} episodes={data.allEpisodes} />} />
                                <Route path="/dictionnary" component={Dictionnary} />
                                <Route path="/hours" component={Hours} />
                            </Switch>
                        </main>
                    );
                }}
            </Query>
        )
    }
}

export default Main;