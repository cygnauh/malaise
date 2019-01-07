import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodes } from '../graphql/queries'
import EpisodeForm from "./EpisodeForm";

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
                            <EpisodeForm episodes={data.allEpisodes}/>
                            {/*<Catalogue episodes={data.allEpisodes}/>*/}
                            {/*<button onClick={() => refetch()}>Refetch!</button>*/}
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default EpisodeSelection;

