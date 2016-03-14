'use strict';
import React, {
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
} from 'react-native';

var text='';

class Head extends Component{
  constructor(props){
    super(props);
    this.state={
      num:this.props.dataNums,
    }
    
};

changeNum(nums){
    this.setState({num:nums});
};
showModel(){
  this.props.showModel();
};
changeTxt(txt){
    text=txt;
};

search(){
    this.props.search(text);
}

  render(){
    return  (
      <View style={styles.container}>
                  <View style={styles.titleSearch}>
                    <View style={styles.titleSNav}>
                    <TouchableOpacity onPress={()=>this.search()} style={{flexDirection: 'row',}}>
                      <Image source={require('../../images/load/search.png')}  style={{height:18,width:18,margin:5,}}/>
                      <View style={{height:30,width:200, justifyContent:'center',}} >
                      <TextInput  
                          style={{fontSize:14,color:'#ffffff',flex:1}} 
                          onChangeText={(txt)=>this.changeTxt(txt)}
                          placeholder='按姓名或电话号码搜索' 
                          placeholderTextColor='#ffffff'   />
                      </View>
                    </TouchableOpacity>
                    </View>
                  </View>
                
                    <View style={styles.title}>
                      <View style={{padding:10,flexDirection: 'row',}}>
                        <Text style={[styles.textColor,{fontSize:14,flex:6,}]}>今日有{this.state.num}名患者关注</Text>
                          <TouchableOpacity style={styles.titleBtn} onPress={()=>this.showModel()}>
                            <Text style={[styles.textColor,{fontSize:14,flex:2}]}>分类</Text> 
                            <Image source={require('../../images/load/sort.png')}  style={{height:18,width:13}}/>    
                          </TouchableOpacity>      
                       
                      </View>
                    </View>
          </View>
      );
};
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
  },
  titleSearch:{
    height:41,
      
     justifyContent:'center',
  },
    titleSNav:{
      height:31,
      borderRadius:3,
      margin:10,
       backgroundColor: 'rgba(255,255,255,0.4)',
       justifyContent:'center',
  },
    title:{
      
      backgroundColor:'#F08300',
      height:30,
       justifyContent:'center',
      
  },
  titleBtn:{
      flex:1,
      flexDirection: 'row',
      marginRight: 16,
      justifyContent:'flex-start'
  },
   textColor:{
     color:'#ffffff',
     fontFamily: 'PingFang-SC-Regular',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height:74,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  outItem:{
     backgroundColor: 'rgba(255,255,255,0.1)',
  },
  image: {
    width: 56,
    height: 56,
    margin: 10,
    borderRadius: 28
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 74,
    borderBottomWidth: 1,
    borderColor: 'rgba(100,53, 201, 0.4)',
  },
  itemHeader: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 18,
    fontWeight: '300',
    color: '#ffffff',
  },
  redText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
    fontWeight: '300',
    color: '#f5f5f5',
  },
    toolbar: {
    backgroundColor: '#F08300',
    height: 56,
  },
});


export default Head;