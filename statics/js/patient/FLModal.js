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
  ScrollView,
  Picker,
} from 'react-native';
import Modal from 'react-native-root-modal'
class FLModal extends Component{
  constructor(){
    super();
};

  handleClickModal(name){
    if (name ==='zd') {
        this.props.openCenter();
    }
    else if(name === 'date'){
           this.props.close();
           this.props.classify('newfollowTime');
    }
    else if(name === 'sc'){
         this.props.close();
           this.props.classify('isCollect');
    }
   
  };

  render(){
    return  (
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>this.handleClickModal('zd')} style={{flex:1}}><View  style={styles.cheack}><Text>诊断</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleClickModal('date')} style={{flex:1}}><View  style={styles.cheack}><Text>日期</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleClickModal('sc')} style={{flex:1}}><View  style={[styles.cheack,{ borderBottomWidth:0,}]}><Text>收藏</Text></View></TouchableOpacity>
          </View>
      );
};
};


const styles = StyleSheet.create({
    container:{
    flex:1,
    flexDirection: 'column',
      
  },
  cheack:{
    flex:1,
    flexDirection: 'column',
     justifyContent:'center',
      alignItems: 'center',
      borderBottomWidth:1,
  },
});


export default FLModal;
