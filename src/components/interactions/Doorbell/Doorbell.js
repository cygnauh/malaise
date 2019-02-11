import React, { Component } from 'react';
import Lottie from 'react-lottie';
import boumboum from '../../../assets/animation/boumboum'
import './style.scss';
import { SoundContext } from "../../../store/SoundProvider";
import $ from 'jquery';

// doorbell, boum

class Doorbell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            activeBell: false,
            clickedBell: false,
            displayAnim:false,
            host: ''
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

    handleClick(e) {
        this.setState({
            activeBell:true
        });
        if(e.target.classList.contains(this.btnBell)) {
            e.preventDefault();
            this.setState({
                clickedBell:true,
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

    handleChange = (e) => {

        this.setState({
            host: e.target.value
        })
        //
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
                            <div className="bell__container">
                                <div className="bell__input-border">
                                    <input className="bell__input"
                                           type="text"
                                           value={this.state.host}
                                           onChange={this.handleChange}
                                           placeholder="son prénom" />
                                </div>
                                <div className={this.state.clickedBell ? 'bell__btn bell__btn--clicked': 'bell__btn'}>
                                    <button className={this.state.activeBell ? 'btn btn__input btn__bell': 'btn btn__input'}
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
            </div>
        )
    }

}
Doorbell.contextType = SoundContext;
export default Doorbell;