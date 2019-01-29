import React, { Component } from 'react';
import './style.scss';

class MusicChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    componentDidMount() {
        this.repeatNameMusic();
    }

    repeatNameMusic = () => {
        var musics = document.getElementsByClassName('Music__name');
        for (var i = 0; i < musics.length; i++) {
            var $this =  musics[i];
            var name = $this.dataset.name;
            $this.innerHTML = '<span>' + name.repeat(10) + '</span>';
            $this.dataset.name = name.repeat(10);

        }
    }

    handleClickMusic = (e) => {
        this.setState({
            selected: !this.state.selected
        })
        var $el = e.currentTarget;
        $el.setAttribute("class", "Music__item Music__item--selected");
    }

    render() {
        return (
            <div className="Music">
                <ul className={this.state.selected ? 'Music__list Music__list--select' : 'Music__list' }>
                    <li className="Music__item" onClick={this.handleClickMusic}>
                        <div className="Music__name Music__name--toLeft" data-name="pop "></div>
                    </li>
                    <li className="Music__item" onClick={this.handleClickMusic}>
                        <div className="Music__name Music__name--toRight" data-name="electro "></div>
                    </li>
                    <li className="Music__item" onClick={this.handleClickMusic}>
                        <div className="Music__name Music__name--toLeft" data-name="rap "></div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default MusicChoice;