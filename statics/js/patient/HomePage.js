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
  TouchableOpacity,
  Navigator,
  ProgressBarAndroid,
  TouchableHighlight,
} from 'react-native';
import MainList from './MainList';
import Head from './Head';
import PatientSelf from './PatientSelf';
import Modal from 'react-native-root-modal'
import FLModal from './FLModal'
import Picker from 'react-native-picker';
import Loading from './Loading';
const {_width,_height}=Dimensions.get('window');



class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
      Lvisible:false,
      modalStyle:{},
      modalContent:{},
      isLoad:false,
      isSuccess:true,
      data:[],
      todaylength:0,
      mainListData:[],
      diags:[],
    };
    };

changeNums(num){
  this.refs['head'].changeNum(num);
};

componentDidMount(){
    this.postData();
    //this.changeNums(this.state.data.length);
};


search(txt){
    if (txt.length>0) {
        let tempdata=this.state.data.filter((value)=>{
            return value.name == txt || value.tel == txt;
        });
        if (tempdata.length <= 0) {
            Alert.alert('没有您输入信息的相关病人');
        }
        else{
          //Alert.alert('找到了');
            this.setState({mainListData:tempdata});
            this.refs['mainlist'].reload();
        }
    }
};

getlength(datas){
    let date=new Date();
    let tempdata=datas.filter((value)=>{
        let timeList = value['newfollowTime'].split('-');
        if (timeList[0] == date.getFullYear() && timeList[1] == date.getMonth()+1 && timeList[2] == date.getDate()) {
            return true;
        }
        else{
          return false;
        }
    });
    return tempdata.length;
}

pullRrece(){
this.refs['mainlist'].changeRefresh(true);
fetch(Apppatlist_URL,{
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
        //Alert.alert('asd');
        console.log(responseData);
        let dlength= this.getlength(responseData.patients);
        this.setState({todaylength:dlength,mainListData:responseData.patients, data:responseData.patients,isSuccess:true,diags:responseData.diags,})
        this.refs['mainlist'].changeRefresh(false);
      })
      .catch((err)=>{
        this.refs['mainlist'].changeRefresh(false);
          this.setState({isSuccess:false});
          console.log(err.toString());
      })
      .done();

}

postData(){
  this.setState({isLoad:false});
  //Alert.alert(this.props.doctorId+'');
    fetch(Apppatlist_URL,{
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
        //Alert.alert('asd');
        console.log(responseData);
        let dlength= this.getlength(responseData.patients);
        this.setState({todaylength:dlength,isLoad:true,mainListData:responseData.patients, data:responseData.patients,isSuccess:true,diags:responseData.diags,})

      })
      .catch((err)=>{
          this.setState({isSuccess:false,isLoad:true});
          console.log(err.toString());
      })
      .done();
};


closeModal(){
   if (this.state.Lvisible === true) {
     this.setState({Lvisible:false});
  }
};
classify(name){
  this.setState({mainListData:this.state.data});
  this.refs['mainlist'].reload();
  if (name == 'newfollowTime') {
        this.refs['mainlist'].createData(name);
  }
  else if(name == 'isCollect'){
          this.refs['mainlist'].isCollect();
  }

};
openCenterModal(){
  this.closeModal();
    this.picker.toggle();
};
showModel(){
  if (this.state.Lvisible === false) {
     this.setState({Lvisible:true,
                    modalStyle:{
                      position: 'absolute',
                      right: 10,
                      top: 116.5,
                      height:100,
                      width:100,
                      backgroundColor: 'rgba(255, 255, 255,0.8)',},
                    modalContent:<FLModal  classify={(name)=>this.classify(name)} close={()=>this.closeModal()} openCenter={()=>this.openCenterModal()}/> ,
                  });
  }
  else{
       this.setState({Lvisible:false});
  };
};

pickerDone(pickedValue){
    //Alert.alert(pickedValue[0]);
    this.refs['mainlist'].classifyByDia(pickedValue[0]);
};

  render(){
      if (this.state.isLoad) {
          if (this.state.isSuccess) {
              return (
            //<Text>aaa</Text>
                <Image
                source={require('../../images/load/background.png')}
                style={styles.background}
                >
                <View style={styles.topTitle}>
                <Text style={[styles.textColor,styles.topText]}> 病人</Text>
                </View>

                <Head search={(txt)=>this.search(txt)} dataNums={this.state.todaylength} ref='head' showModel={()=>this.showModel()} />
                <View
                  style={styles.container}
                >
                <MainList  postData={()=>this.pullRrece()}  diags={this.state.diags}  data={this.state.mainListData} doctorId={this.props.doctorId} ref='mainlist' closeModal={()=>this.closeModal()}  changeNums={(num)=>this.changeNums(num)} navigator={this.props.navigator}/>
                <Modal visible={this.state.Lvisible}
                        style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width,top:0,bottom:0,left:0,right:0}}>
                              <TouchableOpacity  onPress={()=>this.closeModal()} style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width,}}>
                                    <View style={this.state.modalStyle}>
                                          {this.state.modalContent}
                                    </View>
                              </TouchableOpacity>
                </Modal>
                  <Picker
                        style={{
                            height: 200,
                        }}
                        pickerBtnText={'提交'}
                        pickerCancelBtnText={'取消'}
                        ref={picker=>this.picker = picker}
                        showDuration={330}
                        showMask={true}
                        onPickerDone={(pickedValue) => this.pickerDone(pickedValue)}
                        pickerData={this.state.diags.map((value)=>value['name'])}
                        selectedValue={'睡眠行为障碍'}/>
                </View>
                </Image>
                );
          }
          else{
              return (
                  <Image
                      source={require('../../images/load/background.png')}
                      style={styles.background}
                      >
                         <TouchableOpacity
                              onPress={()=>this.postData()}
                              style={{height:Dimensions.get('window').height,
                                          width:Dimensions.get('window').width,
                                          flexDirection: 'column',alignItems: 'center',justifyContent: 'center',}}>
                              <Text style={{color:'#F08300',fontSize:16,}}>加载失败</Text>
                              <TouchableOpacity onPress={()=>this.postData()}
                                      style={{borderWidth:1,height:50,width:100,borderRadius:25,borderColor:'#0094ff',justifyContent:'center',alignItems:'center'}}>
                                     <Text style={{color:'#F08300',fontSize:16,}}>重新加载</Text>
                              </TouchableOpacity>
                        </TouchableOpacity>
                 </Image>
              );
          };
      }
      else{
          return (
                    <Loading />
            );
      };
  };
};

const styles = StyleSheet.create({

container:{
  backgroundColor: 'rgba(255,255,255,0.102)',
    flexDirection: 'row',
   flex:1,
},
  background:{
    width:_width,
    height:_height,
  },
  modal:{
  },
    topTitle:{
     backgroundColor: '#868181',
     height:45,
     justifyContent:'center',
  },
  topText:{
    textAlign:'center',
    fontSize:18,
  },
    textColor:{
    color:'#ffffff',
  },
});

  export default HomePage;