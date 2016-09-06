/*
 Creator: Maelig GOHIN For ARCA-Computing - www.arca-computing.fr
 Creation date: October 2015
 Version: 1.0.2
 Description:  MultipleDatePickerReact is a React component to show a simple calendar allowing user to select multiple dates.
 Css style can be changed by editing less or css stylesheet.
 Feel free to edit and share this piece of code, our idea is to keep it simple ;)
 */

 import React from 'react';
 import moment from 'moment';

var MultipleDatePickerDay = React.createClass({
	componentWillMount: function(){
		this.setState({
			selected: this.props.selected || false
		});
	},
	handleClick: function(){
		if(!this.props.notSelectable && (typeof this.props.dayClick !== 'function' || this.props.dayClick.call(this.props.dayClickContext, this.props.day.clone(), this.state.selected))){
			var newState = !this.state.selected;
			this.setState({selected: newState});
			this.props.daySelectionChanged(this.props.day, newState);
		}
	},
	handleHover: function(){
		if(typeof this.props.dayHover === 'function'){
			this.props.dayHover.call(this.props.callbackContext, this.props.day.clone(), this.state.selected);
		}
	},
	render: function(){
		var classes = 'text-center picker-day';
		classes += this.state.selected ? ' picker-selected' : '';
		classes += this.props.day.isSame(moment(), 'DAY') ? ' today' : '';
		classes += this.props.day.isBefore(moment(), 'DAY') ? ' past' : '';
		classes += this.props.day.isAfter(moment(), 'DAY') ? ' future' : '';
		classes += this.props.notSelectable ? ' picker-off' : '';
		classes += ' ' + (this.props.css || '');
		return (<div className={classes} title={this.props.title} onClick={this.handleClick} onMouseEnter={this.handleHover}>{this.props.day.format('D')}</div>);
	}
});

