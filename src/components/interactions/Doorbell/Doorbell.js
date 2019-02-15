import React, { Component } from 'react';
import Lottie from 'react-lottie';
import boumboum from '../../../assets/animation/anim_2_1_boumboum_long'
// import boumboum from '../../../assets/animation/boumboum'
import Notice from '../../elements/Notice/Notice'
import './style.scss';
import { SoundContext } from "../../../store/SoundProvider";
import $ from 'jquery';

class Doorbell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            activeBell: false,
            clickedBell: false,
            displayAnim:false,
            host: '',
            emptyInput: true,
            indication:'Entre le prénom de ton amie.',
            show: false
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: boumboum,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        this.btnBell = 'btn__bell';
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            show: true
        });
        this.context.playGreeting('offHote')
    }
    handleClick(e) {
        this.setState({
            activeBell:true,
            indication:'Clique sur la sonnette.'
        }, ()=>{this.setState({fix:''})});
        if(e.target.classList.contains(this.btnBell)) {
            e.preventDefault();
            this.setState({
                clickedBell:true,
                show: false
            });
            setTimeout(function(){
                this.setState({
                    clickedBell:false,
                });
            }.bind(this), 200);
        }
        if(this.state.activeBell){
            this.context.playDoorBell(); // TODO handle, only on the second click
            // play the boom
            setTimeout(()=>{
                $('body').removeClass('interface-reverse').addClass('episode');
                this.setState({
                    displayAnim:true
                },()=>{
                    let name = [];
                    name.push({name:'hote'})
                        this.props.onHostRegister(0,name, this.state.host)
                    })

            }, 1800);
            setTimeout(()=>{
                this.props.onDoorbellPressed()
            }, 5800)

        }
    };

    onKeyPressed = (e) => {
        if (e.keyCode === 13) {
            $(e.currentTarget).attr({
                'disabled': 'disabled'
            });
            this.handleClick(e);
        }
    }

    handleChange = (e) => {

        if($(e.currentTarget).val() === '') {
            $('.btn__input').addClass('empty');
        } else {
            $('.btn__input').removeClass('empty');
        }

        this.setState({
            host: e.target.value
        })

    };

    render() {
        return (
            <div className="Doorbell">
                {!this.state.displayAnim ?
                <div className={this.state.activeBell ? 'Doorbell__container Doorbell__animation': 'Doorbell__container'}>
                    <h1 className="Doorbell__label"><span>Tu arrives chez ta pote qui fait une soirée posée.</span></h1>
                    <div className="Doorbell__bell bell">
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                        <div className="bell__box">
                            <div className={this.state.emptyInput ? "bell__container" : "bell__container"}>
                                <div className="bell__input-border">
                                    <input className="bell__input"
                                           type="text"
                                           value={this.state.host}
                                           onChange={this.handleChange}
                                           onKeyDown={this.onKeyPressed}
                                           placeholder="son prénom" />
                                </div>
                                <div className={this.state.clickedBell ? 'bell__btn bell__btn--clicked': 'bell__btn'}>
                                    <button className={this.state.activeBell ? 'btn btn__input btn__bell': 'btn btn__input empty'}
                                            onClick={this.handleClick}>
                                        <span>ok</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                        <div className="repeat-bell__box">
                            <div className="repeat-bell__container">
                                <div className="repeat-bell__input"></div>
                                <div className="repeat-bell__btn"></div>
                            </div>
                        </div>
                    </div>
                </div> : <Lottie options={this.defaultOptions}/> }
                <div
                    className={this.state.show && this.state.indication ? 'Notice__wrapper' : 'Notice__wrapper hide'}>
                    <Notice
                        notice={this.state.indication ? this.state.indication : null}/>
                </div>
            </div>
        )
    }

}
Doorbell.contextType = SoundContext;
export default Doorbell;