'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function test(){
  Alert.alert('', '调用函数');
}
class NAME extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});

export default NAME;
