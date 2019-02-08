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
            mutation createAnecdote($author: String!, $content: String!, $episode: ID!) {
                createAnecdote(author: $author, content: $content, episodeId: $episode) {
                    id
                    author
                    content
                    episode {
                        id
                    }
                }
            }
        `;

        let input, textarea;

        return (
            <Mutation mutation={ADD_ANECDOTE}>
                {(createAnecdote, { data }) => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                createAnecdote({ variables: { author: input.value, content: textarea.value, episode: "cjqwfe1kj1j2x0122tixfvb5i" } });
                                input.value = "";
                                textarea.value = "";
                            }}
                        >
                            <input
                                ref={node => {
                                    input = node;
                                }}
                                placeholder="pseudo"
                            />
                            <textarea
                                ref={node => {
                                    textarea = node;
                                }}
                            />
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default AnecdoteForm;