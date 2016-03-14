'use strict';
import JobView from './jobView.js'
import MyModal from './modal.js';
import styles from './styles';
import WebMainPage from './webView'
import MenuModal from './menuModal'
import Modal from 'react-native-root-modal'

import React, {
  Component,
  Alert,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;
var PHOTO_URL = 'http://www.xingwenpeng.com/static/images/matching/iphone6plus/';

class DoctorInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            ListMenu:false,
            modalStyle:{},
            modalContent:{},
            dctmsg: {},
            photo:'../../images/me/default.png',
            worktime:{},
        }
        this.postDoctorData();
    }
    _onPressEditButton(){
        this.props.navigator.push({
            name:'doctorMsgEdit',
        })
    };

    _ChangePhoto() {
        this.props.navigator.push({
            name:'changePhoto',
        })
    }

    closeModal(){
         this.setState({ListMenu:false});
    };

    _MenuModal() {
        this.setState({
            ListMenu:true,
            modalStyle:{
                position: 'absolute',
                right:0,
                top:45,
                height:100,
                width:100,
                backgroundColor:'rgba(134,129,129,1)',
            },
            modalContent:<MenuModal
                close={()=>this.closeModal()}
                doctorId={this.props.doctorId}
                navigator={this.props.navigator}
                dctmsg={this.state.dctmsg}
                name='menuModal'/>,
        });
    };

    _CodeModal() {
        this.setState({
            ListMenu:true,
            modalStyle:{
                position: 'absolute',
                left:0,
                right:0,
                top:0,
                bottom:0,
                backgroundColor:'rgba(0,0,0,0.3)',
            },
            modalContent:<MenuModal
                close={()=>this.closeModal()}
                navigator={this.props.navigator}
                doctorId={this.props.doctorId}
                name='codeModal'/>,
                });
    };

    _JobModal() {
        this.setState({
            ListMenu:true,
            modalStyle:{
                position: 'absolute',
                left:0,
                right:0,
                top:0,
                bottom:0,
                backgroundColor:'rgba(0,0,0,0.3)',
            },
            modalContent:<JobView
                close={()=>this.closeModal()}
                navigator={this.props.navigator}
                worktime={this.state.worktime}
                name='codeModal'/>,
                });
    }
    _AlertMsg() {
        Alert.alert(
            '提示',
            '是否要修改头像?',
            [
                {text: '确定',onPress:() => {this._ChangePhoto()}},
                {text: '取消',onPress:() => {}},
            ]
        )
    }

    postDoctorData(){
        fetch(DocInfo,{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   doctor_id:this.props.doctorId
                })
          })
          .then((response) => {
               return response.json();
          })
          .then((responseData)=>{
            this.setState({
                dctmsg:responseData,
                photo:PHOTO_URL+responseData.photo,
                worktime:responseData.worktime
            })
            console.log(dctmsg);
          })
          .catch((err)=>{
              this.setState({isSuccess:false,isLoad:true});
              console.log(err.toString());
          })
          .done();
    };

    showModal(name) {
        if(!this.state.ListMenu) {
            switch (name) {
                case 'ShowMenu':
                    this._MenuModal();
                    break;
                case 'ShowCode':
                    console.log('hajha');
                    this._CodeModal();
                    break;
                case 'ShowJobview':
                    this._JobModal();
                    break;
            }
        }
        else
            this.setState({ListMenu:false});
    }

    render() {
    return (
        <View>
            <View style={styles.headNav}>
                <View style={[styles.lineCenter,{flex:10,justifyContent:'flex-end'}]}>
                    <Text style={styles.textBold}>我</Text>
                </View>
                <View style={{flex:9}}>
                    <TouchableOpacity
                        style={styles.headImg}
                        onPress= {()=>this.showModal('ShowMenu')}>
                        <Image source = {require('../../images/me/edit.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.body}>
            {/*headerImage start*/}
                <Image
                    source = {require('../../images/me/bg-11.png')}
                    style = {styles.picture}
                    resizeMode='stretch'>
                    <View style={styles.avatarMSG}>
                        <TouchableOpacity
                        onPress = {()=>{this._AlertMsg()}}
                        style = {styles.avatarImage}>
                            <Image
                                style={styles.avatarImg}
                                source = {{uri:this.state.photo}}>
                            </Image>
                            <View style={styles.imageText}>
                                <Text style={{color:'#fff', fontSize:11, borderRadius:6}}>已认证</Text>
                            </View>
                        </TouchableOpacity>
                        <View><Text style={styles.textBold}>{this.state.dctmsg.name}</Text></View>
                        <View><Text style={{color:'#fff',marginTop:10, backgroundColor:'transparent'}}>{this.state.dctmsg.title}</Text></View>
                    </View>
                </Image>
                {/*headerImage end*/}

                {/*doctorMessage start*/}
                <View style={styles.doctorMessage}>
                    <View style = {styles.messageLable}>
                        <Image
                            source = {require('../../images/me/age.png')}
                            style = {styles.messageImg} />
                        <View style={{paddingRight:5}}><Text style= {{fontSize:14}}>年龄:</Text></View>
                        <View><Text style= {{fontSize:14}}>{this.state.dctmsg.age}岁</Text></View>
                    </View>
                    <View style = {styles.messageLable}>
                        <Image
                            source = {require('../../images/me/phone.png')}
                            style = {styles.messageImg} />
                        <View style={{paddingRight:5}}><Text style= {{fontSize:14}}>电话:</Text></View>
                        <View><Text style= {{fontSize:14}}>{this.state.dctmsg.tel}</Text></View>
                    </View>
                </View>

                <View style={styles.doctorMessage}>
                    <View style = {styles.messageLable}>
                        <Image
                            source = {require('../../images/me/hospital.png')}
                            style = {styles.messageImg} />
                        <View style={{paddingRight:5}}>
                            <Text style= {{fontSize:11}}>医院:</Text>
                        </View>
                        <View>
                            <Text style= {{fontSize:14}}>{this.state.dctmsg.hospital}</Text>
                        </View>
                    </View>
                    <View style = {styles.messageLable}>
                        <Image
                            source = {require('../../images/me/department.png')}
                            style = {styles.messageImg} />
                        <View style={{paddingRight:5}}><Text style= {{fontSize:14}}>科室:</Text></View>
                        <View><Text style= {{fontSize:14}}>{this.state.dctmsg.department}</Text></View>
                    </View>
                </View>

                <View style={styles.doctorMessage}>
                    <View style = {styles.messageLable}>
                        <Image
                            source = {require('../../images/me/price.png')}
                            style = {styles.messageImg} />
                        <View style={{paddingRight:5}}>
                            <Text style= {{fontSize:14}}>咨询价格:</Text>
                        </View>
                        <View><Text style= {{fontSize:14}}>{this.state.dctmsg.price}元 / 10分钟</Text></View>
                    </View>
                </View>
                {/*doctorMessage end*/}

                <MyModal
                    navigator={this.props.navigator}
                    showModal = {(name)=> this.showModal(name)}
                    doctorId={this.props.doctorId}
                    closeModal={()=>this.closeModal()}
                />

                {/*my homepage*/}
                 <View style={{height:120}}></View>
                </ScrollView>

                <Modal visible={this.state.ListMenu}
                    style={styles.infoModal}>
                    <TouchableOpacity onPress={()=>this.closeModal()}
                        style={styles.touchExit}>
                        <View style={this.state.modalStyle}>
                            {this.state.modalContent}
                        </View>
                    </TouchableOpacity>
                </Modal>
        </View>

      );
    }
}

export default DoctorInfo;