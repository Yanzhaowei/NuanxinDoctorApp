'use strict'

import React, {
  Alert,
  Component,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

import OrderList from '../cal/OrderList';

class OrderListIso extends Component {
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
            <Text style={styles.name}>订单列表</Text>
            <View style={{width:50}}></View>
          </View>
        </View>
        <View style={styles.listHeader}>
         <Text style={styles.listHeaderText}>订单列表</Text>
        </View>
        <OrderList navigator={this.props.navigator} doctorId={this.props.doctorId}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
	},
  listHeader: {
    backgroundColor: '#F08300',
    justifyContent: 'center',
    height: 30,
  },
  listHeaderText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
		fontWeight: '100',
    color: '#FFFFFF',
    marginLeft: 11,
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
});

export default OrderListIso;
