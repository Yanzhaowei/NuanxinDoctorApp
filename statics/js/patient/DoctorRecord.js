'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TextInput,
  ToastAndroid,
  Alert,
  ProgressBarAndroid,
 TouchableHighlight,
 TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-root-modal'

var DocMsg={
  'title':'',
  'content':'',
};

class DoctorRecord extends Component{
  constructor(){
    super();
    this.state={
        DocMsg:DocMsg,
        isLoad:true,
        isSuccess:true,
    };
};
handleBack(){
  this.props.navigator.pop();
};
changeTxt(type,txt){
  this.state.DocMsg[type]=txt;
    this.setState({DocMsg:this.state.DocMsg});
};
submit(){
  if (this.state.DocMsg.title === '') {
    Alert.alert('提醒', '请输入主题。');
    return;
  }
  if (this.state.DocMsg.content === '') {
    Alert.alert('提醒', '请输入内容。');
    return;
  }
  this.setState({isLoad: false});
  // Alert.alert('', 'docid:'+this.props.doctorId+' openid: '+this.props.openid+' title:'+this.state.DocMsg.title+ ' content:'+this.state.DocMsg.content);

  this.postData();

};
postData(){
    fetch(SendDoctorMsg_URL,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               doctorId:this.props.doctorId,
               openid:this.props.openid,
               title:this.state.DocMsg.title,
               info:this.state.DocMsg.content
            })
      })
      .then((response) => {
          // Alert.alert('', 'response');
           return response.json();
      })
      .then((responseData)=>{
        // console.log(responseData);

        this.setState({isLoad:true, data:responseData,isSuccess:true,})
        if (responseData.status==='success')
          ToastAndroid.show('发送成功', ToastAndroid.LONG);
        else {
          ToastAndroid.show(responseData.msg, ToastAndroid.LONG);
        }
          // Alert.alert('',JSON.stringify(responseData));
        // this.setState({isLoad:true, data:responseData.patients,isSuccess:true,})
        // this.BaseCreateData(this.state.data,'date');
                  // Alert.alert('',this.state.data[0].date);
      })
      .catch((err)=>{
          Alert.alert('catch err',err.toString())
          this.setState({isSuccess:false,isLoad:true});
          // console.log(err.toString());
      })
      .done();
};
render(){
  // Alert.alert('',this.props.doctorId+'');
  // Alert.alert('',this.props.openid+'');
  // Alert.alert('',this.props.patientName);
  if (this.state.isSuccess) {
      return  (
        <Image
          source={require('../../images/load/background.png')}
          style={styles.backgroundImage}
        >
            <View style={styles.tittle}>
                <View style={styles.titleContent}>
                    <TouchableOpacity onPress={()=>this.handleBack()} style={{ flexDirection: 'row',}}>
                        <Image  source={require('../../images/icon/back.png')} style={{marginRight:5,}}/>
                    </TouchableOpacity>
                    <Text style={[styles.txtColor,{fontSize:15}]}>医嘱</Text>
                    <TouchableOpacity onPress={()=>this.submit()}>
                    <Text style={[styles.txtColor,{fontSize:15}]}>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputGroup}>
                            <View style={{flex:1,height:30, width:330,borderBottomWidth:1}}><TextInput
                                style={[styles.TextInput],{flex:1, height:20}}
                                placeholder='标题'
                                selectionColor='#FF7F00'
                                value={this.state.DocMsg['title']}
                                placeholderTextColor='#BFBFBF'
                                onChangeText={(txt)=>this.changeTxt('title',txt)}
                                />
                                </View>
                                <View style={{alignSelf: 'flex-start', marginVertical:11}}>
                                  <Text style={styles.normalText}>To: {this.props.patientName}</Text>
                            </View>
                            <View style={{marginTop:15,borderWidth:1,borderColor: '#AAAAAA'}}>
                                 <TextInput
                                         style={[styles.TextInput,{marginTop:0,height:100,width:330}]}
                                        placeholder='内容'
                                        selectionColor='#FF7F00'
                                         value={this.state.DocMsg['content']}
                                        placeholderTextColor='#BFBFBF'
                                        onChangeText={(txt)=>this.changeTxt('content',txt)}
                                        multiline={true}
                                        numberOfLines={5} />
                            </View>
                </View>
                <Modal
                    style={{top: 0,right: 0,bottom: 0,left: 0,backgroundColor: 'transparent',}}
                    visible={!this.state.isLoad}
                >
                    <View style={styles.waiting}>
                      <ProgressBarAndroid />
                    </View>
                </Modal>
          </Image>
        );
      } else{
          return (
              <Image
                  source={require('../../images/load/background.png')}
                  style={styles.background}
                  >
                     <View
                          style={{height:Dimensions.get('window').height,
                                      width:Dimensions.get('window').width,
                                      flexDirection: 'column',alignItems: 'center',justifyContent: 'center',}}>
                          <Text style={{color:'#F08300',fontSize:16,}}>加载失败</Text>
                          <TouchableOpacity onPress={()=>this.postData()}
                                  style={{borderWidth:1,height:50,width:100,borderRadius:25,borderColor:'#0094ff',justifyContent:'center',alignItems:'center'}}>
                                 <Text style={{color:'#F08300',fontSize:16,}}>重新加载</Text>
                          </TouchableOpacity>
                    </View>
             </Image>
          );
        };
    }

};


const styles = StyleSheet.create({
    backgroundImage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    normalText: {
      fontFamily: 'PingFang-SC-Regular',
      fontSize: 16,
      fontWeight: '100',
      color: '#FFFFFF',
    },
    txtColor:{
        color:'rgb(255,255,255)',
    },
    tittle:{
    backgroundColor:'#757575',
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
  FGView:{
    height:10,
    backgroundColor:'#FE9300',
  },
  inputGroup:{
      flexDirection: 'column',
      margin:10,
      marginTop:20,
      marginBottom:20,
      padding:20,
       justifyContent: 'center',
       alignItems:'center',
       borderRadius:20,
       backgroundColor:'rgba(255,255,255,0.3)',
  },
  TextInput:{
      fontSize:15,
      color:'#000000',
      marginTop:15,
  },
  mainView:{
    flex:1,
    flexDirection: 'column',
    backgroundColor:'#F4F1F5',
    alignItems:'center',
  },
  waiting: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },

});


export default DoctorRecord;