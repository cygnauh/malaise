import React, { Component } from 'react';
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
                    episode
                }
            }
        `;

        let input;

        return (
            <Mutation mutation={ADD_ANECDOTE}>
                {(createAnecdote, { data }) => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                createAnecdote({ variables: { author: input.value, content: input.value, episode: 'cjqwfe1kj1j2x0122tixfvb5i' } });
                                input.value = "";
                                input.value = "";
                            }}
                        >
                            <input
                                ref={node => {
                                    input = node;
                                }}
                                placeholder="Pseudo"
                            />
                            <input
                                ref={node => {
                                    input = node;
                                }}
                                placeholder="Histoire"
                            />
                            <button type="submit">Add Anecdote</button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default AnecdoteForm;