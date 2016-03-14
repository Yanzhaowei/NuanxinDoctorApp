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
} from 'react-native';
import Home from "./Home"
import PatientSelf from './PatientSelf';
const {_width,_height}=Dimensions.get('window');

class NavigatorHome extends Component{
  constructor(){
    super();
    };
    RouteMapper(route, navigator){
      if (route.name == 'home') {
       return   <View   style={styles.container}>
        <Home />
          </View>
      }
      else if(route.name == 'self'){
          return <Text>11</Text>
      }

    };
    render(){
      return     <Navigator
      style={styles.container}
          initialRoute={{name:'home'}}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.RouteMapper} />
        
    }
  };

const styles = StyleSheet.create({
container:{
    flex: 1,
    flexDirection: 'column',
     width:_width,
  height:_height,
},
  background:{
    width:_width,
    height:_height,
    flex:1,
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

  export default NavigatorHome;
