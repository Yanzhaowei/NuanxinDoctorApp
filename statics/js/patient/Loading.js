'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ProgressBarAndroid,
} from 'react-native';

class Loading extends Component{
  constructor(){
    super();
 };

  render(){
          return (
                  <View style={[
                              {height:Dimensions.get('window').height, 
                              width:Dimensions.get('window').width,
                              flexDirection: 'column',alignItems: 'center',justifyContent: 'center',},this.props.style]}>
                          <ProgressBarAndroid />
                  </View>
            );
    };

};
const styles = StyleSheet.create({

});

  export default Loading;
