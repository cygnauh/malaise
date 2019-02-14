import React, { Component } from 'react';
import './style.scss';
import { Query } from "react-apollo";
import { getAnecdotes} from '../../../graphql/queries';
import AnecdoteForm from "../../elements/AnecdoteForm/AnecdoteForm";
import Loader from "../../elements/Loader/Loader";
import ErrorScreen from "../../elements/ErrorScreen/ErrorScreen";
import EmojiSmile from "../../SVG/EmojiSmile/EmojiSmile";
import Header from "../../layout/Header/Header";

class Anecdotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            render:'',
            episode:'cjqwfe1kj1j2x0122tixfvb5i',
            submitForm: false
        };
    }

    handleClickToOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    displayAnecdotes = (data) => {
        let anecdotes = [];

        for(let i = 0; i < data.length; i++){
            var creation = data[i].createdAt,
                date = (new Date(creation)).toLocaleDateString();
            anecdotes.push(
                <div key={i.toString()}
                     className="Anecdote">
                    <div className="Anecdote__top">
                        <div className="Anecdote__author">{data[i].author}</div>
                        <div className="Anecdote__line"></div>
                        <div className="Anecdote__date">{date}</div>
                    </div>
                    <p className="Anecdote__story">
                        {data[i].content}
                    </p>
                </div>
            )
        }

        return anecdotes;
    }

    showConfirmationSend = (e) => {
        this.setState({
            submitForm: e
        })
        setTimeout(() => {
            this.setState({
                submitForm: false,
                open: false
            })
        }, 3000)
    }

    render() {
        return (
            <div className="Anecdotes">
                <Header />
                <div className={this.state.submitForm ? "Anecdotes__messageSubmit Anecdotes__messageSubmit--show" : "Anecdotes__messageSubmit"}>
                    <div className="messageSubmit">
                        <div className="messageSubmit__icon"><EmojiSmile /></div>
                        <h3 className="messageSubmit__title">Merci !</h3>
                        Ton anecdote a bien été envoyée.
                    </div>
                </div>
                <Query query={getAnecdotes} variables={{ id : this.state.episode }}>
                    {({ loading, error, data }) => {
                        if (loading) return (<Loader/>);
                        if (error) return (<ErrorScreen/>);
                        return (
                            <div className="Anecdotes__container">
                                <div className={this.state.open ? 'Anecdote-toShare Anecdote-toShare--open': 'Anecdote-toShare'}>
                                    <div className="Anecdote-toShare__container">
                                        <div className="Anecdote-toShare__column">
                                            <h2 className="Anecdote-toShare__title">Partage <br/>ton anecdote</h2>
                                            <p className="Anecdote-toShare__description">
                                                Toi aussi tu as une histoire à partager ? <br />Une anecdote à raconter ? <br />N'hésite pas à nous envoyer ton témoignage, le sujet pourrait nous inspirait pour un nouvel épisode qui sait !
                                            </p>
                                            <button className={this.state.open ? 'Anecdote-toShare__cta Anecdote-toShare__cta--hidden': 'Anecdote-toShare__cta'} onClick={this.handleClickToOpen}>Raconte ton anecdote</button>
                                        </div>
                                        <div className="Anecdote-toShare__column">
                                            <AnecdoteForm submitForm={this.showConfirmationSend} />
                                        </div>
                                    </div>
                                </div>
                                {this.displayAnecdotes(data.allAnecdotes)}
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
}

export default Anecdotes;
