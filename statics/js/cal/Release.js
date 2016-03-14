'use strict'

import React, {
  Alert,
  ProgressBarAndroid,
  ToastAndroid,
  Component,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import NewsList from './NewsList';
import Modal from 'react-native-root-modal';

const newsSet = [
  {date: '2016年02月10日',subject: '门诊停诊通知', content: '本周因到外地参加学术讨论会，停止门诊一周，请谅解。'},
  {date: '2016年02月03日',subject: '门诊停诊通知', content: '本周因家中，停止门诊，请谅解。'},
  {date: '2016年02月01日',subject: '门诊降价通知', content: '门诊费用下调，请知悉。'},
  {date: '2016年01月28日',subject: '门诊停诊通知', content: '本周停止门诊一周，请谅解。'},
  {date: '2016年01月20日',subject: '门诊停诊通知', content: '停止门诊一周。'},
  {date: '2016年01月10日',subject: '门诊价格调整', content: '本周门诊价格上涨，请知悉。'},
  {date: '2016年01月01日',subject: '元旦快乐', content: '祝大家元旦快乐。'},
    {date: '2016年02月10日',subject: '门诊停诊通知', content: '本周因到外地参加学术讨论会，停止门诊一周，请谅解。'},
    {date: '2016年02月03日',subject: '门诊停诊通知', content: '本周因家中，停止门诊，请谅解。'},
    {date: '2016年02月01日',subject: '门诊降价通知', content: '门诊费用下调，请知悉。'},
    {date: '2016年01月28日',subject: '门诊停诊通知', content: '本周停止门诊一周，请谅解。'},
    {date: '2016年01月20日',subject: '门诊停诊通知', content: '停止门诊一周。'},
    {date: '2016年01月10日',subject: '门诊价格调整', content: '本周门诊价格上涨，请知悉。'},
    {date: '2016年01月01日',subject: '元旦快乐', content: '祝大家元旦快乐。'},
      {date: '2016年02月10日',subject: '门诊停诊通知', content: '本周因到外地参加学术讨论会，停止门诊一周，请谅解。'},
      {date: '2016年02月03日',subject: '门诊停诊通知', content: '本周因家中，停止门诊，请谅解。'},
      {date: '2016年02月01日',subject: '门诊降价通知', content: '门诊费用下调，请知悉。'},
      {date: '2016年01月28日',subject: '门诊停诊通知', content: '本周停止门诊一周，请谅解。'},
      {date: '2016年01月20日',subject: '门诊停诊通知', content: '停止门诊一周。'},
      {date: '2016年01月10日',subject: '门诊价格调整', content: '本周门诊价格上涨，请知悉。'},
      {date: '2016年01月01日',subject: '元旦快乐', content: '祝大家元旦快乐。'},
        {date: '2016年02月10日',subject: '门诊停诊通知', content: '本周因到外地参加学术讨论会，停止门诊一周，请谅解。'},
        {date: '2016年02月03日',subject: '门诊停诊通知', content: '本周因家中，停止门诊，请谅解。'},
        {date: '2016年02月01日',subject: '门诊降价通知', content: '门诊费用下调，请知悉。'},
        {date: '2016年01月28日',subject: '门诊停诊通知', content: '本周停止门诊一周，请谅解。'},
        {date: '2016年01月20日',subject: '门诊停诊通知', content: '停止门诊一周。'},
        {date: '2016年01月10日',subject: '门诊价格调整', content: '本周门诊价格上涨，请知悉。'},
        {date: '2016年01月01日',subject: '元旦快乐', content: '祝大家元旦快乐。'},
];
class Release extends Component {
  constructor(props) {
    super(props);
    this.state={
      subject: '',
      content: '',
      isSuccess: true,
      isLoad:true,
    }
  }

  cancelRelease() {
    this.setState({content: '', subject: ''})

  }

  releaseNews() {
    if (this.state.subject === '') {
      Alert.alert('提醒', '请输入主题。');
      return;
    }
    if (this.state.content === '') {
      Alert.alert('提醒', '请输入内容。');
      return;
    }
    this.setState({isLoad: false});
    this.postData();
  }
  postData(){
      fetch(SendDoctorMsg_URL,{
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 doctorId:this.props.doctorId,
                 title:this.state.subject,
                 info:this.state.content
              })
        })
        .then((response) => {
            // Alert.alert('', 'response');
             return response.json();
        })
        .then((responseData)=>{
          // console.log(responseData);
            this.setState({isLoad:true, data:responseData,isSuccess:true,})
            ToastAndroid.show('发送成功', ToastAndroid.LONG);
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
  render() {
      if (this.state.isSuccess) {
        return (
          <Image
            source={require('../../images/load/background.png')}
            style={styles.backgroundImage}
          >
            <View style={styles.title}>
              <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.cancelRelease()}>
                <Text style={styles.cmdText}>取消</Text>
              </TouchableHighlight>
              <Text style={styles.titleText}>发布消息</Text>
              <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.releaseNews()}>
                <Text style={styles.cmdText}>发布</Text>
              </TouchableHighlight>
            </View>
            <ScrollView style = {styles.container}>
              <TextInput
                placeholder = {'主题...'}
                onChangeText = {(text) => this.setState({subject: text})}
                style = {styles.subjectBox}
                value = {this.state.subject}
              />
              <TextInput
                ref = 'contentBox'
                placeholder = {'你想说的...'}
                onChangeText = {(text) => this.setState({content: text})}
                textAlignVertical = {'top'}
                multiline = {true}
                numberOfLines = {6}
                style = {styles.contentBox}
                value = {this.state.content}
              />

              {/*<View style={styles.releaseTo}>
               <Text style={styles.releaseToText}>所有患者</Text>
              </View>*/}

              {/*<NewsList navigator={this.props.navigator} newsSet = {newsSet}/>*/}
              <View style={{height:85,}}></View>
            </ScrollView>
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
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#868181',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 11,
  },
  titleText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 18,
    color: '#FFFFFF',
  },
  cmdText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 11,
  },
  contentBox: {
    backgroundColor: '#FFFFFF',
    height: 180,
  },
  subjectBox: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 4,
  },
  releaseTo: {
    backgroundColor: '#F08300',
    height: 40,
    padding: 11,
    justifyContent: 'center',
  },
  releaseToText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  waiting: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Release;