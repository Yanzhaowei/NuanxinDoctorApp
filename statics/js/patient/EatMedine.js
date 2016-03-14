'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
                
import EatMedineItem from './EatMedineItem';
import DatePicker from '../cal/DatePicker';
import NoSelect from './NoSelect';
class EatMedine extends Component{
  constructor(props){
    super(props);  

   // let value=this.props.PatientMsg;
    this.state={
      isLoad:true,
      PatientMsg:this.props.PatientMsg,
      pickerData: '',
      changeColor:'',
  };
};

reDrawPage(Msg){
    this.setState({PatientMsg:Msg})
};

more(index){
  //console.log(this.refs[index]);
  this.setState({pickerData: this.state.PatientMsg['med'][index],changeColor:this.refs[index].changeColor.bind(this.refs[index])})
  this.refs['datepicker'].picker.show();
  //Alert.alert('shiw');
};

postPatient(){
    fetch(SavePrescript_URL,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               doctor_id:this.state.PatientMsg['doctor_id'],
               patient_id:this.state.PatientMsg['patient_id'],
               diag:this.state.PatientMsg['diag'],
               med:this.state.PatientMsg['med'],
            })
      })
      .then((response) => {
           return response.json();
      })
      .then((responseData)=>{
        console.log(responseData);
      })
      .catch((err)=>{
          console.log(err.toString());
      })
      .done(); 
};
//检测是否填写完整数据格式
cheakData(datas){
//console.log(datas['med']);
  for (let data of datas['med']){
      for (let value of data['mediaNums']){
             if (value[4] == null || value[5] == null) {
                 return false;
              }
      }
  }
    //Alert.alert('成功提交代码');
    return true;
}

submit(){
     var json= JSON.stringify(this.state.PatientMsg);
     //console.log(json);
     if (!this.cheakData(this.state.PatientMsg)) {
          ToastAndroid.show('请填写完整数据', ToastAndroid.SHORT)
     }
     else{
        this.postPatient();
     }
};
mediaControl(){
    let MediaList=this.state.PatientMsg['med'].map((value,index)=>{
        return   <EatMedineItem ref={index} more={()=>this.more(index)} key={index} media={value} />
    });
    return MediaList;

};
  render(){
    var Content;
     
    if (this.state.isLoad) {

          if (this.state.PatientMsg['med'].length>0){
            Content=  <ScrollView>
                  {this.mediaControl()}
                  <View style={styles.Submit}>
                          <TouchableOpacity style={[styles.submitContent,{borderWidth:0,backgroundColor:'rgba(0,0,0,0)'}]}><Text></Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.submit()}  style={[styles.submitContent,{marginRight:50,}]}><Text style={styles.txtSubStyle}>提交</Text></TouchableOpacity>
                  </View>
                  <View style={{height:150}}></View>
            </ScrollView>
        }
        else{
            return <NoSelect txt='还没有选择任何药物...'  style={{height:Dimensions.get('window').height-200,}}/> ;
        }
      return  (
        <View style={{flex:1,flexDirection:'column',height:Dimensions.get('window').height}}>
          <View style={styles.container}>
            {Content}
          </View>
        <DatePicker changeColor={this.state.changeColor} data={this.state.pickerData} ref='datepicker' style={{flex:1,}}/>
        </View>
        );
      }
       else{
            return <Text>AAAA</Text>;
        };
};
};



const styles = StyleSheet.create({
  container:{
    flex:4,
    flexDirection: 'column',
   height:Dimensions.get('window').height-200,
  },
  MainMB:{
      margin:10,
      backgroundColor:'white',
      borderRadius:5,
      borderWidth:1,
      borderColor:'white',
  },
  Submit:{
     marginTop:20,
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
  },
  submitContent:{
      flex:1,
      borderWidth:1,
      borderColor:'#FE9300',
      borderRadius:15,
      height:30,
      marginLeft:50,
       justifyContent:'center',
  },
  txtSubStyle:{
      textAlign:'center',
      color:'#FE9300',
  },
  row:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    padding:7,
  },
  rowData:{
    borderWidth:1,
    flex:1,
    marginLeft:20,
    height:30,
    justifyContent:'center',
    borderRadius:15,
    borderColor:'rgb(55,55,55)',
  },
  rowDataText:{
    textAlign:'center',
  },

});


export default EatMedine;
