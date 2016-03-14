'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import LoadingModal from './LoadingModal';

class AddDiagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosis: '',
    }
  }

postData(data){
  this.refs['loading'].tiggleModel(true);
    fetch(AddDocDiag_URL,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               doctor_id:this.props.doctorId,
               docdiag:data,
            })
      })
      .then((response) => {
           return response.json();
      })
      .then((responseData)=>{
        //Alert.alert('ok');
        console.log(responseData);
        //this.props.diags.push(data);
        this.refs['loading'].tiggleModel(false);
        this.popOut();
        this.props.pushLoad(data);
      })
      .catch((err)=>{
        this.refs['loading'].tiggleModel(false);
          console.log(err.toString());
      })
      .done(); 
}

  popOut() {
      this.props.navigator.pop();
  }

  submit() {
    //Alert.alert('prompt', this.state.diagnosis);
    if (this.state.diagnosis == '') {
        ToastAndroid.show('请填写完整数据', ToastAndroid.SHORT);
    }
    this.postData(this.state.diagnosis);
   
  }

  render() {
    return (
      <View>
        <View style={styles.tittle}>
          <View style={styles.titleContent}>
          <TouchableOpacity style={{width:50}} onPress={()=>this.popOut()}><Image source={require('../../images/icon/back.png')}></Image></TouchableOpacity>
            <Text style={styles.name}>添加诊断</Text>
            <View style={{width:50}}></View>
          </View>
        </View>
         <Image
              source={require('../../images/load/background.png')}
              style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
              > 
        <View style = {styles.inputStyle}>
          <TextInput
          style = {styles.searchInput}
            placeholder = {'请输入医生诊断.....'}
            placeholderTextColor='white'
            onChangeText = {(text) => this.setState({diagnosis: text})}
            underlineColorAndroid = {'transparent'}
            selectTextOnFocus = {true}
          />
        </View>
        <TouchableHighlight
          underlayColor='rgba(34,26,38,0.1)'
          onPress={()=>this.submit()}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableHighlight>
        <LoadingModal ref='loading'/>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  inputStyle: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#333333',
    borderRadius: 4,
    borderWidth: 1,
    margin: 30,
    backgroundColor:'rgba(255,255,255,0.3)',
  },
  subjectBox: {
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 18,
             color:'white',
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
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  buttonText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 18,
    color: '#FEA501',
  },
});

export default AddDiagnosis;