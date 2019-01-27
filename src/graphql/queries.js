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


export default {getEpisodesAndPlaceSounds, getEpisode};