import gql from "graphql-tag";


export const getEpisodesAndDefinitions = gql`
    {
        allEpisodes {
            id,
            title,
            theme,
            definitions (
                orderBy: name_ASC
            ) {
                name, 
                description
            }
        }
    }
`;

export const getEpisodesAndPlaceSounds = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage,
            darkColor,
            createdAt,
            personalizations{
                name,
                question,
                answerLabel
                type
            },
            sounds{
                name,
                url,
                type
            },
            interactions{
                id
                content,
                indication,
                question,
                timer,
                position,
                name,
                interactionType,
                soundSequences{
                    beginAt,
                    duration,
                    name
                }
            },
        },
        allSounds{
            name,
            url,
            type
        }
    }
`;

export const getEpisodes = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage,
            darkColor,
            createdAt
        }
    }
`;

export const getEpisode = gql`    
    query Episode($id: ID!) {
        Episode(id: $id)
        {
            id,
            title,
            summary,
            place,
            entourage,
            darkColor,
            createdAt,
            personalizations{
                name,
                question,
                answerLabel
                type
            },
            sounds{
                name,
                url,
                type
            },
            interactions{
                content,
                soundSequences{
                    beginAt,
                    duration
                }
            },
        }
    }
`;

export const getAnwsers = gql`
    {
        allAnswers{
            content,
            destinationInteraction{
                name,
                position,
                id},
            originInteraction{
                name,
                position
                id}
        }
    }
`;

export const getMusics = gql`
    {
        allSounds(filter: {
            type: "music"
        }){

            url,
            name,
        }
    }
`;


export default {getEpisodesAndPlaceSounds, getEpisode, getAnwsers, getMusics, getEpisodesAndDefinitions};