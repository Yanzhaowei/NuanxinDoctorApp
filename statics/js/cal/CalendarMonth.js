'use strict'

import React, {
  Alert,
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import MonthBody from './MonthBody';

const DAYDIFF=86400000;

function initMonthDayData(monthShowed) {
  monthShowed.setDate(1);
  let index = monthShowed.getDay();
  let pageFirstDay = new Date(monthShowed.getTime() - DAYDIFF * index);
  let monthDayData = new Array(6);
  let i = 0;
  let j = 0;
  for (i = 0; i < 6; i++) {
    monthDayData[i]= new Array(7);
  }
  let dayOffset=0;
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 7; j++) {
      monthDayData[i][j]=new Date(pageFirstDay.getTime()+DAYDIFF*dayOffset);
      dayOffset++;
    }
  }
  return monthDayData;
}


class CalendarMonth extends Component {
  constructor(props) {
    super(props)
    this.state={
      // monthShowed: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
      //monthShowed: this.props.monthShowed,
      monthDayData: initMonthDayData(this.props.monthShowed),
    }
  }

  changeMonth(direct) {
    let tmp=new Date(this.props.monthShowed.getFullYear(), this.props.monthShowed.getMonth() + direct, this.props.monthShowed.getDate(), 0, 0, 0, 0);
    this.props.changeMonth(tmp)
    this.setState({monthDayData: initMonthDayData(tmp)});

  }

  render() {
    let calendarTitle = this.props.monthShowed.getFullYear()+'-'+(this.props.monthShowed.getMonth()+1);
    return (

      <TouchableHighlight
        underlayColor='rgba(34,26,38,0.1)'
        onPress={()=>{this.props.changeType('monthly')}}
      >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.changeMonth(-1)}>
            <Text style={styles.switchText}>上一月</Text>
          </TouchableHighlight>
          <Text style={styles.monthShowedText}>{calendarTitle}</Text>

          <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.changeMonth(1)}>
            <Text style={styles.switchText}>下一月</Text>
          </TouchableHighlight>
        </View>

          <MonthBody monthDayData={this.state.monthDayData} monthShowed={this.props.monthShowed}/>

      </View>

    </TouchableHighlight>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    height: 314,
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
  weekdayDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekdayDaysText: {
		fontSize: 16,
		fontWeight: '100',
		color: '#333333',
  },
});

export default CalendarMonth;
