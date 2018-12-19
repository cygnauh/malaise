import gql from "graphql-tag";
import FirstEpisode from "./queries-folder/FirstEpisode";


export const getEpisodes = gql`
    {
        allEpisodes{
            id,
            location,
            entourage
        }
    }
`;

export default {getEpisodes};