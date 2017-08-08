import React, { Component } from 'react';
import './Calendar.css';
import datelib from '../../libs/DateLib';

class Calendar extends Component{

    constructor(props){
        super(props)

        this.onChangeCalendar = this.onChangeCalendar.bind(this)

        this.state = {
            dateActive: datelib.currentDate()
        }

    }

    getCalendar(){
        var days = []
        for(let day=0; day<7; day++){
            days[day] = datelib.getNextDay(day)
        }
        return days
    }

    onChangeCalendar(date){
        this.setState({
            dateActive: date
        })
        this.props.onChangeCalendar(date)
    }

    render () {

        let dateData = this.getCalendar()
        let { dateActive } = this.state

        return (
            <div className="container calendar-block">
                <div className="columns is-mobile">
                    { dateData.map((day, i) => 
                    <div className="column has-text-centered" key={i}>
                        <div className={'list' + (day.fullDate === dateActive?' active':'')} onClick={()=>this.onChangeCalendar(day.fullDate)}>
                            <strong>{day.day}</strong>
                            <p><small>{day.month} {day.date}</small></p>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Calendar;