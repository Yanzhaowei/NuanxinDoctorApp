'use strict'

import React,{
  Alert,
  View,
  Image,
  Text,
  TextInput,
  Component,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import Modal from 'react-native-root-modal';
import ProgressBar from 'ProgressBarAndroid';
import ModifyPwd from './DoctorModifyPwd';
import '../public/UrlConfig'

const {height,width} = Dimensions.get('window');

class DoctorLogIn extends Component {
  /*初始化一个fields对象,通过解构器方式放到state中*/
  constructor(props) {
    super(props);

    this.fields = {
      username: null,
      passwd: null,
    }

    this.state = {
      ...this.fields,
      loading: false,
      registUser: false,
    }
  }

  //登陆按钮回调函数
  _onPressLoginButton() {
    var {username,passwd} = this.fields;
    //判断用户名密码是否为空
    if(username === null) {
      Alert.alert(
        '提示',
        '请输入您的手机号码',
        [
          {text: '确定',onPress:() => {this.refs.username.focus()}},
        ]
      );
      return null;
    }else if(passwd === null) {
      Alert.alert(    
        '提示',
        '密码不能为空',
        [
          {text: '确定',onPress:() => {this.refs.passwd.focus()}},
        ]
      );
      return null;
    }
    this.setState({
      username:username,
      passwd:passwd,
      loading:true,
    });
    this._CheckUserLogInfo();
  }
  
  /****************************
   * 验证用户名密码
   * 1.判断用户名密码是否为空
   * 2.验证用户名密码是否正确
   * 3.如果正确并且通过审核则把用户名信息存到storage中
   * 4.然后跳转到医生主页
   ***************************/
  _CheckUserLogInfo() {
    fetch(CheckUserInfo_URL,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        passwd: this.state.passwd,
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      var data = responseData;
      this.setState({loading: false});
      if(data['msg'] === 'error') {
        Alert.alert(
          '提示',
          '密码或者用户名错误,请重新输入',
          [
            {text: '确定',onPress:() => {this.refs.username.focus()}},
          ]
        );
      }else if(data['msg'] === 'success') {
        this.refs.username.blur();
        this.refs.passwd.blur();
        if(data['state'] === '0') {
          Alert.alert(
            '提示',
            '您的个人信息正在审核中,请您耐心等待,感谢您的理解与支持。',
            [
              {text: '确定',onPress:() => {return null}},
            ]
          )
        }else if(data['state'] === '1') {
          storage.save({
            key: 'loginState',
            rawData: {
              userId: data['doctorId'],
              state: 'success',
            },
            expires: null,
          })
          this.props.navigator.push({
            name: 'doctorHomePage',
            doctorId: data['doctorId']
          });
        }else if(data['state'] === '2') {
          Alert.alert(
            '提示',
            '您的注册信息为通过审核,请您重新注册或者联系管理员。'
          )
        }
      }
    })
    .done();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _onPressRegistButton() {
    this.props.navigator.push({
      name: 'regist',
    })   
  }
    
  //点击忘记密码的回调函数
  _onPressPwdButton() {
    this.props.navigator.push({
      name: 'modifyPwd',
    })    
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={require('../../images/icon/background.png')} 
          style={styles.backGround}
        >
          <Image 
            source={require('../../images/icon/logo3.png')} 
            style={styles.logo}/>       
          <View 
            style={styles.login}
          >
            <TextInput
              ref='username'
              style={styles.userInput}
              placeholder='请输入手机号码'
              underlineColorAndroid={'transparent'}
              keyboardType='numeric'
              onFocus={()=>{this.refs.username.focus()}}
              defaultValue={this.fields.username}
              onChangeText={(text) => {this.fields.username = text}}
              onSubmitEditing={() => {this.refs.passwd.focus()}}
            />
            <View
              style={{height: 1,backgroundColor: 'black'}}
            />
            <TextInput
              ref='passwd'
              style={styles.userPwd}
              placeholder='请输入密码'
              underlineColorAndroid={'transparent'}
              secureTextEntry={true} 
              defaultValue={this.fields.passwd}
              onFocus={()=>{this.refs.passwd.focus()}}
              onChangeText={(text) => {this.fields.passwd = text}}
            />
          </View>
          <TouchableOpacity 
            onPress={()=>{return this._onPressLoginButton()}}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.loginBtn}>
              <Text style={{color: 'white'}}>
                登录
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{return this._onPressRegistButton()}}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.loginBtn}>
              <Text style={{color: 'white'}}>
                注册
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.forgetPwd}>
            <TouchableOpacity
              onPress={()=>{return this._onPressPwdButton()}}
            >
              <Text style={{color: 'white'}}>
                忘记密码?
              </Text>
            </TouchableOpacity>
          </View>
        </Image>
        <Modal
          visible={this.state.loading}
          style={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
            overflow: 'hidden',
          }}
        >
          <ProgressBar color="gray" />
        </Modal>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backGround: {
    width: width,
    height: height,
  },
  login: {
    width: width,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginTop: 40,
    alignSelf: 'center',
  },
  userInput: {
    textAlign: 'center',
    marginTop: 10,
    height: 40,
  },
  userPwd: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    height: 40,
  },
  loginBtn: {
    height: 40,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  forgetPwd: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default DoctorLogIn;
