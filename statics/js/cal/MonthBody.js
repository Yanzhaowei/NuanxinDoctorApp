'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import WeekdayLine from './WeekdayLine';
import WeekdayName from './WeekdayName';

class MonthBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;
    let body = [];
    for (i = 0; i < 6; i++) {
      body.push(<WeekdayLine key={i} weekDayData={this.props.monthDayData[i]} monthShowed={this.props.monthShowed}/>)
    }
    return (
      <View style={styles.body}>
        <WeekdayName />
        {body}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 280,
  },
});

export default MonthBody;
