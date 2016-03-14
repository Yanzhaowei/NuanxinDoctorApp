'use strict'

import React, {
  Alert,
  Component,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import WeekdayLineItem from './WeekdayLineItem';

class WeekdayLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;
    let line = [];
    for (i = 0; i < 7; i++) {
      line.push(<WeekdayLineItem key={i} itemDate={this.props.weekDayData[i]} monthShowed={this.props.monthShowed}/>);
    }
    return (
      <View style={styles.weekdayDays}>
        {line}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weekdayDaysText: {
    fontSize: 16,
    fontWeight: '100',
    color: '#333333',
  },
  weekdayDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
export default WeekdayLine;
