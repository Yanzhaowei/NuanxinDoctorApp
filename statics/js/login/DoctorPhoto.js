'use strict'

import React,{
  View,
  Text,
  Image,
  Alert,
  Component,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FileUpload = require('NativeModules').FileUpload;

class DoctorPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceUrl: null,
    }
  }
  
  _onPressLoadCamera() {
    var options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册获取',
      cameraType: 'front',
      mediaType: 'photo',
      videoQuality: 'high',
      maxWidth: 1000,
      maxHeight: 1000,
      aspectX: 1,
      aspectY: 2,
      quality: 1,
      angle:270,
      allowEditing: true,
      noData: false,
      storageOpations: {
        skipBackup: false,
        path: 'images'
      }
    };
    ImagePickerManager.showImagePicker(options,(response) => {
      if(response.error) {
        console.log('ImagePickerManager Error: ',response.error);
      }else if(response.didCancel) {
        console.log('User cancelled image picker');
      }else if(response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }else {
        /*const source = {uri: 'data:image/jpeg;base64,' + response.data,isStatic: true};*/
        const source = {uri: response.uri,isStatic: true};
        this.setState({
          sourceUrl: source,
        });
      }
    })
  }

  /*******************************
   *未设置头像提交
   ******************************/
  _submitPersonInfo() {
    var doctorinfo = this.props.info;
    fetch(DoctorRegist_URL,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:doctorinfo['name'],
        age: doctorinfo['age'],
        sex: doctorinfo['sex'],
        tel: doctorinfo['tel'],
        passwd: doctorinfo['passwd'],
        cpasswd: doctorinfo['cpasswd'],
        hospital: doctorinfo['hospital'],
        price: doctorinfo['price'],
        title: doctorinfo['title'],
        depart: ''+doctorinfo['depart'],
        schedule: doctorinfo['schedule'],
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      var data = responseData;
      if(data['status'] == 'error'){
        Alert.alert(
          '提示',
          data['msg'],
          [
            {text: '确定',onPress:()=>{return null}}
          ]
        )
      }else if(data['status'] == 'success'){
        if(this.state.sourceUrl){
          this._uploadphoto(data['doctorId']);
        }
        ToastAndroid.show('注册成功,请您耐心等待管理员审核', ToastAndroid.SHORT)
        this.props.navigator.pop();
      }
    })
    .catch((err)=>{
      Alert.alert(
        '提示',
        '网络异常',
        [
          {text: '确定',onPress:()=>{ return null}}
        ]
      )
    })
    .done()
  };
    
  _uploadphoto(num) {
    var pathArray = this.state.sourceUrl['uri'].split('/');
    var imageName = pathArray[pathArray.length-1];
    var obj = {
      uploadUrl: Uploadphoto_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'num':''+num,
        'class':'doctor',
      },
      files: [
        {
          name: '',
          filename: imageName,
          filepath: this.state.sourceUrl['uri'],
          filetype: null,
        },
      ]
    };
    FileUpload.upload(obj,(err,result)=>{
      console.log('upload',err,result);
    })
  }

  _onPressSubmit() {
    if(!this.state.sourceUrl) {
      Alert.alert(
        '提示',
        '您的头像未设置,要跳过这一项吗？',
        [
          {text:'确定',onPress:()=>{this._submitPersonInfo()}},
          {text:'取消',onPress:()=>{return null}}
        ]
      )
    }else {
      this._submitPersonInfo();
    }
  }

  render() {
    return(
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
         {this.state.sourceUrl ? 
            (
              <Image 
                source={this.state.sourceUrl} 
                style={{height: _height*0.15,width:_height*0.15,borderRadius:_height*0.1}}
              />) : 
            (
              <View 
                style={{width:120,height: 120,borderColor:'grey',borderWidth:1}}
              >
                <Text>
                 上传您的头像
                </Text>
              </View>)
          }
        <TouchableOpacity
          onPress={()=>{this._onPressLoadCamera()}}
        >
          <View
            style={{
              width: 250,
              height: 40,
              borderWidth: 1,
              borderColor: 'orange',
              marginTop: 10,
              borderRadius: 5,
              backgroundColor: 'orange',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
              }}
            >
              选择照片
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this._onPressSubmit()}}
        >
          <View
            style={{
              width: _width-40,
              height: 40,
              margin: 20,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: this.state.sourceUrl ? 'orange' : 'grey',
              borderRadius: 5,
              backgroundColor: this.state.sourceUrl ? 'orange' : 'transparent',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
              }}
            >
              完成
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default DoctorPhoto;