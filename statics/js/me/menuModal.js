'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-root-modal';
import DoctorPhoto from '../../js/login/DoctorPhoto';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FileUpload = require('NativeModules').FileUpload;

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

class MenuModal extends Component{
  constructor(props){
    super(props);
    this.state={
        sourceUrl:null,
        codeImg:'',
    }
    this.postCodeData();
  };

    handleClickModal(name){
      let menuname;
      switch (name) {
          case 'editMsg':
            menuname='doctorMsgEdit';
            break;
           case 'exit':
            menuname='logout';
            break;
      }
        this.props.close();
        this.props.navigator.push({
            name:menuname,
            dctmsg:this.props.dctmsg,
        });
    };

    _loadCodeImg() {
        if(this.state.codeImg === ''){
            return(
                <View>
                    <Text>loading</Text>
                </View>
            )
        }
        else {
            return(
                <Image
                    source={{uri:this.state.codeImg}}
                    style={styles.codeImg} />
            )
        }
    }

    postCodeData(){
        fetch(DoctorQrcode_URL,{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:this.props.doctorId,
                })
          })
          .then((response) => {
               return response.json();
          })
          .then((responseData)=>{
            this.setState({
                codeImg:responseData.qrcodeUrl
            })
          })
          .catch((err)=>{
              this.setState({isSuccess:false,isLoad:true});
              console.log(err.toString());
          })
          .done();
    };

    //选择弹出哪个对话框
    ChooseModal() {
        switch (this.props.name) {
            case 'menuModal':
                return this.MenuModal();
                break;
            case 'codeModal':
                return this.CodeModal();
                break;
            case 'changePhoto':
                return this.PhotoModal();
                break;
        }
    }

    //编辑资料modal
    MenuModal(){
        return  (
              <View style={styles.container}>
                  <TouchableOpacity
                      onPress={()=>this.handleClickModal('editMsg')}
                      style={{flex:1}}>
                      <View  style={styles.cheack}>
                          <Text style={{color:'#fff'}}>编辑资料</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={()=>this.handleClickModal('exit')}
                      style={{flex:1}}>
                      <View  style={styles.cheack}>
                          <Text style={{color:'#fff'}}>退出登录</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          );
    }

    //二维码Modal
    CodeModal() {
        return (
            <TouchableOpacity
                onPress={()=>this.props.close()}
                style={styles.container}>
                <View>
                  {this._loadCodeImg()}
                </View>
            </TouchableOpacity>
        );
    }

    //修改头像Modal
    PhotoModal() {
        return(
            <View style={{
                width:200,
                height:100,
                borderRadius:10,
                backgroundColor:'#fff',
                left:WINDOW_WIDTH*0.5 - 100,
                top:WINDOW_HEIGHT*0.5 - 75,
            }}>
                <View style={{
                    borderBottomWidth:1,
                    height:60,
                    justifyContent:'center',
                    alignSelf:'center',
                }}>
                <Text>更换头像</Text>
                </View>
                <View>
                    <TouchableOpacity
                    style={{
                        backgroundColor:'#fff',
                        justifyContent:'center',
                    }}
                    onPress={()=> {this._onPressLoadCamera()}}
                    >
                        <Text>确定</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{backgroundColor:'#fff'}}
                    onPress={()=> {this.props.close()}}
                    >
                        <Text>取消</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
        // return (
        //     Alert.alert(
        //      '提示',
        //      '是否更换头像',
        //      [
        //          {text: '确定',onPress:()=>{this.props.navigator.pop()}}
        //      ]
        //    )
        // )
      }

      _onPressLoadCamera(){
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

  render(){
      return(
          this.ChooseModal()
      )
};
};


const styles = StyleSheet.create({
    container:{
    flex:1,
    flexDirection: 'column',

  },
  codeBox: {
    flex:1,
  },
  codeImg:{
     height:200,
     width:200,
     top:WINDOW_HEIGHT*0.5 - 100,
     left:WINDOW_WIDTH*0.5 - 100,
  },
  cheack:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    borderBottomWidth:1,
    borderColor:'rgba(255,255,255,1)',
  },
});


export default MenuModal;