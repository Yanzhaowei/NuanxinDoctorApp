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
  TouchableHighlight,
   TouchableOpacity,
   ScrollView,
} from 'react-native';


import {RadioButtons} from 'react-native-radio-buttons';

var options=[true,false];
var isSelct=true;
class MedcineModal extends Component{
  constructor(props){
    super(props);
    this.state={
        dataSource:[],
    };
  
};

componentWillMount(){
    let list=this.props.DataJson.map((value)=>value);
    this.setState({dataSource:list});
}

cheak(data,index){
    if (data['isCheak']) {
        data['isCheak']=false;
    }
    else{
         data['isCheak']=true;
    }
    this.state.dataSource[index]=data;
    this.setState({dataSource:this.state.dataSource});
};

close(){
    this.props.closeModal();
};
submit(){
     this.props.closeModal();
      this.props.changeMedia(this.state.dataSource);
};
selectAll(){
    let tempList=this.state.dataSource.map((value)=>{
        value['isCheak']=isSelct;
        return value;
    });
    isSelct=!isSelct;
     this.setState({dataSource:tempList});
};
renderRow(index,data){
 // console.log(data);
    return <TouchableOpacity 
                     onPress={()=>this.cheak(data,index)} 
                     key={index} 
                     activeOpacity={1}
                     style={[styles.baseCheack,{backgroundColor:(!data['isCheak'])?'white':'#0094ff'}]}>
      <Text style={{color:data['isCheak']?'white':'#0094ff'}}>{data.name.name}</Text>
    </TouchableOpacity>
};

createContent(){
      var content=this.state.dataSource.map((data,index)=>{
          return this.renderRow(index,data);
      });
      return content;
}

  render(){
    return  (
          <View style={styles.container}>
              <View style={styles.Main}>
              <View style={{justifyContent:'center',height:30,borderWidth:1,
                        borderColor:'white',backgroundColor:'#EDEDED',alignSelf:'stretch',alignItems:'center'}}>
                      <Text style={{fontSize:14,fontWeight:'bold'}}>请选择医生诊断</Text>
               </View>
               <ScrollView >
                       {this.createContent()}
               </ScrollView>
                </View>
                <View  style={styles.BtnGroup}>
                    <TouchableHighlight
                          onPress={()=>this.close()} 
                          style={[styles.submitContent,]}><Text style={{color:'#FE9300'}}>取消</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                          onPress={()=>this.selectAll()} 
                          style={[styles.submitContent,]}><Text style={{color:'#FE9300'}}>全选</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                          onPress={()=>this.submit()} 
                          style={[styles.submitContent,{marginRight:10}]}><Text style={{color:'#FE9300'}}>提交</Text>
                    </TouchableHighlight>
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
    txtColor:{
        color:'rgb(0,0,0)',
    },
    cheack:{
      flex:1,
      flexDirection: 'column',
       justifyContent:'center',
        alignItems: 'center',
        borderBottomWidth:1,
    },
    BtnGroup:{
      flex:1,
        flexDirection: 'row',
       justifyContent:'center',
        alignItems: 'center',
    },
    Main:{
        flex:3,
        marginTop:20,
        flexDirection: 'column',
    },
      submitContent:{
      flex:1,
      borderWidth:1,
      borderColor:'#FE9300',
      borderRadius:15,
      height:30,
      marginLeft:10,
      alignItems:'center',
       justifyContent:'center',
  },
  baseCheack:{
      height:30,
       flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',

  },
});


export default MedcineModal;
