import './style.scss';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Query } from "react-apollo";
import { getEpisodes } from '../../../graphql/queries';
import Catalogue from "../../pages/Catalogue/Catalogue";
import Dictionnary from "../../pages/Dictionnary/Dictionnary";
import StartProcess from "../../StartProcess";
import Hours from "../../interactions/Hours/Hours";
import Glass from "../../elements/Glass/Glass";
import Personalization from "../../Personalization";
import Episode from "../../Episode";
import MusicChoice from "../../interactions/MusicChoice/MusicChoice";
import DragDrop from "../../elements/DragDrop/DragDrop";
import Selection from "../../EpisodeSelection/EpisodeSelection";

/*const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};*/

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
                                <Route path="/presentation" component={Personalization} />
                                <Route path="/experience" component={Episode} />
                                <Route path="/selection" component={Selection} />
                                <Route path="/test" component={Glass} />
                                <Route path="/music" component={MusicChoice} />
                                <Route path="/drag-drop" component={DragDrop} />

                            </Switch>
                        </main>
                    );
                }}
            </Query>
        )
    }
}

export default Main;