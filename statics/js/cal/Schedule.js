'use strict'

import  React, {
  Alert,
  Animated,
  Component,
  Dimensions,
  Navigator,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ListView,
} from 'react-native';

import OrderList from './OrderList';
import Calendar from './Calendar';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state={
      calendarType: 'weekly',
      monthShowed: new Date(),
    };
  }

  changeType(type) {
    if (type=='weekly'){
      this.setState({calendarType: 'monthly'});
    }
    else if (type=='monthly') {
      this.setState({calendarType: 'weekly'});
    }
  }

  changeMonth(month) {
    this.setState({monthShowed: month});
  }
  render() {
    return(
        <Image
          source={require('../../images/load/background.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.title}>
            <Text style={styles.titleText}>日程</Text>
          </View>

          <View style={styles.calendar}>
            <Calendar type={this.state.calendarType }
              monthShowed={this.state.monthShowed}
              changeType={(type)=>{this.changeType(type)}}
              changeMonth={(month)=>{this.changeMonth(month)}}
            />
          </View>
          <View style={styles.listHeader}>
           <Text style={styles.listHeaderText}>订单列表</Text>
          </View>
          <OrderList navigator={this.props.navigator} doctorId={this.props.doctorId}/>
          <View style={{height: 4}}>
          </View>
        </Image>
    );
  }
}
const styles=StyleSheet.create({
	backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 65,
    flex: 1,
	},
  title: {
    height: 45,
    backgroundColor: '#868181',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
		fontFamily: 'PingFang-SC-Regular',
		fontSize: 18,
    color: '#FFFFFF',
  },
  calendar: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
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
});

export default Schedule;
