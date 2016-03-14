'use strict'

import React, {
  Text,
  Image,
  Component,
  View,
  Alert,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import WeekdayName from './WeekdayName';
import WeekdayLine from './WeekdayLine';

var weekSquence=[25,26,27,28,29,30,31];

const DAYDIFF=86400000;

function initWeekDayData(monthShowed) {
  let index = monthShowed.getDay();
  let weekFirstDay = new Date(monthShowed.getTime() - DAYDIFF * index);
  let weekDayData = new Array(7);
  let i = 0;
  for (i = 0; i < 7; i++) {
    weekDayData[i]= new Date(weekFirstDay.getTime() + DAYDIFF * i);
  }

  return weekDayData;
}

class CalendarWeek extends Component{
  constructor(props) {
    super(props)
    this.state={
      // monthShowed: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
      // monthShowed: this.props.monthShowed,
      weekDayData: initWeekDayData(this.props.monthShowed),
    }
  }

  changeWeek(direct) {
    let newDate = new Date(this.props.monthShowed.getTime() + direct * DAYDIFF * 7);
    this.setState({weekDayData: initWeekDayData(newDate)});
    this.props.changeMonth(newDate);
  }

  render() {
    let calendarTitle = this.props.monthShowed.getFullYear()+'-'+(this.props.monthShowed.getMonth()+1);
    return (
      <TouchableHighlight
        underlayColor='rgba(34,26,38,0.1)'
        onPress={()=>{this.props.changeType('weekly')}}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.changeWeek(-1)}>
            <Text style={styles.switchText}>上一周</Text>
          </TouchableHighlight>
          <Text style={styles.monthShowedText}>{calendarTitle}</Text>

          <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.changeWeek(1)}>
            <Text style={styles.switchText}>下一周</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <WeekdayName />
          <WeekdayLine weekDayData={this.state.weekDayData} monthShowed={this.props.monthShowed}/>
        </View>
      </View>

    </TouchableHighlight>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    height: 114,
    flex: 1,
  },
  topBar: {
    padding: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 34,
    backgroundColor: '#FFFFFF'
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 80,
  },
  switchText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 12,
		fontWeight: '100',
		color: '#666666',
  },
  monthShowedText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 16,
		fontWeight: '100',
		color: '#F08300',
  },
});

export default CalendarWeek;
