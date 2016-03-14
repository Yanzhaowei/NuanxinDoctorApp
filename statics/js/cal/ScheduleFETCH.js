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
import Loading from '../patient/Loading';
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state={
      calendarType: 'weekly',
      monthShowed: new Date(),
      data:[],
      isLoad:false,
      isSuccess:true,
    };
  }
  componentDidMount(){
      this.postData();
      //this.changeNums(this.state.data.length);
  };

  postData(){
    Alert.alert('',this.props.doctorId+'');
    this.setState({isLoad:false});
      // Alert.alert('fetch');
      fetch(GetDocOrder_URL,{
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 doctor_id:this.props.doctorId
              })
        })
        .then((response) => {
            Alert.alert('', 'response');
             return response.json();
        })
        .then((responseData)=>{
          // console.log(responseData);

            Alert.alert('',JSON.stringify(responseData));
          this.setState({isLoad:true, data:responseData.patients,isSuccess:true,})
        })
        .catch((err)=>{
            Alert.alert('',err.toString())
            this.setState({isSuccess:false,isLoad:true});
            console.log(err.toString());
        })
        .done();
  };
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
    if (this.state.isLoad) {
      if (this.state.isSuccess) {
        return (
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
            <OrderList navigator={this.props.navigator} />
            <View style={{height: 4}}>
            </View>
        </Image>
        );
      }
      else{
          return (
              <Image
                  source={require('../../images/load/background.png')}
                  style={styles.background}
                  >
                     <View
                          style={{height:Dimensions.get('window').height,
                                      width:Dimensions.get('window').width,
                                      flexDirection: 'column',alignItems: 'center',justifyContent: 'center',}}>
                          <Text style={{color:'#F08300',fontSize:16,}}>加载失败</Text>
                          <TouchableOpacity onPress={()=>this.postData()}
                                  style={{borderWidth:1,height:50,width:100,borderRadius:25,borderColor:'#0094ff',justifyContent:'center',alignItems:'center'}}>
                                 <Text style={{color:'#F08300',fontSize:16,}}>重新加载</Text>
                          </TouchableOpacity>
                    </View>
             </Image>
          );
        };
    }
    else{
        return (
                  <Loading />
          );
    };
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
