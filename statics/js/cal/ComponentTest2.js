'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

class AddDiagnosis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style = {styles.subjectBox}>
          <TextInput
            height = {50}
            placeholder = {'请输入医生诊断'}
            onChangeText = {(text) => this.setState({subject: text})}
          />
        </View>
        <TouchableHighlight
          underlayColor='rgba(34,26,38,0.1)'
          onPress={()=>this.popOut()}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subjectBox: {
    borderWidth: 0.4,
    borderColor: '#FEA501',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    height: 30,
    width: 80,
    borderWidth: 0.4,
    borderColor: '#FEA501',
    borderRadius: 15,
  },
  buttonText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 14,
    color: '#FEA501',
  },
});

export default AddDiagnosis;
