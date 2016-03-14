'use strict'

import React, {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  Component,
  StyleSheet,

} from 'react-native';

class OrderDetails extends Component{
  constructor(props) {
    super(props);
  }
  popOut() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <Image
        source={require('../../images/load/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.tittle}>
          <View style={styles.titleContent}>
          <TouchableOpacity style={{width:50}} onPress={()=>this.popOut()}><Image source={require('../../images/icon/back.png')}></Image></TouchableOpacity>
            <Text style={styles.name}>订单详情</Text>
            <View style={{width:50}}></View>
          </View>
        </View>

        <TextInput
          style = {styles.subjectBox}
          value = {this.props.newsData.subject}
        />
        <TextInput
          multiline = {true}
          numberOfLines = {6}
          textAlignVertical = 'top'
          style = {styles.contentBox}
          value = {this.props.newsData.content}
        />
        <View style={styles.releaseTo}>
         <Text style={styles.releaseToText}>所有患者 》</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableHighlight
            underlayColor='rgba(34,26,38,0.1)'
            onPress={()=>this.popOut()}
            style={styles.buttonStyle}
          >
            <Text style={[styles.normalText,{color: '#666666'}]}>再发一条</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='rgba(34,26,38,0.1)'
            onPress={()=>this.popOut()}
            style={styles.buttonStyle}
          >
            <Text style={[styles.normalText,{color: '#666666'}]}>删除此条</Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}

const styles=StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
	},
  tittle:{
    backgroundColor:'#878181',
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
  name:{
    color:'white',
     fontSize:18,
  },
  titleNameText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 18,
    color: '#FFFFFF',
  },
  contentBox: {
    backgroundColor: '#FFFFFF',
    height: 180,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  subjectBox: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 4,
  },
  releaseTo: {
    backgroundColor: '#F08300',
    height: 40,
    padding: 11,
    justifyContent: 'center',
  },
  releaseToText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 14,
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 11,
    height: 34,
    width: 100,
    borderRadius: 6,
    backgroundColor: '#DDDDDD',
  },
  buttonText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 14,
    color: '#333333',
  },
});
export default OrderDetails;
