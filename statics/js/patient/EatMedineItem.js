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
                
import Modal from 'react-native-root-modal';
import EatDatesModal from './EatDatesModal';

  var isCheack=[
  ['j',true],
  ['m',false],
  ['h',false],
  ['mo',false],
];
var day=1;
class EatMedineItem extends Component{
  constructor(props){
    super(props);  
    this.state={
      Cheack:isCheack,
      MediaNums:this.props.media['mediaNums'],
      Lvisible:false,
      modal:'',
    };
     this.props.media['startTime']=new Date().toLocaleDateString();
  };

closeModal(){
    this.setState({Lvisible:false});
}

changeDay(index,day){
  this.state.MediaNums[index][6]=day;
  this.setState({MediaNums:this.state.MediaNums});
};

cheackTime(name){
  let  dtTmp=new Date();
  let newList=isCheack.map((value,index)=>{
    if (name == value[0]) {
      let date=new Date(dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate()+index, dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
          this.props.media['startTime']=date.toLocaleDateString();
    };
    return [value[0],name == value[0]];
  });
  this.setState({Cheack:newList});
};

changeColor(){
var newList=isCheack.map((value,index)=>{
    if (index == 3) {
        return [value[0],true];
    }
    return [value[0],false];
  });
  this.setState({Cheack:newList});
};

more(){
  this.props.more();
};
cheackMedia(index,rows){
   this.state.MediaNums[index][rows]=this.state.MediaNums[index][rows]?false:true;
  
    this.setState({MediaNums:this.state.MediaNums});
};

add(index,row){
  if(this.state.MediaNums[index][row]!=null){
      if (row == 4) {
        this.state.MediaNums[index][row]+=0.5;
      }
      else{
        this.state.MediaNums[index][row]=parseInt( this.state.MediaNums[index][row])+1;
      }
  }
  else{
    if (row == 4) {
        this.state.MediaNums[index][row]=0.5;
      }
      else{
         this.state.MediaNums[index][row]=1;
      }
  }
   this.setState({MediaNums:this.state.MediaNums});
};
minu(index,row){
    if(this.state.MediaNums[index][row]!=null){
      if (this.state.MediaNums[index][row]>0) {
        if (row == 4) {
        this.state.MediaNums[index][row]-=0.5;
      }
      else{
        this.state.MediaNums[index][row]-=1;
      }
       }
      }
      else{
        this.state.MediaNums[index][row]=0;
      }
   this.setState({MediaNums:this.state.MediaNums});
};

changeTxt(index,row,txt){
  
    if (txt) {
        let txtInt=parseInt(txt);
        if (txtInt) {
           if (txtInt<0) {
            txtInt=0;
          }
          this.state.MediaNums[index][row]=txtInt;
        };
    }
    else{
        this.state.MediaNums[index][row]=null;
    }
    this.setState({MediaNums:this.state.MediaNums});
};

delPage(index){
//Alert.alert(''+this.state.MediaNums.length);
  if (this.state.MediaNums.length>1) {
      this.state.MediaNums.splice(index,1);
      this.setState({MediaNums:this.state.MediaNums});
  }
  else{
    Alert.alert('the end ,not delete');
  }
   
};
addPage(index){
  //Alert.alert(index+'');
     this.state.MediaNums.splice(index+1,0,[true,false,false,false,null,null,1]);
     this.setState({MediaNums:this.state.MediaNums});
};

showModel(index,value){
  day=value[6];
  var modals=(
          <EatDatesModal isEveryday={value[6]} changeDay={(day)=>this.changeDay(index,day)}   closeModal={()=>this.closeModal()}/>
  );
  if (this.state.Lvisible === false) {
     this.setState({Lvisible:true,modal:modals});
  }
  else{
       this.setState({Lvisible:false});
  };
};



MedList(){
  var newList=this.state.MediaNums.map((value,index)=>{
      return (
        <View key={index}>
             <View style={styles.startTime}>
                           <TouchableOpacity onPress={()=>this.showModel(index,value)}>
                                <Text style={{color:'blue'}}>{value[6]==1?'每日服用':`每${value[6]}日一次`}</Text>
                           </TouchableOpacity> 
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
                                      placeholder='服用剂量' 
                                      placeholderTextColor='#BFBFBF'
                                      keyboardType='numeric'   
                                      value ={value[4] != null?(value[4]+''):''}
                                      onChangeText={(txt)=>this.changeTxt(index,4,txt)}/>
                                </View>
                                <TouchableOpacity
                                    style={styles.quart}
                                    onPress={()=>this.add(index,4)} >
                                    <Text  style={styles.quartTxt}>+</Text>
                                 </TouchableOpacity>
                          </View>
                          <Text style={{flex:1,}}> {this.props.media['unit']}/次</Text>
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
                                      style={{fontSize:15,color:'#000000', textAlign:'center'}} 
                                      placeholder='服用周期' 
                                      placeholderTextColor='#BFBFBF'
                                      keyboardType='numeric'   
                                      value ={value[5] != null?(value[5]+''):''} 
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
                                    <TouchableOpacity onPress={()=>this.delPage(index)} style={styles.btnMDel}><Text style={{color:'#FE9300'}}>删除</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.addPage(index)} style={styles.btnMDel}><Text style={{color:'#FE9300'}}>调量</Text></TouchableOpacity>
                            </View>
                      </View>
                    
              </View>
        );

  });
return newList;
};

