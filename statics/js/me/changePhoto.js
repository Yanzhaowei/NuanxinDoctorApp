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

class ChangePhoto extends Component {
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

  _uploadphoto(num) {
    var pathArray = this.state.sourceUrl['uri'].split('/');
    var imageName = pathArray[pathArray.length-1];
    var obj = {
      uploadUrl: SaveDocInfo,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'num':''+num,
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
      this._uploadphoto();
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
          onPress={() => {this._uploadphoto(1)}}
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

export default ChangePhoto;