import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodesAndPlaceSounds } from '../../../graphql/queries'
import { UserContext } from "../../../store/UserProvider";
import { SoundContext } from "../../../store/SoundProvider";
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
    onContinueClicked (callbackSetEpisode, params, callbackSetSounds, registerPlaceSound) {
        // for real project --> replace params.allEpisodes[0] by params.allEpisodes[params.allEpisodes.length-1]
        let placeSound = params.allSounds.find(setting => setting.name === params.allEpisodes[0].place)
        callbackSetEpisode(params.allEpisodes[0]);
        callbackSetSounds(params.allEpisodes[0].sounds[0].url, params.allEpisodes[0].interactions);
        // registerPlaceSound(placeSound)
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
                    return (
                        <div className="episodeSelection">
                            <UserContext.Consumer>
                                {({episode, setEpisode}) => (
                                    <SoundContext.Consumer>
                                        {({setEpisodeSounds, registerPlaceSound}) => (
                                            <div>
                                                <div className="episodeSelection__container">
                                                    <div className="episodeSelection__result">
                                                        <div className="episodeSelection__episode">
                                                            <div className="episode__content">
                                                                <h2 className="episode__title">{data.allEpisodes[0].title}</h2>
                                                                <p className="episode__summary">{data.allEpisodes[0].summary}</p>
                                                                {/*<button className="episode__btn" onClick={}>Continuer</button>*/}
                                                                <button className="episode__btn"
                                                                        onClick={ ()=>{this.onContinueClicked(setEpisode, data, setEpisodeSounds, registerPlaceSound)}}>
                                                                    Continuer
                                                                </button>
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