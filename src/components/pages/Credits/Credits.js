import React, { Component } from 'react';
import './style.scss';
import { Query } from "react-apollo";
import { getCredits } from '../../../graphql/queries';

class Credits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            episode:'cjqwfe1kj1j2x0122tixfvb5i'
        };
    }

    displayDirectors = (data) => {
        console.log(data);
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
            voices.push(
                <li key={i.toString()}
                    className="thanks__person">
                    {data[i].name}
                </li>
            )
        }

        return voices
    }

    render() {
        return(
            <div className="Credits">
                {
                    this.state.episode?
                        (<Query query={getCredits} variables={{ id : this.state.episode }}>
                                {({ loading, error, data }) => {
                                    if (loading) return (<div>loader</div>);
                                    if (error) return `Error!: ${error}`;
                                    return (
                                        <div className="Credits__container">
                                            <div className="Credits__episode">
                                                <span className="Credits__episode__number">épisode #01</span>
                                                <h1 className="Credits__episode__title">{data.Episode.title}</h1>
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
                                                    <div className="thanks__voice">
                                                        <ul className="thanks__roles">
                                                            <li className="thanks__role">Inconnu</li>
                                                            <li className="thanks__role">Inconnu</li>
                                                            <li className="thanks__role">Inconnu</li>
                                                            <li className="thanks__role">Inconnu</li>
                                                            <li className="thanks__role">Inconnu</li>
                                                        </ul>
                                                        <ul className="thanks__persons">
                                                            {this.displayVoices(data.Episode.voices)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Credits__actions">
                                                <button className="Credits__action">Continuer</button>
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

export default Credits;