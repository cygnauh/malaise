import gql from "graphql-tag";
// import FirstEpisode from "./queries-folder/FirstEpisode";


export const getEpisodes = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            location,
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
                location,
                entourage,
                personalizations{
                    name,
                    question,
                    answerLabel
                }
            }
        }

    
`;

export default {getEpisodes, getEpisode};