var MultipleDatePicker = React.createClass({
	componentWillMount: function() {
		var month = this.props.month ? (moment.isMoment(this.props.month) ? this.props.month : moment(this.props.month)) : moment(),
			highlightDays = [];

        if(Object.prototype.toString.call(this.props.highlightDays) === '[object Array]'){
        	highlightDays = this.props.highlightDays.map(function(hDay){
        		var nHday = hDay;
        		if(!moment.isMoment(nHday.day)){
        			nHday.day = moment(nHday.day);
        		}
        		return nHday;
        	});
        }


		this.setState({
			month: month,
			highlightDays: highlightDays,
			weekDaysOff: this.props.weekDaysOff || []
		});
	},
  componentWillReceiveProps: function(nextProps) {
    if (nextProps !== this.props) {
      var highlightDays = [];

      if(Object.prototype.toString.call(nextProps.highlightDays) === '[object Array]'){
        highlightDays = nextProps.highlightDays.map(function(hDay){
          var nHday = hDay;
          if(!moment.isMoment(nHday.day)){
            nHday.day = moment(nHday.day);
          }
          return nHday;
        });
      }

      this.setState({
        highlightDays: highlightDays
      });
    }
  },
	daySelectionChanged: function(day, selected){
		var hD = this.state.highlightDays,
			found = hD.filter(function(d){
				return d.day.isSame(day, 'day');
			}),
			toChanged = {day: day, selected: selected};

		if(found.length){
			toChanged = found[0];
			var index = hD.indexOf(toChanged);
			toChanged.selected = selected;
			hD[index] = toChanged;
		}else{
			hD.push(toChanged);
		}
		this.setState({highlightDays: hD});
	},
	getDaysOfWeek: function () {
        /*To display days of week names in moment.lang*/
        var momentDaysOfWeek = moment().localeData()._weekdaysMin,
            days = [];

        for (var i = 1; i < 7; i++) {
            days.push(momentDaysOfWeek[i]);
        }

        if (this.props.sundayFirstDay) {
            days.splice(0, 0, momentDaysOfWeek[0]);
        } else {
            days.push(momentDaysOfWeek[0]);
        }

        return days.map(function(day, i){
			return (<div key={day} className="text-center">{day}</div>);
		});
    },
    getEmptyFirstDays: function(firstDayOfMonth){
	    var emptyFirstDaysStartIndex = firstDayOfMonth.day() === 0 ? (this.props.sundayFirstDay ? 0 : 6) : (firstDayOfMonth.day() - (this.props.sundayFirstDay ? 0 : 1));
	    return Array.apply(0, new Array(emptyFirstDaysStartIndex)).map(function(o, i){
			return (<div key={'emptyFirst' + i} className="text-center picker-day picker-empty">&nbsp;</div>);
		});
    },
    getEmptyLastDays: function(lastDayOfMonth){
	    var emptyLastDaysStartIndex = this.props.sundayFirstDay ? 6 : 7;
	    if (lastDayOfMonth.day() === 0 && !this.props.sundayFirstDay) {
            emptyLastDaysStartIndex = 0;
        } else {
            emptyLastDaysStartIndex -= lastDayOfMonth.day();
        }
	    return Array.apply(0, new Array(emptyLastDaysStartIndex)).map(function(o, i){
			return (<div key={'emptyLast' + i} className="text-center picker-day picker-empty">&nbsp;</div>);
		});
    },
    getDays: function(previousDay, lastDayOfMonth){
		return Array.apply(0, new Array(lastDayOfMonth.date())).map(function(x, i){
        	var day = previousDay.add(1, 'DAY').clone(),
        		hDay = this.state.highlightDays.filter(function(d){
					return d.day.isSame(day, 'day');
	    		});

			hDay = hDay[0] || {day: day};
			return (<MultipleDatePickerDay
				key={hDay.day.valueOf()}
				day={hDay.day}
				css={hDay.css}
				notSelectable={hDay.notSelectable || this.state.weekDaysOff.indexOf(day.day()) > -1}
				selected={hDay.selected}
				title={hDay.title}
				dayClick={this.props.dayClick}
				dayHover={this.props.dayHover}
				dayClickContext={this.props.callbackContext}
				daySelectionChanged={this.daySelectionChanged} />);
        }, this);
    },
    goToPreviousMonth: function(){
    	if(typeof this.props.changeMonth !== 'function' || this.props.changeMonth.call(this.props.callbackContext, this.props.month.clone(), -1)){
    		this.setState({month: this.state.month.subtract(1, 'MONTH')});
    	}
    },
    goToNextMonth: function(){
    	if(typeof this.props.changeMonth !== 'function' || this.props.changeMonth.call(this.props.callbackContext, this.props.month.clone(), 1)){
    		this.setState({month: this.state.month.add(1, 'MONTH')});
    	}
    },
	render: function(){
		var lastDayOfPreviousMonth = this.state.month.clone().date(0),
            firstDayOfMonth = this.state.month.clone().date(1),
            lastDayOfMonth = firstDayOfMonth.clone().endOf('month');

		return (
			<div className="multiple-date-picker">
        <div className="picker-top-row">
          <div className="text-center picker-navigate picker-navigate-left-arrow" onClick={this.goToPreviousMonth}>&lt;</div>
          <div className="text-center picker-month">{this.state.month.format('MMMM YYYY')}</div>
          <div className="text-center picker-navigate picker-navigate-right-arrow" onClick={this.goToNextMonth}>&gt;</div>
        </div>
        <div className="picker-days-week-row">{this.getDaysOfWeek()}</div>
        <div className="picker-days-row">
          {this.getEmptyFirstDays(firstDayOfMonth)}
          {this.getDays(lastDayOfPreviousMonth, lastDayOfMonth)}
          {this.getEmptyLastDays(lastDayOfMonth)}
        </div>
			</div>
		);
	}
});

// module.exports.MultipleDatePicker  = MultipleDatePicker;
export default MultipleDatePicker;
