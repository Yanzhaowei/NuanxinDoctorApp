'use strict';
import JobView from './jobView'
import JobViewEdit from './jobViewEdit'
import styles from './styles'

import React, {
  Component,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import BackTitle from './back';

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

class DoctorMsgEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            dctmsg:{
                id:this.props.doctorId,
                name:'',
                age:'',
                sex:'',
                title:'',
                hospital:'',
                department:'',
                tel:'',
                price:'',
                memo:'',
            },
            worktime:{},
            status:null,
            scheule:'',
        }
        this.getDoctorData();
    }

    //得到医生信息
    getDoctorData(){
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
            console.log(responseData);
        this.setState({
            dctmsg:responseData,
            worktime:responseData.worktime
        })
          })
          .catch((err)=>{
              this.setState({isSuccess:false,isLoad:true});
              console.log(err.toString());
          })
          .done();
    }

    submitDoctorData(){
        fetch(SaveDocInfo,{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   doctor_id:this.props.doctorId,
                   name:this.state.dctmsg.name,
                   age:this.state.dctmsg.age,
                   sex:this.state.dctmsg.sex,
                   title:this.state.dctmsg.title,
                   hospital:this.state.dctmsg.hospital,
                   department:this.state.dctmsg.department,
                   tel:this.state.dctmsg.tel,
                   price:this.state.dctmsg.price,
                   memo:this.state.dctmsg.memo,
                   schedule:this.state.scheule,
                })
          })
          .then((response) => {
               return response.json();
          })
          .then((responseData)=>{
            console.log(responseData);
            this.setState({
                status:responseData.status
            })
            console.log(this.state.status);
            if(this.state.status === 'success'){
                Alert.alert(
                  '提示',
                  '修改成功',
                  [
                    {text: '确定',onPress:()=>{this.props.navigator.pop()}}
                  ]
                )
            }
          })
          .catch((err)=>{
              this.setState({isSuccess:false,isLoad:true});
              console.log(err.toString());
          })
          .done();
    }

    _onPressSubmit(){
        this.submitDoctorData();
    }

    //回调函数,返回已修改的工作安排
    setworktime(value){
        this.setState({
            scheule:value,
        })
    }

    render() {
    return (
        <View style={{flex:1}}>
            <BackTitle
                navigator={this.props.navigator}
                title={'编辑资料'}>
            </BackTitle>

            <ScrollView style={{height:WINDOW_HEIGHT + 45}}>
                <View style={styles.psnInfo}>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>姓名：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                style={{flex:1}}
                                selecyionClor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['name']= text;
                                    this.setState({dctmsg: data})}}
                            >
                            {this.state.dctmsg.name}
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>年龄：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['age']= text;
                                    this.setState({dctmsg: data})}}
                            >{this.state.dctmsg.age}
                            </TextInput>
                        </View>
                    </View>
                    <View style={[styles.psnInfoLine,{borderBottomWidth:0}]}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>电话：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                keyboardType='numeric'
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['tel']= text;
                                    this.setState({dctmsg: data})}}
                            >
                                {this.state.dctmsg.tel}
                            </TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.psnInfo}>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>职称：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['title']= text;
                                    this.setState({dctmsg: data})}}
                            >
                                {this.state.dctmsg.title}
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>科室：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['department']= text;
                                    this.setState({dctmsg: data})}}
                            >
                                {this.state.dctmsg.department}
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>医院：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['hospital']= text;
                                    this.setState({dctmsg: data})}}
                            >
                                {this.state.dctmsg.hospital}
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.psnInfoLine}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>价格：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                keyboardType='numeric'
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['price']= text;
                                    this.setState({dctmsg: data})}}
                            >
                                {this.state.dctmsg.price}
                            </TextInput>
                        </View>
                    </View>
                    <View style={[styles.psnInfoLine,{borderBottomWidth:0}]}>
                        <View style={styles.psnInfoLineKey}>
                            <Text style={styles.textStyle}>备注：</Text>
                        </View>
                        <View style={styles.psnInfoLineValue}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    var data = this.state.dctmsg;
                                    data['memo']= text;
                                    this.setState({dctmsg: data})}}
                                >
                                {this.state.dctmsg.memo}
                            </TextInput>
                        </View>
                    </View>
                </View>
                <View style={[styles.psnInfo,{height:235}]}>
                    <View style={styles.psnInfoLineValue}>
                        <JobViewEdit
                            setworktime={(value)=>{this.setworktime(value)}}
                        />
                    </View>{/*出诊安排*/}
                </View>
                <View style={styles.caaseBtnLine}>
                    <TouchableOpacity
                    onPress={() => {this._onPressSubmit()}}
                    style={styles.caseBtn}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={styles.caseText}>提交</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress= {() => {this.props.navigator.pop()}}
                    style={[styles.caseBtn,{
                        marginRight:0,
                        backgroundColor:'#DDDDDD',
                    }]}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[styles.caseText,{color:'#666666'}]}>取消</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
      );
    }
}

export default DoctorMsgEdit;