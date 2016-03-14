'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  View,
} from 'react-native';

class ModifyPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.passProps.prescriptionData,
    }
  }

  popOut() {
    this.props.navigator.pop();
  }
  submit() {
    this.props.passProps.modifyData(this.props.passProps.date, this.state.data.medcine, this.state.data);
    this.props.navigator.pop();
  }
  render() {
    return (
      <Image
        source={require('../../images/load/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.tittle}>
          <View style={styles.titleContent}>
          <TouchableOpacity style={{width:50}} onPress={()=>this.popOut()}><Image source={require('../../images/icon/back.png')}></Image></TouchableOpacity>
            <Text style={styles.name}>修改处方</Text>
            <View style={{width:50}}></View>
          </View>
        </View>
        <View style={styles.mainBody}>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>药名：</Text>
            <View style = {[styles.inputStyle, {marginTop:10,borderBottomColor: 'transparent'}]}>
              <Text style={styles.label}>{this.state.data.medcine}</Text>
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>服用周期：</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => {this.state.data.period = text; this.setState({data: this.state.data})}}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
                defaultValue = {this.state.data.period}
              />
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>服用剂量：</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => {this.state.data.amount = text; this.setState({data: this.state.data})}}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
                defaultValue = {this.state.data.amount}
              />
            </View>
          </View>
        </View>
        <TouchableHighlight
          underlayColor='rgba(34,26,38,0.1)'
          onPress={()=>this.submit()}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableHighlight>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
	},
  tittle:{
    backgroundColor:'#878181',
    flexDirection: 'column',
    height:40,
    justifyContent: 'center',
  },
  titleContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10,
  },
  name:{
    color:'white',
     fontSize:18,
  },
  mainBody:{
    height: 148,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    margin: 11,
    marginTop: 30,
    paddingVertical:11
  },
  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  label: {
    flex: 1,
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 12,
    color: '#FFFFFF',

  },
  inputStyle: {
    flex: 3,
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
  },
	searchInput: {
    color: '#FFFFFF',
		fontSize: 12,
	},
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#DDDDDD',
    width: 100,
    height: 36,
    alignSelf: 'flex-end',
    marginTop: 11,
    marginRight: 11,
  },
  buttonText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 18,
    color: '#666666',
  },
});

export default ModifyPrescription;
