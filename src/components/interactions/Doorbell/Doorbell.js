import React, { Component } from 'react';
import Lottie from 'react-lottie';
import boumboum from '../../../assets/animation/boumboum'
import './style.scss';
import { SoundContext } from "../../../store/SoundProvider";

// doorbell, boum

class Doorbell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            activeBell: false,
            clickedBell: false,
            displayAnim:false
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
                this.setState({displayAnim:true})
            }, 500)
            setTimeout(()=>{
                this.props.onDoorbellPressed()
            }, 5000)

        }
    }

    render() {
        return (
            <div className="Doorbell">
                {!this.state.displayAnim ?
                <div className="Doorbell__container">
                    <div className={this.state.activeBell ? 'Doorbell__bell Doorbell__animation bell': 'Doorbell__bell bell'}>
                        <label>ce soir tu es invité(e) chez ta pote qui fait une soirée posée</label>
                        <div className="bell__box">
                            <div className="bell__container">
                                <div className="bell__input-border">
                                    <input className="bell__input" type="text" placeholder="son prénom" />
                                </div>
                                <div className={this.state.clickedBell ? 'bell__btn bell__btn--clicked': 'bell__btn'}>
                                    <button className={this.state.activeBell ? 'btn btn__input btn__bell': 'btn btn__input'} onClick={this.handleClick}>
                                        <span>OK</span>
                                    </button>
                                </div>
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