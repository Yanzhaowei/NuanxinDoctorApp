'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const ITEMSIZE = 26;
class WeekdayLineItem extends Component {
  constructor(props) {
    super(props);
  }

  checkEvents() {

  }

  render() {
    let today=new Date();
    if (this.props.itemDate.getDate() === today.getDate() &&
        this.props.itemDate.getMonth() === today.getMonth() &&
        this.props.itemDate.getFullYear() === today.getFullYear()
    ) {
      return (
        <TouchableHighlight
          underlayColor = 'rgba(34,26,38,0.1)'
          onPress = {() => {this.checkEvents()}}
          style = {styles.today}
        >
          <Text style={styles.weekdayDaysText}>{this.props.itemDate.getDate()}</Text>
        </TouchableHighlight>
      )
    }
    else if (this.props.itemDate.getMonth() !== this.props.monthShowed.getMonth() ||
            this.props.itemDate.getFullYear() !== this.props.monthShowed.getFullYear()
    ) {
      return (
        <TouchableHighlight
          underlayColor = 'rgba(34,26,38,0.1)'
          onPress = {() => {this.checkEvents()}}
          style = {styles.container}
        >
          <Text style={styles.notCurrentMonthText}>{this.props.itemDate.getDate()}</Text>
        </TouchableHighlight>
      );
    }
    else {
      return (
        <TouchableHighlight
          underlayColor = 'rgba(34,26,38,0.1)'
          onPress = {() => {this.checkEvents()}}
          style = {styles.container}
        >
          <Text style={styles.CurrentMonthText}>{this.props.itemDate.getDate()}</Text>
        </TouchableHighlight>
      );
    }

  }
}

const styles = StyleSheet.create({
  today: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEMSIZE,
    width: ITEMSIZE,
    borderRadius: ITEMSIZE / 2,
    backgroundColor: '#F08300',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEMSIZE,
    width: ITEMSIZE,
    borderRadius: ITEMSIZE / 2,
  },
  CurrentMonthText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 12,
		fontWeight: '100',
		color: '#333333',
  },
  notCurrentMonthText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 12,
		fontWeight: '100',
		color: '#999999',
  },
});

export default WeekdayLineItem;
