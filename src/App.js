import './App.css';
import React from 'react';
// import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloBoost from "apollo-boost";

// import Header from './components/layout/Header';
// import Episode from './components/Episode'
// import Timeline from "./components/layout/Timeline";
// import Homepage from "./components/pages/Homepage"
// import ExchangeRates from "./components/Exchange"
import EpisodeSelection from "./components/EpisodeSelection"
// import gql from "graphql-tag";

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
});


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>Malaise</h2>
        </div>
        <EpisodeSelection/>
    </ApolloProvider>
);


// class App extends Component {
//     constructor(){
//         super();
//         this.state = {
//             render:'',
//             home:true
//         }
//
//     }
//     handleClick = () => {
//         console.log('clicked')
//         this.setState({
//             home:false
//         })
//     }
//     render() {
//         return (
//             <div className="app">
//
//                 {this.state.home
//                     ?
//                     <Homepage buttonPressed={this.handleClick}/>
//                     :
//                     <div className="app-container">
//                         <Header />
//                         <ApolloProvider client={client}>
//                             <Episode/>
//                             {/*<Test/>*/}
//                         </ApolloProvider>
//                         <Timeline />
//                     </div>
//                 //{/*}*/
//                     }
//             </div>
//         )
//     }
// }

export default App;
