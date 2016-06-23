import React from  'react'
import classNames from 'classnames'

var Paginator = React.createClass({
    propTypes: {
        currPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    prevPageClicked(evt) {
        evt.preventDefault();

        if (this.props.currPage > 1) {
            this.props.onChange(Number(this.props.currPage) - 1);
        }
    },
    nextPageClicked(evt) {
        evt.preventDefault();

        if (this.props.currPage < this.props.lastPage) {
            this.props.onChange(Number(this.props.currPage) + 1);
        }
    },
    pageClicked(pageNum, evt) {
        evt.preventDefault();

        if (this.props.currPage != pageNum) {
            this.props.onChange(Number(pageNum));
        }
    },
    renderPrevious() {
        var classStr = classNames('item', { disabled: this.props.currPage <= 1 });
        return (
          <a key="prev" className={classStr}  onClick={this.prevPageClicked}>
            <i className="angle left icon"/>
          </a>
        );
    },
    renderNext() {
        var classStr = classNames('item', { disabled: this.props.currPage >= this.props.lastPage });
        return (
          <a key="next" className={classStr}  onClick={this.nextPageClicked}>
            <i className="angle right icon"/>
          </a>
        );
    },
    renderDots(key) {
        return <a key={key} className="disabled item"><span>....</span></a>
    },
    renderNumber(num) {
        var classStr = classNames('item', { active: this.props.currPage == num });
        return (
          <a key={num} className={classStr}  onClick={this.pageClicked.bind(this, num)}>
            {num}
          </a>
        );
    },
    renderRange(firstNum, lastNum) {
        var pages = [];
        for (var i = firstNum; i <= lastNum; i++) {
            pages.push(this.renderNumber(i));
        }
        return pages;
    },
    renderStart() {
        var pages = this.renderRange(1, 2);
        pages.push(this.renderDots('dots-start'));

        return pages;
    },
    renderFinish() {
        var pages = this.renderRange(this.props.lastPage-1, this.props.lastPage);
        pages.unshift(this.renderDots('dots-finish'));

        return pages;
    },
    renderAdjacentRange() {
        return this.renderRange(this.props.currPage-2, this.props.currPage+2);
    },
    renderSlider() {
        var sliderNum = 6;
        var buttons = [];

        if (this.props.currPage <= sliderNum) {
            buttons = buttons.concat(this.renderRange(1, sliderNum+2));
            buttons = buttons.concat(this.renderFinish());
        }

        else if (this.props.currPage >= this.props.lastPage - sliderNum) {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderRange(this.props.lastPage-sliderNum, this.props.lastPage));
        }

        else {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderAdjacentRange());
            buttons = buttons.concat(this.renderFinish());
        }

        return buttons;
    },
    render() {
        var buttons = [];

        buttons.push(this.renderPrevious());

        if (this.props.lastPage <= 13) {
            buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
        }
        else {
            buttons = buttons.concat(this.renderSlider());
        }

        buttons.push(this.renderNext());

        return (
          <div className="ui pagination menu">
            {buttons}
          </div>
        );
    }
});

module.exports = Paginator;
