'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import Modal from 'react-native-root-modal';
import MedcineModal from './MedcineModal';
import Loading from './Loading';

var DataJson=[
  ];

var useData=[];
var subData=[];
class AddMedcine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      productor: '',
      specification: '',
      unit: '',
      amount: '',
      meathod: '',
       Lvisible:false,
       txtMsg:'',
       diags:this.props.diags,
       content:'',
    }
  }

componentWillMount(){
    DataJson=this.props.diags.map((value,index)=>{
        let temp={};
        temp['name']=value;
        return temp;
    });
     useData=DataJson.map((value,index)=>{
        value['isCheak']=false;
        return value;
     });
};
changeMedia(datas){
    useData=datas;
    subData=[];
    var msg='';
    subData=useData.filter((value)=>{
        if (value['isCheak']) {
            msg+=(value['name']['name']+'、');
            return value;
        }
    });
    if (msg.length>14) {
      msg = msg.substring(0,14);
      msg=msg[msg.length-1]=='、' ?msg.substring(0,msg.length-1):msg;
      msg+='……';
    }
    else{
      msg = msg.substring(0,msg.length-1);
    }

    this.setState({txtMsg:msg});
};

closeModal(){
    this.setState({Lvisible:false,content:''});
};

openModal(){
      let content=(
          <View style={styles.modalStyle}>
             <MedcineModal changeMedia={(datas)=>this.changeMedia(datas)} closeModal={()=>this.closeModal()}  DataJson={useData}/>
             </View>
      );
     this.setState({Lvisible:true,content:content});
};

  popOut() {
         this.props.navigator.pop();
  }

pushData(){
    let tempData=subData.map((value,index)=>{
        return value['name']['name'];
    });
    console.log(JSON.stringify({
               doctorid:this.props.doctorId,
               docMedimg:'/aaa/aa/a',
               'docdiag-list':tempData,
               medName:this.state.name,
               medunit:this.state.unit,
               merchant:this.state.productor,
               meddes:this.state.specification,
            }));
     fetch(AddDocMed_URL,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               doctorid:this.props.doctorId,
               docMedimg:'/aaa/aa/a',
               'docdiag-list':tempData,
               medName:this.state.name,
               medunit:this.state.unit,
               merchant:this.state.productor,
               meddes:this.state.specification,
            })
      })
      .then((response) => {
        //console.log(response);
           return response.json();
      })
      .then((responseData)=>{
        console.log(responseData);
        this.setState({Lvisible:false});
        if (responseData.status !='error') {
          ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
           this.popOut()
            this.props.postSick();
        }
        else{
             ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
        }
       

      })
      .catch((err)=>{
          console.log(err.toString());
           this.setState({Lvisible:false});
           ToastAndroid.show('提交数据失败'+err.toString(), ToastAndroid.SHORT);
      })
      .done(); 
}

isPass(){
    let tempData=subData.map((value,index)=>{
        return value['name']['name'];
    });
    var values= { doctorid:this.props.doctorId,
               docMedimg:'/aaa/aa/a',
               'docdiag-list':tempData,
               medName:this.state.name,
               medunit:this.state.unit,
               merchant:this.state.productor,
               meddes:this.state.specification,};
        let result=true;
      for (let key in values){
        //console.log(values[key]);
          if (values[key] == '' || !values[key]) {
                result=false;
                break;
          }
      }
      return result;
}

  submit() {
   
    if(this.isPass()){
       var content=( <Loading  style={{ height: Dimensions.get('window').height - 65}}/> );
       this.setState({Lvisible:true,content:content});
       this.pushData();
    }
    else{
        ToastAndroid.show('请填写完整数据', ToastAndroid.SHORT)
    }
   
  }


