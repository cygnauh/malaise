// COMPONENTS
import React, {Component} from 'react';
import MusicChoice from './MusicChoice/MusicChoice'
import Question from './Question/Question'
import DrinkAction from './DrinkAction/DrinkAction'
import UserQuestion from './UserQuestion/UserQuestion'
import Hours from './Hours/Hours'
import TakingPosition from './TakingPosition/TakingPosition'
import AnimationLottie from './Animation/AnimationLottie'
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
            soundSequence: '',
            origin:''
        };
        this.answers = this.props.anwsers.allAnswers;
    }

    componentDidMount() {
        this.interactions = this.context.interactions;
        this.handleInteraction(1, '');
    };

    handleInteraction = (newPos, origin) => {
        // console.log('handleInteraction', this.state.interactionPosition)
        let inte = this.interactions.find(setting => setting.position === newPos);
        if (inte && this.interactions && this.state.interactionPosition) {
            this.setState({
                origin:origin,
                show: !this.state.show,
                interaction: inte,
                soundSequence: this.context.playInteractionSound(inte.name)
            }, () => {
                    if (this.state.interaction.interactionType === "none") {
                        this.state.soundSequence[0].on('end', () => {
                            if (this.state.interaction.interactionType === "none" && this.state.interaction.content === null) {
                                this.handleAnswer('nothing')
                            }
                        });
                    }
                    else{
                        if (this.state.interaction && this.state.interaction.interactionType === 'drag and drop' && this.state.interactionPosition === 20){
                            setTimeout( () =>{
                                this.setState({
                                    show: true
                                });
                            }, this.state.soundSequence[1]-1000)
                        } else {
                            this.setState({
                                show: true
                            });
                        }
                    }
            })
        }
    };
    handleAnswer = (origin, value) => {
        let answer = (value) ? value : null;
        let destinationFound = false;
        if(this.state.origin !== origin) {
            if (this.answers && this.state.interaction) {
                for (let i = 0; i < this.answers.length; i++) {
                    if (this.answers[i].originInteraction &&
                        this.answers[i].originInteraction.id === this.state.interaction.id &&
                        this.answers[i].content === answer &&
                        this.answers[i].destinationInteraction &&
                        this.answers[i].destinationInteraction.position &&
                        !destinationFound
                    ) {
                        this.handleInteraction(this.answers[i].destinationInteraction.position, origin);
                        destinationFound = true;
                        return
                    }
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
                    <Hours date={false} hours={22} minutes={26} onEnd={this.handleAnswer}/>
                    : null}
                    {/*TODO Fix error or handle it differently */}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "taking position" ?
                    <TakingPosition arguers={this.state.interaction.content.split('@')} onEnd={this.handleAnswer}/>
                    : null}
                {this.state.show && this.state.interaction && (this.state.interaction.interactionType === "animation" || this.state.interaction.interactionType === "animation-bis") ?
                    <AnimationLottie name={this.state.interaction.content} timer={this.state.soundSequence[1]} onEnd={this.handleAnswer} animationType={this.state.interaction.interactionType}/>
                    : null}
            </div>
        )
    }
}

Interactions.contextType = SoundContext;
export default Interactions;
