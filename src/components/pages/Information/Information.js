import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';
import { Link } from 'react-router-dom';
import More from "../../SVG/More/More";
import Heart from "../../SVG/Heart/Heart";
import tasjoui from '../../../assets/img/tasjoui.jpg';
import tubandes from '../../../assets/img/tubandes.jpg';
import lescouillessurlatable from '../../../assets/img/lescouillessurlatable.jpg';
import arrowDownIcon from '../../../assets/icons/arrows/arrow_down.svg';
import plusIcon from '../../../assets/icons/plus.svg';

class Information extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Information">
                <div className="Information__container">
                    <section className="Information__firstScreen">
                        <div className="firstScreen__container">
                            <h1 className="firstScreen__title">malaise<br />autour de la sexualité<br /><span>être vierge au XXIe<br />siècle en France</span></h1>
                            <p className="firstScreen__description">Discussion courante de la pause du lycée au bureau, mais encore sujet phare des soirées , nous sommes tous passé par la question : « et toi tu l’as fais ? ». Passé un certain âge on considère même qu’il va de soit que tout le monde est passé le cap. Alors que les mouvements féministes ont largement contribué à faire évoluer les mentalités sur la sexualité des femmes, quand est-il pour les hommes ?</p>
                        </div>
                        <button className="firstScreen__action">
                            <img src={arrowDownIcon} alt="Flèche du bas" />
                        </button>
                    </section>
                    <section className="Information__dictionnary">
                        <div className="dictionnary__container">
                            <div className="dictionnary__column">
                                <div className="dictionnary__actions">
                                    <div className="dictionnary__illustration"></div>
                                    <button className="dictionnary__action">
                                        <More />
                                        Tous les mots de l'épisode</button>
                                </div>
                            </div>
                            <div className="dictionnary__column">
                                <div className="dictionnary__word">
                                    <h3 className="word__name">Puceau, nom masculin, familier</h3>
                                    <p className="word__description">Au sens propre, il s’agit d’un homme vierge.
                                        Au sens figuré, c’est un homme inexpérimenté, naïf ou novice.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<section className="Information__statistics">
                        <h2 className="statistics__title">Statistiques de l'épisode</h2>
                        <ul className="statistics__list">
                            <li className="statistics__answer">
                                <label className="answer__question">Tu bois quoi ?</label>
                                <div className="answer__diagram">
                                    <div className="answer__name">
                                        Vodka
                                        <span className="answer__rate">20%</span>
                                    </div>
                                    <div className="answer__name">
                                        Rhum
                                        <span className="answer__rate">10%</span>
                                    </div>
                                    <div className="answer__name">
                                        Bière
                                        <span className="answer__rate">60%</span>
                                    </div>
                                    <div className="answer__name">
                                        Jus de fruit
                                        <span className="answer__rate">10%</span>
                                    </div>
                                </div>
                            </li>
                            <li className="statistics__answer">
                                <label className="answer__question">"Pécho" c'est coucher</label>
                                <div className="answer__diagram">
                                    <div className="answer__name">
                                        Oui
                                        <span className="answer__rate">30%</span>
                                    </div>
                                    <div className="answer__name">
                                        Non
                                        <span className="answer__rate">70%</span>
                                    </div>
                                </div>
                            </li>
                            <li className="statistics__answer">
                                <label className="answer__question">Je n'ai jamais menti</label>
                                <div className="answer__diagram">
                                    <div className="answer__name">
                                        Oui
                                        <span className="answer__rate">10%</span>
                                    </div>
                                    <div className="answer__name">
                                        Non
                                        <span className="answer__rate">90%</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="statistics__action">Toutes les statistiques</button>
                    </section>*/}
                    <section className="Information__questionsExamples">
                        <ul className="questionsExamples__list">
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#1</span>
                                Je n'ai jamais cambriolé une maison
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#2</span>
                                Je n'ai jamais pris de bain de minuit
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#3</span>
                                Je n'ai jamais été aux USA
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#4</span>
                                Je n'ai jamais couché avec un collègue
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#5</span>
                                Je n'ai jamais espionné mes voisins
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#6</span>
                                Je n'ai jamais pris de drogue
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#7</span>
                                Je n'ai jamais fantasmé sur un prof
                            </li>
                            <li className="questionsExamples__answer">
                                <span className="answer__number">#1</span>
                                Je n'ai jamais été arrêté par les flics
                            </li>
                        </ul>
                    </section>
                    <section className="Information__diagram">
                        <div className="diagram__column">
                            <h2 className="diagram__title"><span>chiffres clés</span></h2>
                            <h3 className="diagram__subtitle">Age de la première fois en France</h3>
                            <div className="diagram__number">15 ans en 2018</div>
                        </div>
                        <div className="diagram__column">
                            <img className="diagram__illustration" src="" alt="Diagramme"/>
                            <p className="diagram__description">Au cours des années, l’écart d’âge de dépucelage entre les hommes et les femmes à fortement diminué. En 1939, les femmes perdaient leurs virginité à 22 ans,contre 18 ans pour les hommes. Aujourd’hui les statistiques sont de 17,6 pour les femmes et de 17,2 pour les hommes*. </p>
                            <button className="diagram__action">Toutes les statistiques</button>
                        </div>
                    </section>
                    <section className="Information__video">
                        <h2 className="video__title"><span>histoires</span></h2>
                        <div className="video__source"></div>
                        <button className="video__action">Plus de vidéos</button>
                    </section>
                    <section className="Information__anecdotes">
                        <h2 className="anecdotes__title"><span>anecdotes</span></h2>
                        <ul className="anecdotes__list">
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                            <li className="anecdotes__anecdote">
                                <div className="anecdote__top">
                                    <div className="anecdote__author">anonyme</div>
                                    <div className="anecdote__line"></div>
                                    <div className="anecdote__date">23/08/2018</div>
                                </div>
                                <p className="anecdote__story">
                                    In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                    Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                                </p>
                            </li>
                        </ul>
                        <button className="anecdotes__action">Partage ton anecote</button>
                    </section>
                    <section className="Information__toFollow">
                        <h2 className="toFollow__title"><span>comptes à suivre</span></h2>
                        <div className="toFollow__content">
                            <ul className="toFollow__list">
                                <li className="account">
                                    <Link to="https://www.instagram.com/tubandes/" target="_blank">
                                        <div className="account__illustration">
                                            <img src={tubandes} alt="Photo de profil"/>
                                        </div>
                                        <div className="account__like">
                                            <Heart />
                                        </div>
                                        <h3 className="account__name">@tubandes</h3>
                                    </Link>
                                </li>
                                <li className="account">
                                    <Link to="https://www.binge.audio/category/les-couilles-sur-la-table/" target="_blank">
                                        <div className="account__illustration">
                                            <img src={lescouillessurlatable} alt="Photo de profil"/>
                                        </div>
                                        <div className="account__like">
                                            <Heart />
                                        </div>
                                        <h3 className="account__name">Les couilles sur la table</h3>
                                    </Link>
                                </li>
                                <li className="account">
                                    <Link to="https://www.instagram.com/tasjoui/"  target="_blank">
                                        <div className="account__illustration">
                                            <img src={tasjoui} alt="Photo de profil"/>
                                        </div>
                                        <div className="account__like">
                                            <Heart />
                                        </div>
                                        <h3 className="account__name">@t'as joui</h3>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <button className="toFollow__action">Afficher plus</button>
                    </section>
                    <section className="Information__sources">
                        <h2 className="sources__title"><span>sources</span></h2>
                        <ul className="sources__list">
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                            <li className="sources__source">
                                <Link to="/" target="_blank"><h3 className="source__name">France culture</h3></Link>
                                <p className="source__description">Lorem ipsum dolor sit amet la vista baby u know. Vernesh gudli koil juik lop.</p>
                            </li>
                        </ul>
                    </section>
                    <section className="Information__footer">
                        <Link to="/">épisode suivant</Link>
                    </section>
                </div>
            </div>
        )
    }

}

export default Information;