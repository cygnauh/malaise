import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';
import { SoundContext } from "../../../store/SoundProvider";

class MusicChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            hover: false
        }
        this.musics = this.props.musics
    }

    componentDidMount() {
        this.repeatNameMusic();
        this.context.handleMusicChoices(this.musics)
    }

    repeatNameMusic = () => {
        var musics = document.getElementsByClassName('Music__name');
        for (var i = 0; i < musics.length; i++) {
            var $this =  musics[i];
            var name = $this.dataset.after;
            $this.innerHTML = '<span>' + name.repeat(10) + '</span>';
            $this.dataset.after = name.repeat(10);
        }
    }

    handleClickMusic = (e) => {
        this.setState({
            selected: !this.state.selected
        })
        var $el = e.currentTarget;
        $el.setAttribute("class", "Music__item Music__item--selected");
        setTimeout(() => {
            this.props.onMusicClicked('music')
        }, 2000);
    }

    handleMouseEnter = (e) => {
        var $el = $(e.currentTarget);
        var style = $el.find('.Music__name').data('name');

        this.setState({
            hover: true
        },() => {
            let sound = this.musics.find(setting => setting.name === style);
            if(!this.state.selected){
                this.context.handleMusic(sound.url, "play");
            }
        });
    };

    handleMouseLeave = () => {
        this.setState({
            hover: false
        }, ()=>{
            if(!this.state.selected){
                this.context.handleMusic(null, "pause");
            }
        });
    };

    render() {
        return (
            <div className="Music">
                <ul className={this.state.selected ? 'Music__list Music__list--select' : 'Music__list' }>
                    <div className="Music__content">
                        <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                            <div className="Music__name Music__name--toLeft" data-name="pop" data-after="pop "></div>
                        </li>
                    </div>
                    <div className="Music__content">
                        <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                            <div className="Music__name Music__name--toRight" data-name="electro" data-after="electro "></div>
                        </li>
                    </div>
                    <div className="Music__content">
                        <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                            <div className="Music__name Music__name--toLeft" data-name="rap" data-after="rap "></div>
                        </li>
                    </div>
                </ul>
            </div>
        )
    }

}

MusicChoice.contextType = SoundContext;
export default MusicChoice;