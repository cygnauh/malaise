import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodesAndPlaceSounds } from '../../graphql/queries'
import EpisodeForm from "../EpisodeForm";
import { UserContext } from "../../store/UserProvider";
import "./style.scss";

// episode selection either select thank to the form, or thank to the catalog

// 1) Fetch data : can user <Query> or <ApolloConsumer>
// 2) Send Data to the <EpisodeForm/>
// 3) Send Data to the <Catalag/>, to display every episode

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
                        <div className="episodeSelection">
                            {!this.context.episode?
                            <EpisodeForm episodes={data}/>
                                :
                                <div className="episodeSelection__container">
                                    <div className="episodeSelection__result">
                                        <h1 className="episodeSelection__intro">Tu vas vivre l'épisode...</h1>
                                        <div className="episodeSelection__episode">
                                            <div className="episode__content">
                                                <h2 className="episode__title">{this.context.episode.title}</h2>
                                                <p className="episode__summary">{this.context.episode.summary}</p>
                                                <a href="/experience"><button className="episode__btn">Continuer</button></a>
                                            </div>
                                        </div>
                                        <div className="episodeSelection__choice">
                                            - si l'épisode ne te convient pas, jette un coup d'oeil au <a href="/catalogue">catalogue</a> -
                                        </div>
                                    </div>
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

