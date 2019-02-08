import React, { Component } from 'react';
import './style.scss';
import { Query } from "react-apollo";
import { getAnecdotes} from '../../../graphql/queries';


class Anecdotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            render:'',
            episode:'cjqwfe1kj1j2x0122tixfvb5i'
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

    render() {
        return (
            <div className="Anecdotes">
                <Query query={getAnecdotes} variables={{ id : this.state.episode }}>
                    {({ loading, error, data }) => {
                        if (loading) return (<div>loader</div>);
                        if (error) return `Error!: ${error}`;
                        return (
                            <div className="Anecdotes__container">
                                <div className={this.state.open ? 'Anecdote-toShare Anecdote-toShare--open': 'Anecdote-toShare'}>
                                    <div className="Anecdote-toShare__container">
                                        <div className="Anecdote-toShare__column">
                                            <h2 className="Anecdote-toShare__title">Partage <br/>ton anecdote</h2>
                                            <p className="Anecdote-toShare__description">
                                                In hac habitasse platea dictumst.
                                                Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                                Vivamus adipiscing fermentum quam volutpat aliquam.
                                            </p>
                                            <button className={this.state.open ? 'Anecdote-toShare__cta Anecdote-toShare__cta--hidden': 'Anecdote-toShare__cta'} onClick={this.handleClickToOpen}>Raconte ton anecdote</button>
                                        </div>
                                        <div className="Anecdote-toShare__column">
                                            <form className="Anecdote-toShare__shareForm">
                                                <div className="shareForm__field">
                                                    <input className="shareForm__input" placeholder="pseudo" />
                                                </div>
                                                <div className="shareForm__field">
                                                    <textarea className="shareForm__textarea"></textarea>
                                                    <span>700 caractères maximum</span>
                                                </div>
                                                <button type="submit" className="shareForm__cta">Envoyer</button>
                                            </form>
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
