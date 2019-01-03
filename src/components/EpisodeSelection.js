import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import { getEpisodes } from '../graphql/queries'
import EpisodeForm from "./EpisodeForm";
import Catalogue from "./Catalogue";
import { withUser,UserContext } from "../store/UserProvider";

// episode selection either select thank to the form, or thank to the catalog

// 1) Fetch data : can user <Query> or <ApolloConsumer>
// 2) Send Data to the <EpisodeForm/>
// 3) Send Data to the <Catalag/>, to display every episode

// TODO: formulaire et catalogue, avant ou à la fin du formulaire
class EpisodeSelection extends Component {
    constructor() {
        super();
        this.state = {
           render:''
        };
    }
    render () {
        return(
            <Query
                query={getEpisodes}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return (
                        <div>
                            {/*<UserContext.Consumer>*/}
                                {/*{(value) => <div>*/}
                                    {/*<h1>Hello {value.episode}!</h1>*/}
                                    {/*<input type="text" value={value.episode} onChange={e => value.setEpisode(e.target.value)} />*/}
                                {/*</div>*/}
                                {/*}*/}
                            {/*</UserContext.Consumer>*/}
                            <EpisodeForm episodes={data.allEpisodes}/>
                            <Catalogue episodes={data.allEpisodes}/>
                            {/*<button onClick={() => refetch()}>Refetch!</button>*/}
                            {/*{*/}
                                {/*withUser(({ episode, setEpisode }) => (*/}
                                    {/*<Fragment>*/}
                                        {/*<h1>Hello {episode}!</h1>*/}
                                        {/*<input type="text" value={episode} onChange={e => setEpisode(e.target.value)} />*/}
                                    {/*</Fragment>*/}
                                {/*))*/}
                            {/*}*/}
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default EpisodeSelection;

