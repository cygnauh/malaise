import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodesAndPlaceSounds } from '../graphql/queries'
import EpisodeForm from "./EpisodeForm";
import { UserContext } from "../store/UserProvider";
// import Personalization from "./Personalization";

// episode selection either select thank to the form, or thank to the catalog

// 1) Fetch data : can user <Query> or <ApolloConsumer>
// 2) Send Data to the <EpisodeForm/>
// 3) Send Data to the <Catalag/>, to display every episode

// TODO: formulaire et catalogue, avant ou à la fin du formulaire
class EpisodeSelection extends Component {
    constructor() {
        super();
        this.state = {
            render:'',
            episode:''
        };
    }
    componentWillMount(){
        console.log(this.context);
        console.log("hello")
    }

    render () {
        return(
            <Query
                query={getEpisodesAndPlaceSounds}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;

                    return (
                        <div>
                            {!this.context.episode?
                            <EpisodeForm episodes={data}/>
                                :
                                <div>
                                    <h2>the episode selected is {this.context.episode.title}</h2>
                                    <button>OK</button>
                                    <p>or choose another in the <button>Catalog</button></p>
                                </div>
                            }

                        </div>
                    );
                }}
            </Query>
        )
    }
}
EpisodeSelection.contextType = UserContext;
export default EpisodeSelection;