chooseFile(){
  
}

  update() {

  }
  render() {
    return (
      <View>
        <View style={styles.tittle}>
          <View style={styles.titleContent}>
          <TouchableOpacity style={{width:50}} onPress={()=>this.popOut()}><Image source={require('../../images/icon/back.png')}></Image></TouchableOpacity>
            <Text style={styles.name}>添加药物</Text>
            <View style={{width:50}}></View>
          </View>
        </View>

         <Image
              source={require('../../images/load/background.png')}
              style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
              > 
        <ScrollView style = {styles.container}>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>请选择医生诊断</Text>
            <View style = {[styles.inputStyle, {flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style = {{paddingLeft: 11, justifyContent: 'center'}}>
                <Text style = {{alignSelf: 'center', fontSize: 12, color: '#0094ff',}}>{this.state.txtMsg}</Text>
              </View>
              <TouchableHighlight
                style = {styles.chooseButton}
                underlayColor='rgba(34,26,38,0.1)'
                onPress={()=>this.openModal()}>
                <Text style={styles.titleReturnText}>﹀</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>名称</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => this.setState({name: text})}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}  />
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>厂家</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => this.setState({productor: text})}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
              />
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>服用单位</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => this.setState({unit: text})}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
              />
            </View>
          </View>
{/*
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>服用剂量</Text>
            <View style = {styles.inputStyle}>
              <TextInput
                style = {styles.searchInput}
                keyboardType='numeric'
                onChangeText = {(text) => this.setState({amount: text})}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
              />
            </View>
          </View>
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>服用方法</Text>
            <View style = {styles.inputStyle}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => this.setState({meathod: text})}
                selectTextOnFocus = {true}
                underlineColorAndroid = {'transparent'}
              />
            </View>
          </View>
        */}
          <View style = {styles.inputLine}>
            <Text style = {styles.label}>说明书</Text>
            <View style = {[styles.inputStyle, {height: 120}]}>
              <TextInput
              style = {styles.searchInput}
                onChangeText = {(text) => this.setState({specification: text})}
                selectTextOnFocus = {true}
                multiline = {true}
                numberOfLines = {6}
                textAlignVertical = {'top'}
                underlineColorAndroid = {'transparent'}
              />
            </View>
          </View>
          <View style = {[styles.inputLine, {justifyContent: 'flex-start'}]}>
            <TouchableHighlight
              underlayColor='rgba(34,26,38,0.1)'
              onPress={()=>this.chooseFile()}
              style={styles.filebuttonStyle}
            >
              <Text style={styles.filebuttonText}>选择文件</Text>
            </TouchableHighlight>
            <Text>未选择文件</Text>
          </View>
          <TouchableHighlight
            underlayColor='rgba(34,26,38,0.1)'
            onPress={()=>this.update()}
            style={[styles.buttonStyle, {alignSelf: 'flex-start', marginLeft: 11,}]}
          >
            <Text style={styles.buttonText}>上传</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='rgba(34,26,38,0.1)'
            onPress={()=>this.submit()}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>提交</Text>
          </TouchableHighlight>
        </ScrollView>

           <Modal visible={this.state.Lvisible}
                        style={{height:Dimensions.get('window').height,
                                    width:Dimensions.get('window').width,top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(0,0,0,0.1)'}}>
                                  
                                          {this.state.content}
                             
              </Modal>
              </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 65,
    backgroundColor:'rgba(255,255,255,0.3)',
  },
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
  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  chooseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#333333',
    backgroundColor: '#666666',
    width: 30,
  },
  label: {
    flex: 2,
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 12,
    color: 'white',

  },
  inputStyle: {
    flex: 4,
    height: 30,
    justifyContent: 'center',
    borderColor: '#333333',
    borderRadius: 4,
    borderWidth: 1,
  },
  searchInput: {
    fontSize: 12,
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
    margin: 11,
  },
  buttonText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 18,
    color: '#FEA501',
  },
    modalStyle:{
      top:(Dimensions.get('window').height-300)/2,
      left:(Dimensions.get('window').width-250)/2,
      height:300,
      width:250,
      borderWidth:1,
      borderColor:'#ffffff',
      borderRadius:20,
      backgroundColor: '#ffffff',
  },
  filebuttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginRight: 6,
    height: 20,
    width: 80,
    borderWidth: 0.4,
    borderRadius: 10,
  },
  filebuttonText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 12,
    color: '#333333',
  },
});

export default AddMedcine;