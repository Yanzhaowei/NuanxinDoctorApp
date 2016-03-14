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
  Alert,
 TouchableHighlight,
 TouchableOpacity,
} from 'react-native';

import ViewPager from './MainBar';
import PatientTB from './PatientTB';
import Diagnose from './Diagnose';
import ChooseMedis from './ChooseMedis';
import EatMedine from './EatMedine';


var PatientMsg={
  'diag':[],
  'med':[],
  'doctor_id':'',
  'patient_id':'',
};

var is_update=false;

class AddOrder extends Component{
  constructor(props){
    super(props);
    PatientMsg['doctor_id']=this.props.doctorId;
     PatientMsg['patient_id']=this.props.patientId;
};
handleBack(){
  this.props.navigator.pop();
};
gotoPage(num){
  this.refs['page'].goToPage(num);
};

postSick(){
  var tempDiag=PatientMsg['diag'].map((value)=>{
        return value['name'];
  });
  //console.log(tempDiag);
  this.refs['Media'].tigglePar('isLoad',false);
  fetch(Meds_URL,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               doctor_id:this.props.doctorId,
               'diags':tempDiag,
            })
      })
      .then((response) => {
         //console.log(response);
           return response.json();
      })
      .then((responseData)=>{
        //console.log(responseData);
        this.refs['Media'].postData(responseData);
      })
      .catch((err)=>{
         this.refs['Media'].tigglePar('isLoad',true);
          console.log(err);  
      })
      .done(); 
};

handleSubmit(position){
  if (position == 1) {
    PatientMsg['med']=[];
    this.refs['EM'].reDrawPage(PatientMsg);
      if (PatientMsg['diag'].length <= 0) {
                 this.refs['Media'].tigglePar('isEmpty',true); //根据数据是否为空做除相应的界面更改
      }
      else{
          if (is_update) {
            //判断当前是否有选中的药物
               //提交数据
                this.postSick();
                 this.refs['Media'].tigglePar('isEmpty',false);
            //标记数据已经修改
            is_update=false;
        }
      }
    
  }
}

changeMedia(media,isdel,name){
  if (name == 'diag') {
    //标记数据已经被修改过 需要重新上传数据
      is_update=true;
  }
    if (isdel) {
        for (var i = 0; i <PatientMsg[name].length ; i++) {
          if (PatientMsg[name][i] === media) {
                PatientMsg[name].splice(i,1);
          }
        }
    }
    else{
        PatientMsg[name].push(media);       
    }  
    this.refs['EM'].reDrawPage(PatientMsg);
};
render(){
    return  (
        <View style={styles.container}>
          <View style={styles.tittle}>
              <View style={styles.titleContent}>
                  <TouchableOpacity onPress={()=>this.handleBack()} style={{ flexDirection: 'row',width:50}}>
                      <Image  source={require('../../images/icon/back.png')} style={{marginRight:5,}}/>
                      <Text style={styles.txtColor}></Text>
                  </TouchableOpacity>
                  <Text style={[styles.txtColor,{fontSize:15}]}>添加药单</Text>
                  <Text style={[styles.txtColor,{width:50}]}></Text>
              </View>
          </View>
          <View style={styles.FGView}></View>
              <ViewPager handleSubmit={(position)=>this.handleSubmit(position)}  ref='page'  renderTabBar={()=><PatientTB />}>
                  <View tabLabel='诊断'>
                        <Diagnose  
                              navigator={this.props.navigator}
                              diags={this.props.diags}
                              doctorId={this.props.doctorId}
                              changeMedia={(media,isdel)=>this.changeMedia(media,isdel,'diag')}  
                              gotoPage={(num)=>this.gotoPage(num)}/>
                  </View>
                  <View  tabLabel='选药'>
                        <ChooseMedis  
                              ref='Media'
                              navigator={this.props.navigator}
                              postSick={()=>{this.postSick()}}
                              doctorId={this.props.doctorId}
                              changeMedia={(media,isdel)=>this.changeMedia(media,isdel,'med')}  
                              gotoPage={(num)=>this.gotoPage(num)}
                        />
                  </View>
                  <View tabLabel='服用方法'><EatMedine  ref='EM' PatientMsg={PatientMsg} /></View>
              </ViewPager>
             
        </View>
      );
};
};


const styles = StyleSheet.create({
    container:{
    flex:1,
    flexDirection: 'column',    
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
  mainView:{
    flex:1,
    flexDirection: 'column',    
    backgroundColor:'#F4F1F5',
    alignItems:'center',
  },
  
});


export default AddOrder;
