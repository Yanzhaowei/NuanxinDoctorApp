'use strict'

import React,{
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Component,
  TextInput,
  StyleSheet,
  ToolbarAndroid,
  ToastAndroid,
} from 'react-native';

import '../public/UrlConfig'

class ModifyPwd extends Component {
  /**************************
   *addNewPwd 用来渲染界面
   *tel 输入的电话号码
   *verify 验证码
   *isgetVerify 获取
   **************************/
  constructor(props) {
    super(props);
    this.state={
      addNewPwd: false,
      tel: '',
      verify: '',
      passWd: '',
      newPassWd: '',
      errorMsg: false,
      verifyError: '',
      isgetVerify: false,
    }
  }
  
  /*************************
   *用来判断导航条上面箭头返回页面
   ************************/
  _returnMainPage() {
    if(!this.state.addNewPwd) {
      this.props.navigator.pop();
    }else {
      this.setState({
        addNewPwd: false,
        isgetVerify: false,}
      );
    }
  }
  
  /****************************
   *导航条渲染 包括title 和 返回箭头
   ***************************/
  _renderHeader() {
    return(
      <View style={styles.toolbar}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {return this._returnMainPage()}}
          >
            <Image 
              source={require('../../images/icon/back.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            找回密码
          </Text>
        </View>
        <View style={{flex: 1}}>
        </View>
      </View>
    )
  }

  /********************************
   *获取验证码按钮的回调函数
   *判断tel长度，若是11则发送验证码并且跳转页面
   *否则返回null
   *******************************/
  _onPressGetVerify() {
    if(this.state.tel.length === 11 && !this.state.isgetVerify) {
      this.setState({
        isgetVerify: true,
      });
      fetch(sendMsg_URL,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tel: this.state.tel,
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var data = responseData;
        if(data['state'] === 'error') {
          if(data['msg'] === 'unregist') {
            this.setState({
              errorMsg: true,
              isgetVerify: false,
            });            
            return null;
          }
        }else if(data['state'] === 'success') {
          this.setState({
            addNewPwd: true,
            errorMsg: false,
          });
        }
      })
      .done();
    }else {
      return null;
    }
  }
  
  /*******************************
   *分割电话号码为131****1234格式的字符串
   ******************************/
  _splicTel() {
    var tel = this.state.tel.substr(0,3) + '****' + this.state.tel.substr(7,4);
    return tel;
  }
  
  /*******************************
   *确认修改密码
   *1.先判断两个密码是否一致
   *2.POST提交
   ******************************/
  _onPressSubmitPassWd() {
    if(this.state.passWd.length > 0 && this.state.passWd != this.state.newPassWd && this.state.verify.length > 0) {
      this.setState({errorMsg: true});    
    }else if(this.state.verify.length > 0 && this.state.passWd.length > 0 && this.state.passWd === this.state.newPassWd) {
      fetch(ModifyPass_URL,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tel: this.state.tel,
          code: this.state.verify,
          passwd: this.state.passWd,
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var data = responseData;
        if(data['state'] === 'error') {
          if(data['info'] === 'verify error') {
            this.setState({verifyError: '输入的验证码错误'});
          }else if(data['info'] === 'verify invaild') {
            this.setState({verifyError: '验证码失效，请重新获取'}); 
          }else if(data['info'] === 'modify error') {
            this.setState({verifyError: '网络错误，请稍后再试'});
          }
        }else if(data['state'] === 'success') {
          if(this.state.verifyError.length > 0) {
            this.setState({verifyError: ''});
          }
          ToastAndroid.show('密码修改成功,请您重新登陆。', ToastAndroid.SHORT)
          this.props.navigator.pop();
        }
      })
      .done();
    }else {
      return null;
    }
  }

  /*判断两次输入的密码是否一致*/
  _showPasswdError() {
    if(this.state.errorMsg) {
      return(
        <Text
          style={{
            textAlign: 'center',
            color: 'red',
          }}
        >
          两次输入的密码不一致,请重新输入。
        </Text>
      )
    }
  }
  
  /*若验证码失效则显示错误信息*/
  _showVerifyError() {
    if(this.state.verifyError.length > 0) {
      return (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
          }}
        >
          {this.state.verifyError}
        </Text>
      )
    }
  }

  /*判断手机号码是否注册*/
  _showErrorMsg() {
    if(this.state.errorMsg) {
      return(
        <Text
          style={{
            textAlign: 'center',
            color: 'red',
          }}
        >
          您输入的手机号码未注册
        </Text>
      )
    }
  }

  render() {
    if(this.state.addNewPwd) {
      return (
        <ScrollView 
          style={styles.container}
          keyboardShouldPersistTaps={true}
        >
          {this._renderHeader()}
          <Text style={styles.text}>
            已发送短信至您的手机{this._splicTel()}
          </Text>
          <View style={styles.telInput}>
            <TextInput
              ref='verify'
              style={{textAlign: 'center'}}
              placeholder='请输入手机验证码'
              defaultValue={this.state.verify}
              onChangeText={(text) => {this.setState({verify: text})}}
            />
          </View>
          <View>
           {this._showVerifyError()}
          </View>
          <Text 
            style={{
              textAlign: 'center',
              marginTop: 20,  
            }}
          >
            请设置您的新密码
          </Text>
          <View style={styles.telInput}>
            <TextInput
              ref='passWd'
              placeholder='请输入新密码'
              style={{textAlign: 'center'}}
              secureTextEntry={true}
              defaultValue={this.state.passWd}
              onChangeText={(text) => {this.setState({passWd: text})}}
            />
          </View>
          <View style={styles.pwdInput}>
            <TextInput
              ref='newPassWd'
              placeholder='请确认新密码'
              style={{textAlign: 'center'}}
              secureTextEntry={true}
              defaultValue={this.state.newPassWd}
              onChangeText={(text) => {this.setState({newPassWd: text})}}
            />
          </View>
          {this._showPasswdError()}
          <TouchableOpacity
            onPress={() => {return this._onPressSubmitPassWd()}}
          >
            <View style={this.state.passWd.length > 0 && this.state.newPassWd.length > 0 && this.state.verify.length > 0 ? styles.verifyBtn : styles.unVerifyBtn}>
              <Text>
                确认
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      )
    }

    
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <Text style={styles.text}>
          使用手机验证码找回
        </Text>
        <View style={styles.telInput}>
          <TextInput
            ref='tel'
            placeholder='请输入手机号码'
            keyboardType='numeric'
            style={{textAlign: 'center'}}
            maxLength={11}
            defaultValue={this.state.tel}
            onChangeText={(text) => {this.setState({tel: text})}}
          />
        </View>
        {this._showErrorMsg()}
        <TouchableOpacity
          onPress={() => {return this._onPressGetVerify()}}         
          activeOpacity={this.state.tel.length == 11 ? 0.5 : 1}
        >
          <View style={this.state.tel.length == 11 ? styles.verifyBtn : styles.unVerifyBtn}>
            <Text>
              获取短信验证码
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#868181',
    height: 45,
    alignItems: 'center',
  },
  arrow: {
    height: 22,
    marginLeft: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: 30,
  },
  telInput: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pwdInput: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtn: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderWidth: 1,
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unVerifyBtn: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ModifyPwd;
