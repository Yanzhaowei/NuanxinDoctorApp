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
                
var DataJson=[];

var ischeack=[];
class Diagnose extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoad:true,
      isCheack:[],
      dataJson:[],
      diags:this.props.diags,
  };
};

createFullData(){
   let dataJson=[]; 
      let tempJson;
      //
     for (let i = 0; i <this.props.diags.length; i++) {
            ischeack[i]=false;
            if (i % 2 == 0) {
                tempJson=[];
                tempJson[0]=this.state.diags[i];
                if (i == this.state.diags.length-1) {
                    dataJson.push(tempJson);
                }
            }
            else{
                  tempJson[1]=this.state.diags[i];
                   dataJson.push(tempJson);
            }
      };

      this.setState({isCheack:ischeack,dataJson:dataJson});
};

componentDidMount(){
     this.createFullData();
}

pushLoad(data){
   
      this.state.diags.push(data);
      this.setState({diags:this.state.diags});
      this.createFullData();
};

handleCheack(index,Msg){    
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

addDiannosis(){
    this.props.navigator.push({
          name:'addDianosis',
          pushLoad:(data)=>this.pushLoad(data),
    });
};

dSubmit(){
      this.props.gotoPage(1);
  };

  render(){
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
              onPress={()=>this.handleCheack((index*2),data[0])} 
              style={[styles.rowData,{backgroundColor:this.state.isCheack[(index*2)]?'#FE9300':'rgb(244,241,245)'}]}>
                  <Text style={[styles.rowDataText,{color:this.state.isCheack[(index*2)]?'white':'black'}]}>{data[0]['name']}</Text>
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
                    <TouchableOpacity onPress={()=>this.addDiannosis()} style={styles.submitContent}><Text style={styles.txtSubStyle}>添加诊断</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.dSubmit()} style={[styles.submitContent,{marginRight:50,}]}><Text style={styles.txtSubStyle}>提交</Text></TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        );
      }
       else{
            return <Text>AAAA</Text>;
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


export default Diagnose;