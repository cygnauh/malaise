import React, { Component } from 'react';
import './style.scss';
import WordBox from "../../SVG/WordBox/WordBox";
import { Query } from "react-apollo";
import { getEpisodesAndDefinitions } from '../../../graphql/queries';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Dictionnary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes
        };
    }

    handleClickThemeFilter = () => {
        console.log('click on theme filter');
    }

    handleClickOrderFilter = () => {
        console.log('click on order filter');
    }

    displayThemes = (data) => {
        let themes = [];

        for (let i = 0; i < data.length; i++) {
            var id = '#' + data[i].theme;
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

    handleClickThemeScroll = (e) => {
        var id = $(e.currentTarget).data('id');
        console.log(id);
        $('.Dictionnary').animate({
            scrollTop: $('#' + id).offset().top
        }, 2000);
    }

    displayDefinitionsList = (data) => {
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

    displayDefinitions = (data) => {
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
                        {this.displayDefinitionsList(data[i])}
                    </ul>
                </div>
            )
        }

        return definitions
    }

    render() {
        return(
            <Query
                query={getEpisodesAndDefinitions}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return "Refetching!";
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    return (
                        <div className="Dictionnary">
                           <div className="Dictionnary__header">
                               <div className="Dictionnary__header__icon"><WordBox /></div>
                               <div className="Dictionnary__header__filterActions">
                                   <button className="Dictionnary__header__filterButton" onClick={this.handleClickThemeFilter}>Thèmes</button>
                                   <button className="Dictionnary__header__filterButton" onClick={this.handleClickOrderFilter}>Ordre alphabétique</button>
                               </div>
                           </div>
                            <div className="Dictionnary__subHeader">
                                <div className="subHeader__themesFilter">
                                    {this.displayThemes(data.allEpisodes)}
                                </div>
                                <div className="Dictionnary__orderFilter"></div>
                            </div>
                            <div className="Dictionnary__definitions">
                                {this.displayDefinitions(data.allEpisodes)}
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }

}

export default Dictionnary;