  render(){
      return  (
            <View style={styles.MainMB}>
                <View style={styles.container}>
                      <View style={styles.title}>
                          <View style={{width:60}}></View>
                          <Text style={styles.txtColor}>{this.props.media['name']}</Text>
                          <TouchableOpacity style={styles.MB}><Text style={{color:'white'}}>模板</Text></TouchableOpacity>
                      </View>
                      <View style={styles.startTime}>
                            <Text style={styles.txtColor}>开始时间</Text>
                            <View style={styles.startTimeCheack}>
                                <TouchableOpacity 
                                    onPress={()=>this.cheackTime('j')}
                                    style={[styles.startTimeCheackItem,{marginLeft:0, backgroundColor:this.state.Cheack[0][1]?'#FE9300':'rgb(244,241,245)',}]}>
                                    <Text style={{color:this.state.Cheack[0][1]?'white':'black',}}>今天</Text>
                                  </TouchableOpacity>
                                <TouchableOpacity 
                                  onPress={()=>this.cheackTime('m')}
                                   style={[styles.startTimeCheackItem,{backgroundColor:this.state.Cheack[1][1]?'#FE9300':'rgb(244,241,245)',}]}>
                                   <Text style={{color:this.state.Cheack[1][1]?'white':'black',}}>明天</Text>
                                 </TouchableOpacity>
                                  <TouchableOpacity 
                                    onPress={()=>this.cheackTime('h')}
                                    style={[styles.startTimeCheackItem,{backgroundColor:this.state.Cheack[2][1]?'#FE9300':'rgb(244,241,245)',}]}>
                                    <Text style={{color:this.state.Cheack[2][1]?'white':'black',}}>后天</Text>
                                  </TouchableOpacity>
                                <TouchableOpacity 
                                  onPress={()=>this.more()}
                                   style={[styles.startTimeCheackItem,{backgroundColor:this.state.Cheack[3][1]?'#FE9300':'rgb(244,241,245)',}]}>
                                 <Text style={{color:this.state.Cheack[3][1]?'white':'black',}}>更多</Text>
                                </TouchableOpacity>
                            </View>
                      </View>
                      {this.MedList()}
                      
                </View>
                <Modal visible={this.state.Lvisible}  
                      style={{height:Dimensions.get('window').height,
                                  width:Dimensions.get('window').width,top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                                  <View style={styles.modalStyle}>
                                        {this.state.modal}
                                  </View>
                </Modal>

            </View>
        );
  };
};


const styles = StyleSheet.create({
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


export default EatMedineItem;
