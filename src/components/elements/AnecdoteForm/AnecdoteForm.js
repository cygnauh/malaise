import React, { Component } from 'react';
import "./style.scss";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import $ from 'jquery';

class AnecdoteForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ADD_ANECDOTE = gql`
            mutation createAnecdote($author: String!, $content: String!) {
                createAnecdote(author: $author, content: $content) {
                    id
                    author
                    content
                }
            }
        `;

        let input, textarea;

        return (
            <Mutation mutation={ADD_ANECDOTE}>
                {(createAnecdote, { data }) => (
                    <form className="AnecdoteForm"
                        onSubmit={e => {
                            e.preventDefault();
                            createAnecdote({ variables: { author: input.value, content: textarea.value } });
                            input.value = "";
                            textarea.value = "";
                        }}
                    >
                        <div className="AnecdoteForm__field">
                            <input
                                ref={node => {
                                    input = node;
                                }}
                                className="AnecdoteForm__input"
                                placeholder="pseudo"
                            />
                        </div>
                        <div className="AnecdoteForm__field">
                             <textarea
                                 ref={node => {
                                     textarea = node;
                                 }}
                                 className="AnecdoteForm__textarea"
                             />
                            <span>700 caractères maximum</span>
                        </div>

                        <button type="submit" className="AnecdoteForm__cta">Envoyer</button>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default AnecdoteForm;