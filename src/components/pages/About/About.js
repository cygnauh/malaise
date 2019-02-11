import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import GobelinsLogo from '../../../assets/img/logo-gobelins.png';
import MalaiseLogo from '../../../assets/img/logos/logo-malaise.svg';
import advice1 from '../../../assets/img/advice-1.png';
import advice2 from '../../../assets/img/advice-2.png';
import advice3 from '../../../assets/img/advice-3.png';
import Heart from "../../SVG/Heart/Heart";


class About extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="About">
                <div className="About__grid">
                    <div className="About__grid--full About__title">
                        <img src={MalaiseLogo} alt="Logo de Malaise."/>
                    </div>
                    <div className="About__grid--full About__description">
                        <p className="About__description__content">En 2019, à l’ère de l’info continue et de la mondialisation digitale, de plus en plus de controverses naissent autour des mots et de leur contexte. Black, homo, racisme, chinois, féministe, triso, genres... Peut-on parler de différence aujourd’hui sans offenser une partie de la population ? Beaucoup défendent la liberté d’expression sans limite, d’autres préfèreraient retirer certains termes de notre vocabulaire. <br /><br /><b>Les mots sont-ils si importants ?</b><br /><br />Nous connaissons tous cette sensation de malaise, vous savez : quand vous voulez parler d’un sujet sans savoir comment l’aborder de peur de gêner votre interlocuteur, que ce soit entre amis, entre collègues, en famille ou dans la rue...<br /><br />Dans le cadre privé, nous commettons aussi toutes et tous des maladresses entre amis ou au travail. En parlant, nous contribuons à alimenter des clichés, profondément ancrés dans la société, parfois sans même nous en rendre compte.<br /><br />Malaise est un podcast interactif qui nous plonge dans ce genre conversation anodine. Pendant l’écoute, l’utilisateur est amené à participer, en interagissant avec l’histoire. Chaque épisode permet de s’interroger sur un mot mal employé qui prolonge la discrimination.<br /><br />Pourquoi leur utilisation est-elle si répandue ? Comment le sens de certains mots a-t-il évolué et pris une connotation négative ? Leurs usages répétés nous ont amené à une banalisation.<br /><br />Nous pensons que nous interroger sur le sens des mots est une façon de questionner des schémas de pensées. Notre but est de ré-établir un dialogue entre ceux qui font des erreurs et ceux qui les subissent.</p>
                    </div>
                    <div className="About__advice">
                        <h2 className="advice__title"><span>nos recommandations</span></h2>
                        <div className="advice__content">
                            <ul className="advice__podcastList">
                                <li className="advice__podcastItem">
                                    <div className="podcastItem__illustration">
                                        <img src={advice1} alt="Illustration de Programme B"/>
                                    </div>
                                    <div className="podcastItem__like">
                                        <Heart />
                                    </div>
                                    <h3 className="podcastItem__name">Programme B</h3>
                                    <p className="podcastItem__description">Comment éduquer à la tolérence.</p>
                                </li>
                                <li className="advice__podcastItem">
                                    <div className="podcastItem__illustration">
                                        <img src={advice2} alt="Illustration de Programme B"/>
                                    </div>
                                    <div className="podcastItem__like">
                                        <Heart />
                                    </div>
                                    <h3 className="podcastItem__name">Programme B</h3>
                                    <p className="podcastItem__description">Les zinzins d'internet prennent-ils le pouvoir ?</p>
                                </li>
                                <li className="advice__podcastItem">
                                    <div className="podcastItem__illustration">
                                        <img src={advice3} alt="Illustration d'1 épisode et j'arrête"/>
                                    </div>
                                    <div className="podcastItem__like">
                                        <Heart />
                                    </div>
                                    <h3 className="podcastItem__name">1 episode et j'arrête</h3>
                                    <p className="podcastItem__description">Peut-on rire de tout dans les séries ?</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="About__team">
                        <h2 className="team__title"><span>la team</span></h2>
                        <div className="team__presentation">
                            <div className="team__description">Malaise est né de la collaboration de cinq étudiantes des Gobelins. Chacune avec son vécu, ses anecdotes, ses moments de malaise, provoqués ou subis... Toutes différentes, elles ont tenu à faire un projet qui les réunissaient. Le projet a été ponctué par de multiples histoires, rires et débats. Tous ces échanges ont permis d’alimenter leurs réflexion sur le message qu’elles souhaitent faire passer : pour réinstaurer un dialogue avec l’autre, il ne faut pas utiliser un ton moralisateur car nous avons toutes et tous déjà blessé ou créé de la gêne. Pour les présentations détaillées, c’est juste en dessous ;)</div>
                            <div className="team__logo"><img src={GobelinsLogo} alt="Logo Goeblins" /></div>
                        </div>
                        <div className="team__worker">
                            <div className="worker">
                                <h3 className="worker__name">Noémie<br/>Eyoum</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    Designer graphique vorace de podcast. Elle est douée d’un sens hors norme de l’organisation et de justesse, avec Noémie vous ne serez jamais perdu.
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Christine<br />Huang</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    Développeuse full-stack, nouvelle pro de GraphQL. En apparence calme et douce,  Christine est toujours prête à placer une punchline bien sentie. Accrochez-vous.
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Github</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Justine<br />Lenouvel</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    Designer graphique, pro du motion, elle affronte les bugs d’After Effects, telle une guerrière, elle s’arme de patience.
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Circé<br />Grand</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    Développeuse front-end, et actrice à ses heures perdues. Caractérisée par un rire éclatant, pas besoin de la voir, tendez l’oreille, vous ne l'entendez pas ?
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Github</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="worker">
                                <h3 className="worker__name">Clara<br />Vigourous</h3>
                                <div className="worker__illustration"></div>
                                <div className="worker__description">
                                    Designer graphique, chargée de la direction artistique elle s’assure que le projet conserve une cohérence sur tous les supports.
                                    <ul className="worker__socials-share">
                                        <li className="worker__social"><Link to="/">Link</Link></li>
                                        <li className="worker__social"><Link to="/">Port</Link></li>
                                        <li className="worker__social"><Link to="/">Behance</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="About__footer">
                        <Link to="/">aller aux épisodes</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
