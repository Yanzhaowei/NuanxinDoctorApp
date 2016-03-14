'use strict';
import DrugList from './drugList';

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';


var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;



class DrugDetailed extends Component {
    constructor(props){
      super(props);
      this.state={
        Lvisible:false,
        modal:'',
        MediaNums:[[true,false,false,false,'','',1],],
      };
    };

    //判断是否选中早.中.晚
    cheackMedia(index,rows){
       this.state.MediaNums[index][rows]=this.state.MediaNums[index][rows]?false:true;
       this.setState({MediaNums:this.state.MediaNums});

    };

    //增加计量
    add(index,row){
      if(this.state.MediaNums[index][row]){
           this.state.MediaNums[index][row]+=1;
      }
      else{
        this.state.MediaNums[index][row]=1;
      }
       this.setState({MediaNums:this.state.MediaNums});
    };

    delPage(index){
          this.state.MediaNums.splice(index,1);
          this.setState({MediaNums:this.state.MediaNums});
    };
    addPage(){
         this.state.MediaNums.push([true,false,false,false,'','',1]);
         this.setState({MediaNums:this.state.MediaNums});
    };

    //判断服用计量
    minu(index,row){
        if(this.state.MediaNums[index][row]){
          if (this.state.MediaNums[index][row]>0) {
             this.state.MediaNums[index][row]-=1;
           }
          }
          else{
            this.state.MediaNums[index][row]=0;
          }
       this.setState({MediaNums:this.state.MediaNums});
    };

    MedList(){
        var newList=this.state.MediaNums.map((value,index)=>{
          return (
            <View key={index}>
            {console.log(this.props.drugId)}
            {console.log(this.props.medname)}

                 <View style={styles.startTime}>
                    <View style={styles.startTimeCheack}>
                        <TouchableOpacity
                            onPress={()=>this.cheackMedia(index,0)}
                            style={[styles.startTimeCheackItem,{marginLeft:0, backgroundColor:value[0]?'#FE9300':'rgb(244,241,245)',}]}>
                            <Text style={{color:value[0]?'white':'black',}}>早上</Text>
                          </TouchableOpacity>
                        <TouchableOpacity
                          onPress={()=>this.cheackMedia(index,1)}
                           style={[styles.startTimeCheackItem,{backgroundColor:value[1]?'#FE9300':'rgb(244,241,245)',}]}>
                           <Text style={{color:value[1]?'white':'black',}}>中午</Text>
                         </TouchableOpacity>
                          <TouchableOpacity
                            onPress={()=>this.cheackMedia(index,2)}
                            style={[styles.startTimeCheackItem,{backgroundColor:value[2]?'#FE9300':'rgb(244,241,245)',}]}>
                            <Text style={{color:value[2]?'white':'black',}}>晚上</Text>
                          </TouchableOpacity>
                        <TouchableOpacity
                          onPress={()=>this.cheackMedia(index,3)}
                          style={[styles.startTimeCheackItem,{backgroundColor:value[3]?'#FE9300':'rgb(244,241,245)',}]}>
                          <Text style={{color:value[3]?'white':'black',}}>睡前</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                   <View style={styles.FYNums}>
                      <Text style={{flex:1,}}>服用剂量</Text>
                      <View style={styles.addJ}>
                            <TouchableOpacity
                                onPress={()=>this.minu(index,4)}
                                style={styles.quart}>
                                <Text style={styles.quartTxt}>—</Text>
                            </TouchableOpacity>
                            <View style={{height:30,width:100, justifyContent:'center',alignItems:'center',borderWidth:0,}} >
                                  <TextInput
                                  style={{fontSize:15,color:'#000000',textAlign:'center'}}
                                  placeholder='请输入剂量'
                                  placeholderTextColor='#BFBFBF'
                                  keyboardType='numeric'
                                  value ={value[4]+''}
                                  onChangeText={(txt)=>this.changeTxt(index,4,txt)}/>
                            </View>
                            <TouchableOpacity
                                style={styles.quart}
                                onPress={()=>this.add(index,4)} >
                                <Text  style={styles.quartTxt}>+</Text>
                             </TouchableOpacity>
                      </View>
                      <Text style={{flex:1,}}> 片/次</Text>
                  </View>
                  <View style={styles.FYNums}>
                      <Text style={{flex:1,}}>服用周期</Text>
                     <View style={styles.addJ}>
                            <TouchableOpacity
                                style={styles.quart}
                                onPress={()=>this.minu(index,5)}>
                                <Text style={styles.quartTxt}>—</Text>
                            </TouchableOpacity>
                            <View style={{height:30,width:100, justifyContent:'center',alignItems:'center',borderWidth:0,}} >
                                  <TextInput
                                  style={{fontSize:15,color:'#000000',textAlign:'center',}}
                                  placeholder='请输入剂量'
                                  placeholderTextColor='#BFBFBF'
                                  keyboardType='numeric'
                                  value ={value[5]+''}
                                  onChangeText={(txt)=>this.changeTxt(index,5,txt)}/>
                            </View>
                            <TouchableOpacity
                                style={styles.quart}
                                onPress={()=>this.add(index,5)}>
                                <Text  style={styles.quartTxt}>+</Text>
                            </TouchableOpacity>
                      </View>
                      <Text style={{flex:1,}}>天</Text>
                  </View>
                  <View style={styles.mDel}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center', flexDirection: 'row',}}>
                                <TouchableOpacity
                                    onPress={()=>this.delPage(index)}
                                    style={styles.btnMDel}>
                                    <Text style={{color:'#FE9300'}}>删除</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.addPage()}
                                    style={styles.btnMDel}>
                                    <Text style={{color:'#FE9300'}}>调量</Text>
                                </TouchableOpacity>
                        </View>
                  </View>
          </View>
              );
        });
  return newList;
  };

  render() {
    return (
        <View>
            <View style={styles.headNav}>
                <TouchableOpacity
                style={styles.back}
                onPress= {() => {this.props.navigator.pop()}}>
                    <Image style={styles.headImg}
                    source = {require('../../images/me/back.png')} />
                </TouchableOpacity>
                <View style={styles.headMenu}><Text style={styles.textBold}>药方设置</Text></View>
            </View>
            <ScrollView style={{height:WINDOW_HEIGHT-70}}>
                {this.MedList()}
            </ScrollView>
        </View>

      );
  };
};

