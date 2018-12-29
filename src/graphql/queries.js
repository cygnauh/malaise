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

export default {getEpisodes};