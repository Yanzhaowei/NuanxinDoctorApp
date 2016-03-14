'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class WeekdayNameItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.weekdayNameText}>{this.props.dayName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  weekdayNameText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 12,
		fontWeight: '100',
		color: '#666666',
  },
});

export default WeekdayNameItem;
