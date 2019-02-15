import React, { Component } from 'react';
import './style.scss';
import { Query } from "react-apollo";
import { getCredits } from '../../../graphql/queries';
import Loader from '../../elements/Loader/Loader'
import ErrorScreen from '../../elements/ErrorScreen/ErrorScreen'
import Lottie from 'react-lottie';
import lottieCredit from '../../../assets/animation/text_3_7_ending.json';
import {UserContext} from '../../../store/UserProvider';
import {SoundContext} from '../../../store/SoundProvider';


class Credits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            episode:'cjqwfe1kj1j2x0122tixfvb5i'
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: lottieCredit,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
    }

    componentDidMount() {
        this.names = this.context.personalizations;
        console.log('context', this.context);
    }

    displayDirectors = (data) => {
        let directors = [];

        for(let i = 0; i < data.length; i++) {
            directors.push(
                <li key={i.toString()}
                    className="thanks__person">
                    {data[i].name}
                </li>
            )
        }

        return directors
    }

    displayVoices = (data) => {
        let voices = [];

        for(let i = 0; i < data.length; i++) {
            if(this.names) {
                for(let j = 0; j < this.names.length; j++) {
                    if(data[i].role === this.names[j].role) {
                        voices.push(
                            <li key={i.toString()}
                                className="voices__voice">
                                <span className="voices__voice__name">{this.names[j].name}</span>
                                <span className="voices__voice__actor">{data[i].name}</span>
                            </li>
                        )
                    }
                }
            }
        }

        return voices
    }
    // displayMusicName = (value) =>{
    //     console.log(value)
    //     return (<div>{value}</div>)
    // }

    render() {
        return(
            <div className="Credits">
                <div className="Credits__background">
                    <Lottie options={this.defaultOptions} />
                </div>
                {
                    this.state.episode?
                        (<Query query={getCredits} variables={{ id : this.state.episode }}>
                                {({ loading, error, data }) => {
                                    if (loading) return (<Loader/>);
                                    if (error) return (<ErrorScreen/>);
                                    return (
                                        <div className="Credits__container">
                                            <div className="Credits__episode">
                                                <span className="Credits__episode__number">épisode #03</span>
                                                <h1 className="Credits__episode__title">{data.Episode.slug}</h1>
                                            </div>
                                            <p className="Credits__particularThanks">
                                                {data.Episode.thanks}
                                            </p>
                                            <div className="Credits__thanks">
                                                <div className="thanks">
                                                    <h2 className="thanks__title">Ecrit et réalisé par :</h2>
                                                    <ul className="thanks__list">
                                                        {this.displayDirectors(data.Episode.directors)}
                                                    </ul>
                                                </div>
                                                <div className="thanks">
                                                    <h2 className="thanks__title">avec les voix de :</h2>
                                                    <div className="thanks__voices">
                                                        <ul className="voices__list">
                                                            {this.displayVoices(data.Episode.voices)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<div className="Credits__music">*/}
                                                {/*<SoundContext.Consumer>*/}
                                                    {/*{({musicSelected}) => (*/}
                                                        {/*<div className="form__column">*/}
                                                            {/*{musicSelected ? this.displayMusicName(musicSelected) : <div/>}*/}
                                                        {/*</div>*/}
                                                    {/*)}*/}
                                                {/*</SoundContext.Consumer>*/}
                                            {/*</div>*/}
                                            <div className="Credits__actions">
                                                <button className="Credits__action" onClick={this.props.info}>Continuer</button>
                                            </div>
                                        </div>
                                    );
                                }}
                            </Query>
                        ):null
                }
            </div>
        )
    }

}

Credits.contextType = UserContext;
export default Credits;