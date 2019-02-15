import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import More from "../../SVG/More/More";
import Less from "../../SVG/Less/Less";
import Heart from "../../SVG/Heart/Heart";
import graphic from '../../../assets/img/virginity_graphic.svg';
import tasjoui from '../../../assets/img/tasjoui.jpg';
import tubandes from '../../../assets/img/tubandes.jpg';
import lescouillessurlatable from '../../../assets/img/lescouillessurlatable.jpg';
import arrowDownIcon from '../../../assets/icons/arrows/arrow_down.svg';
import statPecho from '../../../assets/img/stat_pecho.svg';
import statDrink from '../../../assets/img/stat_drink.svg';
import statLiar from '../../../assets/img/stat_liar.svg';
import serpentin from '../../../assets/img/serpentin_game.svg';
import arrowUpIcon from '../../../assets/icons/arrows/arrow_up.svg';
import Header from "../../layout/Header/Header";
import DictionnaryAlert from "../../elements/DictionnaryAlert/DictionnaryAlert";
import { Query } from "react-apollo";
import { getEpisode } from '../../../graphql/queries';
import Loader from '../../elements/Loader/Loader';
import ErrorScreen from '../../elements/ErrorScreen/ErrorScreen';
import $ from 'jquery';

class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoverNumber: false,
            openDictionnary: false,
            openVideos: false,
            episode:'cjqwfe1kj1j2x0122tixfvb5i'
        }
    }

    onHoverNumber = () => {
        this.setState({
            hoverNumber: true
        })
    }

    onLeaveNumber = () => {
        this.setState({
            hoverNumber: false
        })
    }

    displayWords = (data) => {
        let definitions = [];

        for(let i = 0; i < data.length; i++) {
            definitions.push(
                <li key={i.toString()} className="dictionnary__definition">
                    <h3 className="definition__name">{data[i].name}</h3>
                    <p className="definition__description">{data[i].description}</p>
                </li>
            )
        }

        return definitions
    }

    displayAnecdotes = (data) => {
        let anecdotes = [];

        for(let i = 0; i < data.length; i++) {
            var creation = data[i].createdAt,
                date = (new Date(creation)).toLocaleDateString();
            anecdotes.push(
                <li key={i.toString()} className="anecdotes__anecdote">
                    <div className="anecdote__top">
                        <div className="anecdote__author">{data[i].author}</div>
                        <div className="anecdote__line"></div>
                        <div className="anecdote__date">{date}</div>
                    </div>
                    <p className="anecdote__story">
                        {data[i].content}
                    </p>
                </li>
            )
        }

        return anecdotes
    }

    handleClickCloseDictionnary = () => {
        this.setState({
            openDictionnary: false
        })
    }

    handleClickOpenDictionnary = () => {
        this.setState({
            openDictionnary: true
        })
    }

    handleClickOpenVideos = () => {
        this.setState({
            openVideos: true
        })
    }

    handleClickCloseVideos = () => {
        this.setState({
            openVideos: false
        })
    }

    handleClickCatalogue = () => {
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host;
        window.location.href = baseUrl + '/catalogue';
    }

    handleClickScroll = (e) => {
        var top = $('html').offset().top;
        console.log(top);
        let id = $(e.currentTarget).data('id');
        let sectionPosition = $('#' + id).offset().top;
        $('.Information').animate({
            scrollTop: sectionPosition - 50
        }, 2000);
    }

    handleClickAnecdotes = () => {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        window.location.href = baseUrl + '/anecdotes';
    }

    render() {
        return (
            <div className="Information">
                <Header />
                {
                    this.state.episode?
                        (<Query query={getEpisode} variables={{ id : this.state.episode }}>
                                {({ loading, error, data }) => {
                                    if (loading) return (<Loader />);
                                    if (error) return (<ErrorScreen />);
                                    return (
                                        <div className="Information__container">
                                            <div className="Information__anchors">
                                                <ul className="anchors__list">
                                                    <li className="anchors__item" data-id="dictionnary" onClick={this.handleClickScroll}>Boîte à mots</li>
                                                    <li className="anchors__item" data-id="videos" onClick={this.handleClickScroll}>Vidéos</li>
                                                    <li className="anchors__item" data-id="anecdotes" onClick={this.handleClickScroll}>Anecdotes</li>
                                                    <li className="anchors__item" data-id="accounts" onClick={this.handleClickScroll}>Comptes à suivre</li>
                                                </ul>
                                            </div>
                                            <section className="Information__firstScreen">
                                                <div className="firstScreen__container">
                                                    <h1 className="firstScreen__title">malaise<br />autour de la sexualité<br /><span>être vierge au XXIe<br />siècle en France</span></h1><p className="firstScreen__description">Discussion courante de la pause du lycée au bureau, mais encore sujet phare des soirées , nous sommes tous passé par la question : « et toi tu l’as fais ? ». Passé un certain âge on considère même qu’il va de soit que tout le monde est passé le cap. Alors que les mouvements féministes ont largement contribué à faire évoluer les mentalités sur la sexualité des femmes, quand est-il pour les hommes ?</p>
                                                </div>
                                                <button className="firstScreen__action">
                                                    <img src={arrowDownIcon} alt="Flèche du bas" />
                                                </button>
                                            </section>
                                            <section className={this.state.openDictionnary ? "Information__dictionnary Information__dictionnary--open" : "Information__dictionnary"} id="dictionnary">
                                                <div className="dictionnary__container">
                                                    <div className="dictionnary__head">
                                                        <div className="dictionnary__column">
                                                            <div className="dictionnary__actions">
                                                                <div className="dictionnary__illustration">
                                                                    <DictionnaryAlert />
                                                                </div>
                                                                <button className="dictionnary__action" onClick={this.handleClickOpenDictionnary}>
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
                                                    <div className="dictionnary__body">
                                                        <ul className="dictionnary__definitions">
                                                            {this.displayWords(data.Episode.definitions)}
                                                        </ul>
                                                        <button className="dictionnary__closeBody" onClick={this.handleClickCloseDictionnary}><img src={arrowUpIcon} alt="Flèche qui pointe vers le haut" /></button>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="Information__statistics">
                                                <div className="statistics__container">
                                                    <h2 className="statistics__title">statistiques de l'épisode</h2>
                                                    <ul className="statistics__list">
                                                        <li className="statistics__answer">
                                                            <img src={statDrink} alt="Représentation des statistiques"/>
                                                        </li>
                                                        <li className="statistics__answer">
                                                            <img src={statPecho} alt="Représentation des statistiques"/>
                                                        </li>
                                                        <li className="statistics__answer">
                                                            <img src={statLiar} alt="Représentation des statistiques"/>
                                                        </li>
                                                    </ul>
                                                    <button className="statistics__action"><More /> Toutes les statistiques</button>
                                                </div>
                                                <div className="statistics__background">
                                                    <img src={serpentin} alt="Serpentin"/>
                                                </div>
                                            </section>
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
                                                <div className="diagram__container">
                                                    <div className="diagram__column">
                                                        <h3 className="diagram__title">Age de la première fois en France</h3>
                                                        <div className="diagram__number" onMouseEnter={this.onHoverNumber} onMouseLeave={this.onLeaveNumber}>
                                                            <div className={this.state.hoverNumber ? "diagram__number__1 hide" : "diagram__number__1"}><span>20</span>ans<br />en 1939</div>
                                                            <div className={this.state.hoverNumber ? "diagram__number__2" : "diagram__number__2 hide"}><span>17,4</span>ans<br />en 2007</div>
                                                        </div>
                                                    </div>
                                                    <div className="diagram__column">
                                                        <img className="diagram__illustration" src={graphic} alt="Diagramme"/>
                                                        <p className="diagram__description">Au cours des années, l’écart d’âge de dépucelage entre les hommes et les femmes à fortement diminué. En 1939, les <span>femmes</span> perdaient leurs virginité à 22 ans,contre 18 ans pour les hommes. Aujourd’hui les statistiques sont de 17,6 pour les <span>femmes</span> et de 17,2 pour les hommes*. </p>
                                                        <button className="diagram__action">
                                                            <More />
                                                            Toutes les statistiques
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className={this.state.openVideos ? "Information__videos Information__videos--open" : "Information__videos"} id="videos">
                                                <div className="videos__container">
                                                    <h2 className="videos__title">vidéos</h2>
                                                    <div className="video__primary">
                                                        <div className="video__content">
                                                            <iframe className="video__youtube" src="https://www.youtube.com/embed/o87SsbCZwFM" frameBorder="0"></iframe>
                                                        </div>
                                                        <div className="video__description">
                                                            <p>People guess who's a virgin <span>CUT</span></p>
                                                        </div>
                                                    </div>
                                                    {this.state.openVideos ?
                                                        <button className="videos__action" onClick={this.handleClickCloseVideos}>
                                                            <Less />
                                                            Moins de vidéos
                                                        </button>
                                                        :
                                                        <button className="videos__action" onClick={this.handleClickOpenVideos}>
                                                            <More />
                                                            Plus de vidéos
                                                        </button>
                                                    }
                                                    <ul className="videos__secondary">
                                                        <li>
                                                            <div className="video__content">
                                                                <iframe className="video__vimeo" src="https://player.vimeo.com/video/100411749" frameBorder="0"></iframe>
                                                            </div>
                                                            <div className="video__description">
                                                                <p>La sexualité des ados  <br /><span>ARTE</span></p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="video__content">
                                                                <iframe className="video__other" src="https://www.arte.tv/player/v3/index.php?json_url=https%3A%2F%2Fapi.arte.tv%2Fapi%2Fplayer%2Fv1%2Fconfig%2Ffr%2F084432-001-A%3FlifeCycle%3D1&lang=fr_FR" frameBorder="0"></iframe>
                                                            </div>
                                                            <div className="video__description">
                                                                <p>Education, sexualité, consentement <br /><span>ARTE</span></p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="video__content">
                                                                <iframe className="video__facebook" src="https://www.youtube.com/embed/tYyB-BiWlWw" frameBorder="0"></iframe>
                                                            </div>
                                                            <div className="video__description">
                                                                <p>Sex Education  <br /><span>France Inter</span></p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </section>
                                            <section className="Information__anecdotes" id="anecdotes">
                                                <h2 className="anecdotes__title">anecdotes</h2>
                                                <ul className="anecdotes__list">
                                                    {this.displayAnecdotes(data.Episode.anecdotes)}
                                                </ul>
                                                <button className="anecdotes__action" onClick={this.handleClickAnecdotes}><More /> Partage ton anecote</button>
                                            </section>
                                            <section className="Information__toFollow" id="accounts">
                                                <div className="toFollow__container">
                                                    <h2 className="toFollow__title"><span>comptes à suivre</span></h2>
                                                    <ul className="toFollow__list">
                                                        <li className="account">
                                                            <a href="https://www.instagram.com/tubandes/" target="_blank">
                                                                <div className="account__illustration">
                                                                    <img src={tubandes} alt="Photo de profil"/>
                                                                </div>
                                                                <div className="account__like">
                                                                    <Heart />
                                                                </div>
                                                                <h3 className="account__name">@tubandes</h3>
                                                            </a>
                                                        </li>
                                                        <li className="account">
                                                            <a href="https://www.binge.audio/category/les-couilles-sur-la-table/" target="_blank">
                                                                <div className="account__illustration">
                                                                    <img src={lescouillessurlatable} alt="Photo de profil"/>
                                                                </div>
                                                                <div className="account__like">
                                                                    <Heart />
                                                                </div>
                                                                <h3 className="account__name">Les couilles sur la table</h3>
                                                            </a>
                                                        </li>
                                                        <li className="account">
                                                            <a href="https://www.instagram.com/tasjoui/"  target="_blank">
                                                                <div className="account__illustration">
                                                                    <img src={tasjoui} alt="Photo de profil"/>
                                                                </div>
                                                                <div className="account__like">
                                                                    <Heart />
                                                                </div>
                                                                <h3 className="account__name">@t'as joui</h3>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <button className="toFollow__action"><More />Afficher plus</button>
                                                </div>
                                            </section>
                                            {/*<section className="Information__sources">
                                                <div className="sources__container">
                                                    <h2 className="sources__title">sources</h2>
                                                    <ul className="sources__list">
                                                        <div className="sources__column">
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
                                                        </div>
                                                        <div className="sources__column">
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
                                                        </div>
                                                    </ul>
                                                </div>
                                            </section>*/}
                                            <section className="Information__footer" onClick={this.handleClickCatalogue}>
                                                <div className="footer__action">les épisodes</div>
                                            </section>
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

export default Information;