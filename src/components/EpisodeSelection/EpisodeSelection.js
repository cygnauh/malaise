import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodesAndPlaceSounds } from '../../graphql/queries'
// import EpisodeForm from "../EpisodeForm";
import { UserContext } from "../../store/UserProvider";
import { SoundContext } from "../../store/SoundProvider";
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
    onContinueClicked (callbackSetEpisode, params, callbackSetSounds) {
        callbackSetEpisode(params);
        callbackSetSounds(params.sounds[0].url, params.interactions);
        this.props.onButtonPressed()
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
                    console.log(data)
                    return (
                        <div className="episodeSelection">
                            {/*{!this.context.episode?*/}
                                {/*<EpisodeForm episodes={data}/>*/}
                                {/*:*/}
                            <UserContext.Consumer>
                                {({episode, setEpisode}) => (
                                    <SoundContext.Consumer>
                                        {({setEpisodeSounds}) => (
                                            <div>
                                                <div className="episodeSelection__container">
                                                    <div className="episodeSelection__result">
                                                        <div className="episodeSelection__episode">
                                                            <div className="episode__content">
                                                                <h2 className="episode__title">{data.allEpisodes[0].title}</h2>
                                                                <p className="episode__summary">{data.allEpisodes[0].summary}</p>
                                                                {/*<button className="episode__btn" onClick={}>Continuer</button>*/}
                                                                <button className="episode__btn" onClick={()=>{this.onContinueClicked(setEpisode, data.allEpisodes[0], setEpisodeSounds)}}>Continuer</button>
                                                            </div>
                                                        </div>
                                                        {data.allEpisodes.length !== 0 ?
                                                            <div className="episodeSelection__choice">
                                                                - si l'épisode ne te convient pas, jette un coup d'oeil au <a href="/catalogue">catalogue</a> -
                                                            </div>
                                                        : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </SoundContext.Consumer>
                                )}
                            </UserContext.Consumer>
                            {/*}*/}
                        </div>
                    );
                }}
            </Query>
        )
    }
}
EpisodeSelection.contextType = UserContext;
export default EpisodeSelection;

