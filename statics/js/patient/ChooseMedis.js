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
                
import Loading from './Loading';
import NoSelect from './NoSelect';
var DataJson=[
  ];
var ischeack=[];
class ChooseMedis extends Component{
  constructor(){
    super(); 
    
    this.state={
      isLoad:false,
      isEmpty:true,
      dataJson:[],
      data:[],
      isCheack:[],
  };
};

tigglePar(key,is_open){
  if (key == 'isLoad') {
      this.setState({'isLoad':is_open});
  }
  else if(key == 'isEmpty'){
    this.setState({'isEmpty':is_open});
  }    
}

createData(postData){
     let dataJson=[]; 
      let tempJson;
      //
     for (let i = 0; i <postData.length; i++) {
            ischeack[i]=false;
            if (i % 2 == 0) {
                tempJson=[];
                tempJson[0]=postData[i];
                if (i == postData.length-1) {
                    dataJson.push(tempJson);
                }
            }
            else{
                  tempJson[1]=postData[i];
                   dataJson.push(tempJson);
            }
      };
      return dataJson;
}

handleCheack(index,Msg){    
  Msg['mediaNums']=[[true,false,false,false,null,null,1],];
    if (ischeack[index] === false) {
        ischeack[index] =true;
        this.props.changeMedia(Msg,false);
    }
    else{
        ischeack[index] =false;
        this.props.changeMedia(Msg,true);
    }
     this.setState({isCheack:ischeack});
};

addMedcine(){
      this.props.navigator.push({
          name:'addMedcine',
          postSick:this.props.postSick,
       });
};

postData(data){
  //Alert.alert(data[0]);
  //console.log(data);
  for (var i = 0 ; i < data['meds'].length; i++) {
      ischeack[i]=false;
    };
  var dataJson = this.createData(data.meds)
  this.setState({isLoad:true,data:data.meds,dataJson:dataJson,isCheack:ischeack});
}

dSubmit(){
      this.props.gotoPage(2);

  };
  render(){
    if (this.state.isEmpty) {
        return (
            <NoSelect  txt='还没有选择任何症状...' style={{height:Dimensions.get('window').height-200,}}/>
        );
    }
    if (this.state.isLoad) {
      var ListContent=this.state.dataJson.map((data,index)=>{
      var temp;
      var two=(index+1)*2-1;
        if (data[1]) {
          temp= <TouchableOpacity 
                activeOpacity={1}
                onPress={()=>this.handleCheack(two,data[1])} 
                style={[styles.rowData,{marginRight:20,backgroundColor:this.state.isCheack[two]?'#FE9300':'rgb(244,241,245)'}]}>
                <Text style={[styles.rowDataText,{color:this.state.isCheack[two]?'white':'black'}]}>
                  {data[1]['name']}
                </Text>
              </TouchableOpacity>;
        }
        else{
            temp= <TouchableOpacity 
             
                style={[styles.rowData,{marginRight:20,backgroundColor:'rgba(0,0,0,0)',borderWidth:0,}]}>
                <Text style={[styles.rowDataText]}>
                </Text>
              </TouchableOpacity>;
        }

        return (
              <View key={index} style={styles.row}>
              <TouchableOpacity 
              activeOpacity={1}
              onPress={()=>this.handleCheack(index*2,data[0])} 
              style={[styles.rowData,{backgroundColor:this.state.isCheack[index*2]?'#FE9300':'rgb(244,241,245)'}]}>
                  <Text style={[styles.rowDataText,{color:this.state.isCheack[index*2]?'white':'black'}]}>{data[0]['name']}</Text>
              </TouchableOpacity>
              {temp}
          </View>
          );
      });
      return  (
          <View style={styles.container}>
          <ScrollView>
            <View style={styles.MainMB}>
                <View style={{marginTop:20,}}>
                      <View style={{flex:1,flexDirection: 'column',marginBottom:15,}}>
                            {ListContent}
                      </View>
                </View>
            </View>
            <View style={styles.Submit}>
                    <TouchableOpacity onPress={()=>this.addMedcine()} style={styles.submitContent}><Text style={styles.txtSubStyle}>添加药物</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.dSubmit()} style={[styles.submitContent,{marginRight:50,}]}><Text style={styles.txtSubStyle}>提交</Text></TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        );
      }
       else{
            return <Loading style={{height:Dimensions.get('window').height-200}}/>;
        };
};
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    height:Dimensions.get('window').height-200,
  },
  MainMB:{
      margin:10,
   
      backgroundColor:'white',
      borderRadius:5,
      borderWidth:1,
      borderColor:'white',
  },
  Submit:{
     marginTop:20,
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
  },
  submitContent:{
      flex:1,
      borderWidth:1,
      borderColor:'#FE9300',
      borderRadius:15,
      height:30,
      marginLeft:50,
       justifyContent:'center',
  },
  txtSubStyle:{
      textAlign:'center',
      color:'#FE9300',
  },
  row:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    padding:7,
  },
  rowData:{
    borderWidth:1,
    flex:1,
    marginLeft:20,
    height:30,
    justifyContent:'center',
    borderRadius:15,
    borderColor:'#cccccc',
  },
  rowDataText:{
    textAlign:'center',
  },

});

export default ChooseMedis;