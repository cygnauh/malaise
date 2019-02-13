import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisodesAndPlaceSounds } from '../../../graphql/queries'
import { UserContext } from "../../../store/UserProvider";
import { SoundContext } from "../../../store/SoundProvider";
import "./style.scss";
import { Link } from 'react-router-dom';
import Loader from '../../elements/Loader/Loader'
import ErrorScreen from '../../elements/ErrorScreen/ErrorScreen'
import Lottie from 'react-lottie';
import serpentin from '../../../assets/animation/text_1_2_episode3.json';

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
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: serpentin,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
    }
    onContinueClicked (callbackSetEpisode, params, callbackSetSounds, registerPlaceSound) {
        // for real project --> replace params.allEpisodes[0] by params.allEpisodes[params.allEpisodes.length-1]
        let placeSound = params.allSounds.find(setting => setting.name === params.allEpisodes[0].place);
        callbackSetEpisode(params.allEpisodes[0]);
        let episodeSound = callbackSetSounds(params.allEpisodes[0].sounds[0].url, params.allEpisodes[0].interactions);

        registerPlaceSound(placeSound) // TODO uncomment
        // episodeSound.once('load', ()=>{
        //     console.log('episode sound is loaded')
            this.props.onButtonPressed();
        // });

    }
    render () {
        return(
            <Query
                query={getEpisodesAndPlaceSounds}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return (<Loader/>);
                    if (error) return (<ErrorScreen/>);
                    return (
                        <div className="EpisodeSelection">
                            <UserContext.Consumer>
                                {({episode, setEpisode}) => (
                                    <SoundContext.Consumer>
                                        {({setEpisodeSounds, registerPlaceSound}) => (
                                            <div className="EpisodeSelection__container">
                                                <div className="EpisodeSelection__background">
                                                    <Lottie options={this.defaultOptions} />
                                                </div>
                                                <div className="EpisodeSelection__content">
                                                    <div className="EpisodeSelection__episode episode">
                                                        <div className="episode__top">
                                                            <div className="episode__number">03</div>
                                                            <div className="episode__line"></div>
                                                            <div className="episode__date">{ (new Date(data.allEpisodes[0].createdAt)).toLocaleDateString() }</div>
                                                        </div>
                                                        <h2 className="episode__title">
                                                            {data.allEpisodes[0].title}
                                                        </h2>
                                                        <p className="episode__description">{data.allEpisodes[0].summary}</p>
                                                        <div className="episode__actions">
                                                            <button className="episode__cta"
                                                                    onClick={ ()=>{this.onContinueClicked(setEpisode, data, setEpisodeSounds, registerPlaceSound)}}>
                                                                Continuer
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <Link className="EpisodeSelection__choice" to="/catalogue">ou choisir un autre épisode</Link>
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