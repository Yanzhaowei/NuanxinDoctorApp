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
  ScrollView,
} from 'react-native';
class AddModal extends Component{
  constructor(){
    super();
};

  handleClickModal(name){
    if (name ==='zd') {
      this.props.close();
      this.props.mainNavigator.push({
        name:'addOrder',
        diags:this.props.diags,
        patientId:this.props.patientId,
      });
    }
    else if(name === 'date'){
           this.props.close();
           this.props.mainNavigator.push({
            name: 'DoctorRecord',
            openid: this.props.openid,
            patientName: this.props.patientName,
          });
    }
    else if(name === 'sc'){
         this.props.close();
          this.props.mainNavigator.push({
            name: 'WriteTable',
            openid: this.props.openid,
          });
    }

  };

  render(){
    return  (
          <View style={styles.container}>
            <TouchableHighlight onPress={()=>this.handleClickModal('zd')} style={{flex:1}}><View  style={styles.cheack}><Text style={styles.txtColor}>添加服药</Text></View></TouchableHighlight>
            <TouchableHighlight onPress={()=>this.handleClickModal('date')} style={{flex:1}}><View  style={styles.cheack}><Text  style={styles.txtColor}>添加医嘱</Text></View></TouchableHighlight>
            <TouchableHighlight onPress={()=>this.handleClickModal('sc')} style={{flex:1}}><View  style={[styles.cheack,{ borderBottomWidth:0,}]}><Text style={styles.txtColor}>填写量表</Text></View></TouchableHighlight>
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
    cheack:{
      flex:1,
      flexDirection: 'column',
       justifyContent:'center',
        alignItems: 'center',
        borderBottomWidth:1,
    },
});


export default AddModal;