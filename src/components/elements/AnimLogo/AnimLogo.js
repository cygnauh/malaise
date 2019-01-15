import React, { Component } from 'react';
import "./style.scss";

class AnimLogo extends Component {

    constructor(props) {
        super(props);
        if (this.isTouch) {
            return;
        }

        this.animWrapper = React.createRef();
        console.log(this.animWrapper);



        /*this.$el = this.logoWrapper;
        this.$chars = this.initChars();

        this.mouseX = 0;
        this.mouseY = 0;
        this.homeX = 0;
        this.homeY = 0;
        this.forceX = 0;
        this.forceY = 0;
        this.magnet = 200;

        this.isUpdating = false;
        this.isEnabled = true;

        this.bind();
        this.start();*/
    }

    /*updateFps = () => {
        if (!this.lastFrameTime) {
            this.lastFrameTime = Date.now();
            this.fps = 0;
        } else {
            this.delta = (Date.now() - this.lastFrameTime) / 1000;
            this.lastFrameTime = Date.now();
            this.fps = 1 / this.delta;
        }
        requestAnimationFrame(this.updateFps);
    }

    bind = () => {
        $(window).on('scroll', this.handleScroll.bind(this));
        $(window).on('mousemove', this.handleMouseMove.bind(this));
    }

    start = () => {
        requestAnimationFrame(this.update.bind(this));
    }

    handleScroll = () => {
        this.isEnabled = window.scrollY < 50;
    }

    handleMouseMove = (e) => {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }

    initChars = () => {

        var self = this;
        var $chars = this.$el.find('span');

        console.log('chars', $chars);

        $chars.each(function(i, el) {
            self.initChar($(el));
        });

        return $chars;
    }

    initChar = ($el) => {
        var pos = $el.position();
        $el[0].dataset.homeX = parseInt(pos.left, 10);
        $el[0].dataset.homeY = parseInt(pos.top, 10);

        setTimeout(function() {
            $el.css('position', 'absolute');
        }, 10);
    }

    update = () => {
        var self = this;
        var isSlow = this.isRendered && this.fps < 30;

        if (this.isUpdating) {
            return;
        }

        if (this.isEnabled && !isSlow) {
            this.isUpdating = true;
            var $els = this.$chars.get();
            this.writeCharUpdates($els, this.getCharUpdates($els))
            this.isUpdating = false;
        }

        this.isRendered = true;
        requestAnimationFrame(this.update.bind(this));
    }

    getCharUpdates = ($els) => {
        return $els.map(function($el) {
            var homeX = $el.dataset.homeX;
            var homeY = $el.dataset.homeY;

            var x0 = $el.offsetLeft;
            var y0 = $el.offsetTop;
            var x1 = this.mouseX;
            var y1 = this.mouseY;

            var distanceX = x1 - x0;
            var distanceY = y1 - y0;

            var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

            this.powerX = x0 - (distanceX / distance) * this.magnet / distance;
            this.powerY = y0 - (distanceY / distance) * this.magnet / distance;

            this.forceX = (this.forceX + (homeX - x0) / 2) / 2;
            this.forceY = (this.forceY + (homeY - y0) / 2) / 2;

            var rotate = Math.floor(homeX - (this.powerX + this.forceX)) / 7.5;

            return {
                left: this.powerX + this.forceX,
                top: this.powerY + this.forceY,
                rotate: 'rotateZ(' + rotate + 'deg)'
            }
        }.bind(this))
    }

    writeCharUpdates = ($els, updates) => {
        $els.forEach(function($el, i) {
            $el.style.left = updates[i].left + 'px';
            $el.style.top = updates[i].top + 'px';
            $el.style.transform = updates[i].rotate;
        });
    }*/

    render() {
        return (
            <div className="AnimLogo">
                <div className="AnimLogo__container" ref={this.animWrapper}>
                    <span><img src={require('../../../assets/icons/logo/logo_m.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_a.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_l.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_a.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_i.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_s.svg')}/></span>
                    <span><img src={require('../../../assets/icons/logo/logo_e.svg')}/></span>
                </div>
            </div>
        );
    }
}

export default AnimLogo;