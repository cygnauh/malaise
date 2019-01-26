import gql from "graphql-tag";
// import FirstEpisode from "./queries-folder/FirstEpisode";


export const getEpisodesAndPlaceSounds = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage
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