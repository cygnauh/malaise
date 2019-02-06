import React, { Component } from 'react';
import './style.scss';
import { Query } from "react-apollo";
import { getCredits } from '../../../graphql/queries';

class Credits extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Query
                query={getCredits}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    return (
                        <div className="Credits">
                            <div className="Credits__container">
                                <div className="Credits__episode">
                                    <span className="Credits__episode__number">épisode #01</span>
                                    <h1 className="Credits__episode__title">« puceau »</h1>
                                </div>
                                <p className="Credits__particularThanks">
                                    Un grand merci à Adrien Melchior pour l’enregistrement, le mixage et le générique
                                    et à Rachel Muniz d’avoir prêté sa voix pour la narration.
                                </p>
                                <div className="Credits__thanks">
                                    <div className="thanks">
                                        <h2 className="thanks__title">Ecrit et réalisé par :</h2>
                                        <ul className="thanks__list">
                                            <li className="thanks__person">Noémie Eyoum</li>
                                            <li className="thanks__person">Noémie Eyoum</li>
                                            <li className="thanks__person">Noémie Eyoum</li>
                                            <li className="thanks__person">Noémie Eyoum</li>
                                            <li className="thanks__person">Noémie Eyoum</li>
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
                                                <li className="thanks__person">Noémie Eyoum</li>
                                                <li className="thanks__person">Noémie Eyoum</li>
                                                <li className="thanks__person">Noémie Eyoum</li>
                                                <li className="thanks__person">Noémie Eyoum</li>
                                                <li className="thanks__person">Noémie Eyoum</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="Credits__actions">
                                    <button className="Credits__action">Continuer</button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }

}

export default Credits;