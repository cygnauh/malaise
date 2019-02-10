// COMPONENTS
import React, {Component} from 'react';
import MusicChoice from './MusicChoice/MusicChoice'
import Question from './Question/Question'
import DrinkAction from './DrinkAction/DrinkAction'
import UserQuestion from './UserQuestion/UserQuestion'
import Hours from './Hours/Hours'
import TakingPosition from './TakingPosition/TakingPosition'
import AnimationLottie from './Animation/AnimationLottie'
import Notice from './../elements/Notice/Notice'
import Loader from './../elements/Loader/Loader'
import ErrorScreen from './../elements/ErrorScreen/ErrorScreen'
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
        this.handleInteraction(this.state.interactionPosition, '');
    };

    handleInteraction = (newPos, origin) => {
        // console.log('handleInteraction', this.state.interactionPosition)
        let inte = this.interactions.find(setting => setting.position === newPos);
        let indication = false
        if (inte && this.interactions) {
            if(inte.indication){
                indication = true;
            }
            this.setState({
                indication:indication,
                origin:origin,
                show: !this.state.show,
                interaction: inte,
                soundSequence: this.context.playInteractionSound(inte.name)
            }, () => {
                let now = new Date ();
                let new_now = null;
                let new_time = null;
                let isEnded = false;
                console.log(this.state.interaction.position)
                if(this.state.interaction&&this.state.interaction.timer)console.log(this.state.interaction.timer)

                    this.state.soundSequence[0].on('end', () => {
                        new_now = new Date ()
                        new_time = new_now - now
                        console.log(new_time, 'new_time',this.state.soundSequence[1], 'duration')
                        isEnded = true
                        console.log(isEnded, 'isEnded')
                        if(newPos<=15 && this.state.interaction.interactionType === "none"){
                            this.handleAnswer('nothing')
                        }
                    });
                    if (this.state.interaction.interactionType === "none") {
                        console.log('a')
                        if(newPos>15){
                            console.log('b')
                            setTimeout(()=>{
                                console.log(isEnded, 'isEnded')
                                if (isEnded){
                                    console.log('c')
                                    this.handleAnswer('nothing')
                                }else{
                                    setTimeout(()=>{
                                        if (isEnded){
                                            console.log('d')
                                            this.handleAnswer('nothing')
                                        }
                                    }, 500)
                                }
                                console.log('time')
                            }, this.state.soundSequence[1])
                        }
                    }


                    //TEST 2
                // let isLoad = false
                // if (this.state.interaction.interactionType === "none") {
                //     setTimeout(()=>{
                //         if (isEnded){
                //             this.handleAnswer('nothing')
                //         }
                //         console.log('time')
                //     }, this.state.soundSequence[1])
                // }
                //
                // this.state.soundSequence[0].once('load', () => {
                //     new_now = new Date ()
                //     new_time = new_now - now
                //     console.log(new_now, 'new_now')
                //     console.log(new_time, 'new_time')
                //     console.log(this.state.soundSequence[1], 'duration')
                //     isLoad = true
                //     if(newPos<=15 && this.state.interaction.interactionType === "none"){
                //         this.handleAnswer('nothing')
                //     }
                // });
                    // this.state.soundSequence[0].once('end', () => {
                    //     new_now = new Date ()
                    //     new_time = new_now - now
                    //     console.log(new_now, 'new_now')
                    //     console.log(new_time, 'new_time')
                    //     console.log(this.state.soundSequence[1], 'duration')
                    //     if (this.state.interaction.interactionType === "none" && this.state.interaction.content === null) {
                    //         this.handleAnswer('nothing')
                    //     }
                    // });
                    // }
                    // else{


                        // this.state.soundSequence[0].once('load', () => {
                        //     new_now = new Date ()
                        //     new_time = new_now - now
                        //     console.log(new_now, 'new_now')
                        //     console.log(new_time, 'new_time')
                        //     console.log(this.state.soundSequence[1], 'duration')
                        //     isEnded = true
                        //     setTimeout(()=>{
                        //         if (this.state.interaction.interactionType==='none'){
                        //             this.handleAnswer('nothing')
                        //         }
                        //         console.log('time')
                        //     }, this.state.soundSequence[1])
                        // });

                        if (this.state.interaction && this.state.interaction.interactionType === 'drag and drop' && (this.state.interaction.position === 20 || this.state.interaction.position === 28)){
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
                    // }
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
                                if (loading) return <div><Loader/></div>;
                                if (error) return (<div><ErrorScreen/></div>);
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

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "drag and drop" && this.state.interaction.position !== 28 ?
                    <DrinkAction drinkers={this.state.interaction.content.split('@')}
                                 timer={this.state.interaction.timer}
                                 question={this.state.interaction.question.split('@')}
                                 drinkActionEnd={this.handleAnswer}
                                 mode='action'
                    />
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "drink" ?
                    <DrinkAction drinkers={this.state.interaction.content.split('@')}
                                 drinkActionEnd={this.handleAnswer}
                                 mode='drink'
                    />
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "drag and drop" && this.state.interaction.position === 28 ?
                    <DrinkAction drinkers={this.state.interaction.content.split('@')}
                                 timer={this.state.interaction.timer}
                                 question={this.state.interaction.question.split('@')}
                                 drinkActionEnd={this.handleAnswer}
                                 mode='action'
                                 hasAnwser={true}
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

                {/*<Notice notice={"this is the first notice"} show={this.state.indication}/>*/}
                <div className={this.state.interaction && this.state.interaction.indication ? 'Notice__wrapper' : 'Notice__wrapper hide'}>
                    <Notice notice={this.state.interaction && this.state.interaction.indication ?this.state.interaction.indication:null}/>
                </div>
            </div>
        )
    }
}

Interactions.contextType = SoundContext;
export default Interactions;
