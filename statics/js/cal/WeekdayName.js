'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import WeekdayNameItem from './WeekdayNameItem';

const WEEKDAY=['日','一','二','三','四','五','六'];

class WeekdayName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;
    let names = [];
    for (i = 0; i < 7; i++) {
      names.push(<WeekdayNameItem key={i} dayName = {WEEKDAY[i]} />);
    }
    return (
      <View style={styles.weekdayName}>
        {names}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weekdayName: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default WeekdayName;
