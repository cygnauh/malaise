// COMPONENTS
import React, {Component} from 'react';
import Lottie from 'react-lottie';
import boumboum from '../../assets/animation/boumboum'
import MusicChoice from './MusicChoice/MusicChoice'
import Question from './Question/Question'
import DrinkAction from './DrinkAction/DrinkAction'
import UserQuestion from './UserQuestion/UserQuestion'
import Hours from './Hours/Hours'
import TakingPosition from './TakingPosition/TakingPosition'
// QUERY
import {Query} from "react-apollo";
import {getMusics} from '../../graphql/queries'
// API CONTEXT
import {SoundContext} from "../../store/SoundProvider";
import './interactions.scss'
import UserContext from '../../store/UserProvider'

class Interactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            interactionPosition: 1,
            interaction: null,
            show: false,
            soundSequence: ''
        };
        this.answers = this.props.anwsers.allAnswers
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: boumboum,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }

    componentDidMount() {
        this.interactions = this.context.interactions;
        this.handleInteraction();
    };

    handleInteraction = () => {
        // console.log('handleInteraction', this.state.interactionPosition)
        let inte = this.interactions.find(setting => setting.position === this.state.interactionPosition);
        if (this.interactions && this.state.interactionPosition) {
            this.setState({
                interaction: inte
            }, () => {
                // if(this.state.interaction.interactionType === 'heure'){
                //     this.setState({
                //         show: true
                //     });
                //     // setTimeout(this.handleAnswer(null), 10000)
                //     return
                // }

                this.setState({
                    soundSequence: this.context.playInteractionSound(this.state.interaction.name)
                }, () => {
                    // console.log(this.state.soundSequence)
                    // console.log(this.state.soundSequence[0])
                    // let time = this.context.playInteractionSound(this.state.interaction.name)
                    if (this.state.interaction.interactionType === "none" && this.state.interaction.content === null) {
                        this.state.soundSequence[0].on('end', (id) => {
                            console.log(id)
                            if (this.state.interaction.interactionType === "none" && this.state.interaction.content === null) {
                                // console.log(this.state.interaction)
                                console.log("end1");
                                this.handleAnswer(null)
                            }
                            // return true
                        });
                    }
                    else if (this.state.interaction.interactionType === "none" && this.state.interaction.content !== null){
                        setTimeout(()=>{
                            console.log("end2");
                            this.handleAnswer(null)
                        },this.state.soundSequence[1])
                    } // TODO Uncomment

                    if (this.state.interaction && this.state.interaction.interactionType === 'drag and drop' && this.state.interactionPosition === 20){
                        setTimeout( () =>{
                            this.setState({
                                show: true
                            });
                        }, this.state.soundSequence[1]-1000)
                    } else if (this.state.interaction && this.state.interaction.interactionType !== "none") {
                        this.setState({
                            show: true
                        });
                    }
                });
            })
        }
    };
    handleAnswer = (value) => {
        // console.log('a');
        let answer = (value) ? value : null;
        let destinationFound = false;
        let destination = ''
        if (this.answers && this.state.interaction) {
            // console.log('b');
            for (let i = 0; i < this.answers.length; i++) {
                // console.log(this.answers[i].originInteraction);
                // console.log(this.answers[i].originInteraction.id);
                // console.log(this.state.interaction.id);
                // console.log(this.answers[i].content);
                // console.log(answer);
                // console.log(!destinationFound)
                if (this.answers[i].originInteraction &&
                    this.answers[i].originInteraction.id === this.state.interaction.id &&
                    this.answers[i].content === answer &&
                    this.answers[i].destinationInteraction &&
                    this.answers[i].destinationInteraction.position &&
                    !destinationFound
                ) {
                    console.log('answer')
                    console.log(this.answers[i].destinationInteraction.position);
                    this.setState({
                        // interactionPosition : destination,
                        interactionPosition: this.answers[i].destinationInteraction.position,
                        show: !this.state.show
                    }, () => {
                        console.log('a');
                        this.handleInteraction();
                        destinationFound = true;

                    });
                    return
                }
            }
        }
    };

    render() {
        return (
            <div className="Interactions">

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "music" ?
                    // getMusics
                    <div className="Interactions__music">
                        <Query query={getMusics} notifyOnNetworkStatusChange>
                            {({loading, error, data, refetch, networkStatus}) => {
                                if (networkStatus === 4) return "Refetching!";
                                if (loading) return null;
                                if (error) return `Error!: ${error}`;
                                return (
                                        <MusicChoice musics={data.allSounds} onMusicClicked={this.handleAnswer}/>
                                )
                            }}
                        </Query>
                    </div>
                    : null}
                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "question" && this.state.interaction.content ?
                    <Question question={this.state.interaction.question}
                              choices={this.state.interaction.content.split('@')}
                              onAnwserClicked={this.handleAnswer}
                    />
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "drag and drop" ?
                    <DrinkAction drinkers={this.state.interaction.content.split('@')}
                                 timer={this.state.interaction.timer}
                                 question={this.state.interaction.question.split('@')}
                                 drinkActionEnd={this.handleAnswer}
                    />
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "user question" ?
                    <UserQuestion drinkActionEnd={this.handleAnswer}/>
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "heure" ?
                    <Hours hours={22} minutes={26} onEnd={this.handleAnswer}/>
                    : null}
                    {/*TODO Fix error or handle it differently */}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "taking position" ?
                    <TakingPosition arguers={this.state.interaction.content.split('@')} onEnd={this.handleAnswer}/>
                    : null}
            </div>
        )
    }
}

Interactions.contextType = SoundContext;
export default Interactions;
