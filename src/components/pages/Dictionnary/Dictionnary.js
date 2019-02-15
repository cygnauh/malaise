import React, { Component } from 'react';
import './style.scss';
import WordBox from "../../SVG/WordBox/WordBox";
import { Query } from "react-apollo";
import { getEpisodesAndDefinitions } from '../../../graphql/queries';
import $ from 'jquery';
import Loader from '../../elements/Loader/Loader'
import ErrorScreen from '../../elements/ErrorScreen/ErrorScreen'
import Header from "../../layout/Header/Header";

class Dictionnary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            themeFilter: true
        };

    this.dictionnary = React.createRef();
    }

    handleClickThemeFilter = () => {
        this.setState({
            themeFilter: true
        });
    }

    handleClickOrderFilter = () => {
        this.setState({
            themeFilter: false
        });
    }

    displayThemes = (data) => {
        let themes = [];

        for (let i = 0; i < data.length; i++) {
            themes.push(
                <div key={i.toString()}
                     className="subHeader__theme"
                     onClick={this.handleClickThemeScroll}
                     data-id={data[i].theme} >
                        {data[i].theme}
                </div>
            )
        }
        return themes
    }

    displayLetters = () => {
        let letters = [];
        let alphabetical = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        for (let i = 0; i < alphabetical.length; i++) {
            letters.push(
                <div key={i.toString()}
                     className="subHeader__letter"
                     onClick={this.handleClickThemeScroll}
                     data-id={alphabetical[i]} >
                    {alphabetical[i]}
                </div>
            )
        }

        return letters
    }

    handleClickThemeScroll = (e) => {
        var id = $(e.currentTarget).data('id');
        console.log(id);
        $('.Dictionnary').animate({
            scrollTop: $('#' + id).offset().top - 50
        }, 2000);
    }

    displayDefinitionsListByTheme = (data) => {
        let definitionsList = [];

        for(let j = 0; j < data.definitions.length; j++) {
            definitionsList.push(
                <li key={j.toString()} className="definitions__item">
                    <h3>{data.definitions[j].name}</h3>
                    <p>{data.definitions[j].description}</p>
                </li>
            )
        }

        return definitionsList
    }

    displayDefinitionsByTheme = (data) => {
        let definitions = [];

        for (let i = 0; i < data.length; i++) {
            definitions.push(
                <div key={i.toString()}
                     className="definitons__byTheme"
                     id={data[i].theme}>
                    <div className="definitions__themeName">
                        <h2>
                            <span>{data[i].theme}</span>
                        </h2>
                    </div>
                    <ul className="definitions__themeList">
                        {this.displayDefinitionsListByTheme(data[i])}
                    </ul>
                </div>
            )
        }

        return definitions
    }

    displayDefinitionsListByOrder = (letter, data) => {
        let definitionsList = [];

        for (let j = 0; j < data.length; j++) {
            for (let k = 0; k < data[j].definitions.length; k++) {
                if(data[j].definitions[k].name.charAt(0) === letter) {
                    definitionsList.push(
                        <li key={k.toString()} className="definitions__item">
                            <h3>{data[j].definitions[k].name}</h3>
                            <p>{data[j].definitions[k].description}</p>
                        </li>
                    )
                }
            }
            if(definitionsList < 1) {

            }
        }

        return definitionsList
    }

    displayDefinitionsByOrder = (data) => {
        let letters = [];
        let alphabetical = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        for(let i = 0; i < alphabetical.length; i++){
            letters.push (
                <div key={i.toString()}
                     className="definitons__byOrder"
                     id={alphabetical[i]} >
                    <div className="definitions__orderName">
                        <h2>
                            <span>{alphabetical[i]}</span>
                        </h2>
                    </div>
                    <ul className="definitions__orderList">
                        {this.displayDefinitionsListByOrder(alphabetical[i], data)}
                    </ul>
                </div>
            )
        }

        return letters;
    }

    render() {
        return(
            <Query
                query={getEpisodesAndDefinitions}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return (<Loader/>);
                    if (error) return (<ErrorScreen/>);
                    return (
                        <div className="Dictionnary" ref={this.dictionnary}>
                            <Header />
                           <div className="Dictionnary__header">
                               <div className="Dictionnary__header__icon"><WordBox /></div>
                               <div className="Dictionnary__header__filterActions">
                                   <button className={this.state.themeFilter ? 'Dictionnary__header__filterButton filterActive' : 'Dictionnary__header__filterButton'}  onClick={this.handleClickThemeFilter}>Thèmes</button>
                                   <button className={this.state.themeFilter ? 'Dictionnary__header__filterButton' : 'Dictionnary__header__filterButton filterActive'} onClick={this.handleClickOrderFilter}>Ordre alphabétique</button>
                               </div>
                           </div>
                            <div className="Dictionnary__subHeader">
                                <div className={this.state.themeFilter ? 'subHeader__themesFilter filterActive' : 'subHeader__themesFilter'}>
                                    {this.displayThemes(data.allEpisodes)}
                                </div>
                                <div className={this.state.themeFilter ? 'subHeader__lettersFilter' : 'subHeader__lettersFilter  filterActive'}>
                                    {this.displayLetters()}
                                </div>
                            </div>
                            <div className="Dictionnary__definitions">
                                {this.state.themeFilter ? this.displayDefinitionsByTheme(data.allEpisodes) : this.displayDefinitionsByOrder(data.allEpisodes)}
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }

}

export default Dictionnary;