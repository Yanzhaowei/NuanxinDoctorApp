'use strict'

import React,{
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  Dimensions,
} from 'react-native';

var _width = Dimensions.get('window').width;
var _height = Dimensions.get('window').height;

class SplashScreen extends Component { 
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={styles.container}>
        <Image 
          source={require('../../images/load/load_page.png')} 
          style={{
            width: _width,
            height: _height,
          }}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})

export default SplashScreen;