const styles = StyleSheet.create({
    headNav: {
        height:45,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#878181',
    },
    headImg: {
        marginLeft:10,
        right:10,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    headMenu: {
        flex:3,
    },
    back: {
        flex:2,
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    textBold: {
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
    },
  MainMB:{
      margin:10,
      backgroundColor:'white',
      borderRadius:5,
      borderWidth:1,
      borderColor:'white',
  },
  txtColor:{
    color:'black',
  },
    container:{
     margin:15,
      flex:1,
      flexDirection: 'column',
      marginBottom:15,
    },
    title:{
      flexDirection: 'row',
      borderBottomWidth:1,
      alignItems:'center',
      justifyContent:'space-between',
      paddingBottom:5,
    },
    MB:{
       alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#FE9300',
      width:60,
      height:30,
      borderWidth:1,
      borderColor:'white',
      borderRadius:15,
    },
    startTime:{
      flexDirection: 'column',
      borderBottomWidth:1,
      marginTop:15,
    },
    startTimeCheack:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:15,
      marginTop:25,
    },
    FYNums:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      paddingBottom:20,
      paddingTop:20,
       borderBottomWidth:1,

    },
    addJ:{
      flex:4,
        flexDirection: 'row',
      alignItems:'center',
       justifyContent:'space-around',
    },
    quart:{
        borderWidth:1,
        borderColor:'#FE9300',
        height:20,
        width:20,
        borderRadius:10,
        alignItems:'center',
       justifyContent:'center',
    },
    quartTxt:{
        color:'#FE9300',
        fontSize:18,
    },
    startTimeCheackItem:{
        flex:1,
        height:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#cccccc',
        marginLeft:20,
        alignItems:'center',
        justifyContent:'center',
    },
    mDel:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop:15,
    },
      btnMDel:{
      flex:1,
      borderWidth:1,
      borderColor:'#FE9300',
      borderRadius:12,
      height:25,
      alignItems:'center',
      justifyContent:'center',
      marginLeft:20,
  },
  modalStyle:{
      top:(Dimensions.get('window').height-200)/2,
      left:(Dimensions.get('window').width-200)/2,
      height:200,
      width:200,
      borderWidth:1,
      borderColor:'#ffffff',
      borderRadius:20,
      backgroundColor: '#ffffff',
  },


});



export default DrugDetailed;