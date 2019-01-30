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
    }

    componentDidMount() {
        this.repeatNameMusic();
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
    }

    handleMouseEnter = (e) => {
        var $el = $(e.currentTarget);
        var style = $el.find('.Music__name').data('name');
        console.log(style);
        this.setState({
            hover: true
        });
        if(this.state.hover) {
            console.log('hover true')
            this.context.playChoiceMusic(style);
        }
        else {
            console.log('rien')
        }

    }

    handleMouseLeave = () => {
        this.setState({
            hover: false
        });
        console.log('hover false')
    }

    render() {
        return (
            <div className="Music">
                <ul className={this.state.selected ? 'Music__list Music__list--select' : 'Music__list' }>
                    <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <div className="Music__name Music__name--toLeft" data-name="pop" data-after="pop "></div>
                    </li>
                    <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <div className="Music__name Music__name--toRight" data-name="electro" data-after="electro "></div>
                    </li>
                    <li className="Music__item" onClick={this.handleClickMusic} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        <div className="Music__name Music__name--toLeft" data-name="rap" data-after="rap "></div>
                    </li>
                </ul>
            </div>
        )
    }

}

MusicChoice.contextType = SoundContext;
export default MusicChoice;