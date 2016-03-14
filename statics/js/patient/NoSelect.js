
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

class NoSelect extends Component{
  constructor(){
    super();
 };

  render(){
          return (
                  <View style={[styles.noSelect,this.props.style]}>
                  <Text style={styles.noSelectTxt}>{this.props.txt?this.props.txt:'没有选择'}</Text>
                  </View>
            );
    };

};
const styles = StyleSheet.create({
	 noSelect:{
	      flex:1,
	      justifyContent:'center',
	      alignItems:'center',
	  },
	  noSelectTxt:{
	      fontSize:16,
	      fontWeight:'400',
	  },
});

  export default NoSelect;
