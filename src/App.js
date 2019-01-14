import React from 'react';
import './assets/styles/index.scss';
import { ApolloProvider } from 'react-apollo';
import UserProvider from "./store/UserProvider";
import SoundProvider from "./store/SoundProvider";
import ApolloBoost from "apollo-boost";
import Navigation from './components/layout/Navigation/Navigation';
import Main from './components/layout/Main/Main';

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
});


const App = () => (
    <ApolloProvider client={client}>
        <UserProvider>
            <SoundProvider>
                <Navigation />
                <Main />
            </SoundProvider>
        </UserProvider>
    </ApolloProvider>
);

export default App;
