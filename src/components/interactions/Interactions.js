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
import Credits from './../pages/Credits/Credits'
import { Howl } from 'howler';
// QUERY
import {Query} from "react-apollo";
import {getMusics} from '../../graphql/queries'
// API CONTEXT
import {SoundContext} from "../../store/SoundProvider";
import './interactions.scss'
import UserContext from '../../store/UserProvider'
import Sound from "./../../assets/sounds/final-voice2.mp3"


class Interactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            interactionPosition: 1,
            interaction: null,
            show: false,
            soundSequence: '',
            origin: '',
            episodeSounds: null,
            soundLoaded:false,
            goNextAuthorized:false
        };
        this.answers = this.props.anwsers.allAnswers;
    }

    componentDidMount() {
        this.interactions = this.context.interactions;
        this.episodeSoundtrack = this.context.episodeSoundtrack
        this.handleSound()
    };

    handleSound = () => {
        let tab = {};
        // setTimeout(()=>{
        for(let i = 0; i<this.interactions.length; i++){
            if(this.interactions[i].soundSequences.length !== 0){
                let sq = [ this.interactions[i].soundSequences[0].beginAt, this.interactions[i].soundSequences[0].duration]
                tab[this.interactions[i].name] = sq;
            }
        }
        // }, 0);
        let sound = new Howl({
            src: [Sound],
            sprite: tab // TODO Uncomment
        });
        sound.once('load', ()=>{
            // console.log('episode sound is loaded')
            // this.props.onButtonPressed();
            console.log('load')
            this.setState({
                soundLoaded : true
            })
            this.handleInteraction(this.state.interactionPosition, '');
        });
        this.setState({
            episodeSounds : sound
        }, ()=>{
            console.log(this.state.episodeSounds)
        })
    };
    playInteractionSound = (value) => {
        this.update();
        this.state.episodeSounds.play(value);
        if (this.state.episodeSounds && this.state.episodeSounds._sprite[value]
            && this.state.episodeSounds._sprite[value][1]) {
            return [this.state.episodeSounds, this.state.episodeSounds._sprite[value][1]]
        }
    };
    update = () => {
        // console.log(time)
        if(this.state.episodeSounds && this.state.interaction) {
            // let inte = this.interactions.find(setting => setting.name === value);
            let soundTime = Math.floor(((this.state.interaction.soundSequences[0].beginAt + this.state.interaction.soundSequences[0].duration)/1000)*10)/10
            this.currentTime = Math.round(this.state.episodeSounds.seek()*10)/10
            if (!this.state.goNextAuthorized && this.currentTime >= soundTime && this.state.interaction.interactionType === "none") {
                this.setState({
                    goNextAuthorized : true
                }, ()=>{
                    this.handleAnswer('nothing')
                })
                return
            }
        }
        requestAnimationFrame(this.update.bind(this))

    };

    handleInteraction = (newPos, origin) => {

        let inte = this.interactions.find(setting => setting.position === newPos);
        let indication = false
        if (inte && this.interactions) {
            if (inte.indication) {
                indication = true;
            }
            if(this.state.interaction && this.state.interaction.interactionType === 'drag and drop'){
                setTimeout(()=>{
                    this.setState({
                        show: !this.state.show,
                        interaction: inte,
                    })
                }, 2000)
            }else{
                this.setState({
                    show: !this.state.show,
                    interaction: inte,
                })
            }
            this.setState({
                indication: indication,
                origin: origin,
                goNextAuthorized : false,
                soundSequence: this.playInteractionSound(inte.name)
            }, () => {
                if (this.state.interaction && this.state.interaction.interactionType === 'drag and drop' && (this.state.interaction.position === 20 || this.state.interaction.position === 28)) {
                    setTimeout(() => {
                        this.setState({
                            show: true
                        });
                    }, this.state.soundSequence[1] - 1000)
                } else {
                    this.setState({
                        show: true
                    });
                }
            })
        }
    };
    handleAnswer = (origin, value) => {
        // console.log(origin, value)
        let answer = (value) ? value : null;
        let destinationFound = false;
        if (this.state.origin !== origin) {
            if (this.answers && this.state.interaction) {
                // console.log(this.answers)
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
                {!this.state.soundLoaded? <Loader/> : null}
                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "music" ?
                    // getMusics
                    <div className="Interactions__music">
                        <Query query={getMusics} notifyOnNetworkStatusChange>
                            {({loading, error, data, refetch, networkStatus}) => {
                                if (networkStatus === 4) return "Refetching!";
                                if (loading) return <Loader/>;
                                if (error) return (<ErrorScreen/>);
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
                    <Hours duration={5000} hours={22} minutes={26} onEnd={this.handleAnswer}/>
                    : null}
                {/*TODO Fix error or handle it differently */}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "taking position" ?
                    <TakingPosition arguers={this.state.interaction.content.split('@')} onEnd={this.handleAnswer}/>
                    : null}
                {this.state.show && this.state.interaction && (this.state.interaction.interactionType === "animation" || this.state.interaction.interactionType === "animation-bis") ?
                    <AnimationLottie name={this.state.interaction.content} timer={this.state.soundSequence[1]}
                                     onEnd={this.handleAnswer} animationType={this.state.interaction.interactionType}/>
                    : null}

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "credits" ?
                    <Credits />
                    : null}

                <div
                    className={this.state.show && this.state.interaction && this.state.interaction.indication ? 'Notice__wrapper' : 'Notice__wrapper hide'}>
                    <Notice
                        notice={this.state.interaction && this.state.interaction.indication ? this.state.interaction.indication : null}/>
                </div>
            </div>
        )
    }
}

Interactions.contextType = SoundContext;
export default Interactions;
