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
  TouchableHighlight,
} from 'react-native';
import MainList from './MainList';
import Head from './Head';
import PatientSelf from './PatientSelf';
import Modal from 'react-native-root-modal'
import FLModal from './FLModal'
import HomePage from './HomePage'
const {_width,_height}=Dimensions.get('window');

class Hometwo extends Component{
  constructor(){
    super();
    this.state={
      nums:0,
      Lvisible:false,
      modalStyle:{},
      modalContent:{},
    };

  };
RouteMapper(route, navigator){

      if (route.name === 'home') {
       return (
            <HomePage navigator={navigator} doctorId={this.props.doctorId}/>
        );
      }
      else if(route.name === 'self'){
          return <PatientSelf diags={route.diags} patientData={route.patientData}  mainNavigator={this.props.mainNavigator} navigator={navigator}/>
      }

    };
    render(){
       return     <Navigator
          style={styles.navigatorStyle}
          initialRoute={{name:'home'}}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={ (route, navigator)=>this.RouteMapper(route, navigator)} />
    }
  };

const styles = StyleSheet.create({
  navigatorStyle:{
    flexDirection: 'row',
    height:Dimensions.get('window').width*2,

  },
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

  export default Hometwo;
