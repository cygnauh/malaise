import gql from "graphql-tag";

export const getEpisodesAndPlaceSounds = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage,
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
                    endAt,
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
            entourage
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
                    endAt
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



export default {getEpisodesAndPlaceSounds, getEpisode, getAnwsers};