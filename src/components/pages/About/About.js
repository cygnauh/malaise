import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';


class About extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="About">
                <div className="About__grid">
                    <div className="About__grid--full About__title"><h1>malaise</h1></div>
                    <div className="About__grid--full About__description">
                        <h2 className="About__description__title">Vous aussi vous avez connu ce sentiment de malaise ?</h2>
                        <p className="About__description__content">Que ce soit avec vos amis, vos collègues, votre famille, en soirée ou dans la rue ? Rappelez vous, quand vous vouliez parler d’un sujet mais que vous cherchiez comment l’aborder, ou que vous avez blesser involontairement votre interlocuteur à cause d’une mal formulation. Malaise. est là pour vous informer et vous faire prendre conscience de l’importance des mots et de leurs significations dans une discussion.Pour faire simple, Malaise. est une plateforme d’expériences narratives qui se découpent en différents épisodes tournant autour de thématiques variés. L’utilisateur est amené dans chacun de ses épisodes à participer, en interagissant avec l’histoire. </p>
                    </div>
                    <div className="About__team">
                        <h2 className="team__title">la team</h2>
                        <div className="team__presentation">
                            <div className="team__description">Lorem ipsum dolor sit amet andef mplode heur ikol pulio lorem doso. Mplode heur ikol puli. </div>
                            <div className="team__logo"></div>
                        </div>
                        <div className="team__worker">
                            <div className="worker">
                                <h3 className="worker__name">Noémie Eyoum</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Christine Huang</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Github</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Justine Lenouvel</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Circé Grand</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Github</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Clara Vigourous</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="About__footer">aller aux épisodes</div>
                </div>
            </div>
        )
    }
}

export default About;
