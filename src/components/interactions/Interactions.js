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
import Sound from "./../../assets/sounds/voix_3_1_dialogue.mp3"
import Information from "../pages/Information/Information";


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
            goNextAuthorized:false,
            info: false
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
        //     sprite:{
        //     proposition_jeu: [11980, 7390], // ok
        //     question_regles: [19475, 3635], // ok
        //     explication_regles: [23190, 5210], //ok
        //     choix_boisson:[28400, 2690], //ok
        //     choix_boisson_a:[31090, 910], // ok
        //     je_n_ai_jamais1:[32300, 3200], // ok
        //     je_n_ai_jamais1_r:[35500, 4450], // ok
        //     je_n_ai_jamais1_a:[39950, 930], //ok
        //     reaction1:[42100, 5300], // ok
        //     anecdote1:[47400, 40800], // ok ----> CHECK OUT
        //     // anecdote1bis:[63095, 24605], //ok
        //     je_n_ai_jamais_user:[88200, 2800], // ok
        //     reaction2:[94920, 2175], // ok
        //     heure2:[97095, 1000],
        //     // je_n_ai_jamais3_r:[98400, 4500], // ok
        //         // --
        //     je_n_ai_jamais3:[102900, 12600], // ok
        //     // je_n_ai_jamais3_p:[104000, 26400], //ok
        //     // je_n_ai_jamais3_a:[0, 0],
        //     // reaction3:[132105, 15695], // ok
        //     anecdote2:[148300, 46200], // ok
        //     je_n_ai_jamais4_r:[194500, 3730], //ok
        //     je_n_ai_jamais4:[198230, 2270], // ok
        //     reaction4:[201320, 53400], // ok
        //     recherche_google:[254720, 58290], // ok
        //     // reaction4_c:[312510, 5120], // ok
        //     je_n_ai_jamais5:[317630, 14370], //ok
        //     reaction5:[333500, 2890],//ok
        //     fin:[335890, 20610], //ok
        // // ----- udaapte value
        //     je_n_ai_jamais3_r:[97900, 4500], // ok
        //     je_n_ai_jamais3:[102900, 12600], // ok
        //     je_n_ai_jamais3_p: [115500, 10300], // ok for taking position
        //     je_n_ai_jamais3_a: [125800, 6805], // ok --> maybe drag and drop display later : maybe add another interaaction or setTimeOut or playing at the end
        //     reaction3:[132605, 15695],
        //     // je_n_ai_jamais3_a: [125300, 10000], // ok
        //     recherche_google:[254220, 58290], // ok
        //     fin:[336390, 20610], //ok,
        //     reaction4_c:[313010, 16220], // ok
        //     je_n_ai_jamais5:[318130, 14370], //ok
        // },
            sprite: tab // TODO Uncomment
        });
        sound.once('load', ()=>{
            this.setState({
                soundLoaded : true
            })
            this.handleInteraction(this.state.interactionPosition, '');
        });
        // sound.play('je_n_ai_jamais5')
        this.setState({
            episodeSounds : sound
        })
    };
    playInteractionSound = (value) => {
        this.state.episodeSounds.play(value);
        if (this.state.episodeSounds && this.state.episodeSounds._sprite[value]
            && this.state.episodeSounds._sprite[value][1]) {
            return [this.state.episodeSounds, this.state.episodeSounds._sprite[value][1]]
        }
    };

    handleInteraction = (newPos, origin) => {

        let inte = this.interactions.find(setting => setting.position === newPos);
        console.log(inte)
        let indication = false
        if (inte && this.interactions) {
            if (inte.indication) {
                indication = true;
            }
            if(this.state.interaction && this.state.interaction.interactionType === 'drag and drop' ){
                setTimeout(()=>{
                    this.setState({
                        show: !this.state.show,
                        interaction: inte,
                    })
                }, 4000)
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
                let isEnded = false
                console.log(inte.interactionType, this.state.show, )
                this.state.soundSequence[0].on('end', () => {
                    // console.log('ONEND', this.state.soundSequence[0])
                    // console.log(new_time, 'new_time', this.state.soundSequence[1], 'duration')
                    isEnded = true
                    console.log(isEnded, 'isEnded')
                    if (newPos <= 15 && this.state.interaction.interactionType === "none") {
                    // if (this.state.interaction.interactionType === "none") {
                    //     if (this.state.interaction.interactionType === "none") {
                        if (inte.interactionType === "none") {
                            this.handleAnswer('nothing')
                        }
                    }
                });
                // if (this.state.interaction.interactionType === "none") {
                if (inte.interactionType === "none") {
                    if (newPos > 15) {
                        setTimeout(() => {
                            if (isEnded) {
                                this.handleAnswer('nothing')
                            } else {
                                setTimeout(() => {
                                    if (isEnded) {
                                        this.handleAnswer('nothing')
                                    }
                                }, 1)
                            }
                            console.log('time')
                        }, this.state.soundSequence[1])
                    }
                }

                if (this.state.interaction &&
                    (
                        (this.state.interaction.interactionType === 'drag and drop' &&
                        (this.state.interaction.position === 20 || this.state.interaction.position === 27)) ||
                        this.state.interaction.interactionType === 'credits')
                ) {
                    console.log("jjjj",this.state.interaction.position)
                    setTimeout(() => {
                        this.setState({
                            show: true
                        });
                    }, this.state.soundSequence[1] - 1000)
                } else {
                    console.log('ZZ')
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

    showInfo = () => {
        this.setState({
            info: true,
            show: false
        })
    }

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

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "drag and drop" && this.state.interaction.position === 27 ?
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

                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "credits" && this.state.info === false ?
                    <Credits info={this.showInfo} />
                    : null}

                {this.state.info ?
                    <Information />
                : null }

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
