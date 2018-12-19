import React, { Component } from 'react';
import { Query } from "react-apollo";
import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";
import { getEpisodes } from '../graphql/queries'
import ApolloBoost from "apollo-boost/lib/index";
import EpisodeForm from "./EpisodeForm";

// episode selection either select thank to the form, or thank to the catalog

// 1) Fetch data : can user <Query> or <ApolloConsumer>
// 2) Send Data to the <EpisodeForm/>
// 3) Send Data to the <Catalag/>, to display every episode

// const NumbersWithData = () => (
//     <Query query={getEpisodes} notifyOnNetworkStatusChange>
//         {({ loading, error, data, refetch, networkStatus }) => {
//             if (networkStatus === 4) return "Refetching!";
//             if (loading) return null;
//             if (error) return `Error!: ${error}`;
//
//             return (
//                 // maybe call the principal component who need our data
//
//                 //example
//                 <Episode dogs={data.dogs} />
//             );
//         }}
//     </Query>);

// TODO: formulaire et catalogue, avant ou à la fin du formulaire
class EpisodeSelection extends Component {
    constructor() {
        super();
        this.state = {
           render:''
        };
    }
    onDogFetched = dog => (this.setState(() => ({ dog })), console.log(dog));
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
                            {/*<button onClick={() => refetch()}>Refetch!</button>*/}
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default EpisodeSelection;

