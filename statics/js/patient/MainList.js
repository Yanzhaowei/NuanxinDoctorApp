'use strict';
import React, {
  AppRegistry,
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
  PullToRefreshViewAndroid,
} from 'react-native';



var json={};
var sectionIDS=[];
var rowIDs=[];

class MainList extends Component{
  constructor(props){
    super(props);

    var getSectionData = (dataBlob, sectionID) => {
          return dataBlob[sectionID];
     }
    var getRowData = (dataBlob, sectionID, rowID) => {
          return dataBlob[sectionID + ':' + rowID];
    }
    var dataSource=new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData: getSectionData,
           getRowData: getRowData,
      });
    this.state={
      data:this.props.data,
      dataSource:dataSource,
      isLoad:false,
      isSuccess:true,
  };
};

componentDidMount(){
   this.BaseCreateData(this.props.data,'newfollowTime');
   //Alert.alert(this.props.diags.length+'');
};

reload(){
  this.setState({data:this.props.data});
  this.BaseCreateData(this.props.data,'newfollowTime');
}

createByTimes(){

};

BaseCreateData(Datas,name){
      json={};
      sectionIDS=[];
      rowIDs=[];
      for (let data of Datas){
           if (!json[data[name]]) {
                 json[data[name]]={};
                 sectionIDS.push(data[name]);
                 rowIDs.push([]);
            }
            let index;
            for (var i = 0; i < sectionIDS.length; i++) {
                if (sectionIDS[i] == data[name]) {
                    index=i;
                    break;
                }
            };
          let  row= (rowIDs[index].length+1)+'';
          rowIDs[index].push(row)
           json[data[name]+':'+row]=data;
      };
      //console.log(json);
    //  Alert.alert(this.state.data.length+'');
      this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(json,sectionIDS,rowIDs),});
};

createData(name){
      this.BaseCreateData(this.state.data,name);
};

isCollect(){
      var collectValues=this.state.data.filter((value)=>{
          value['isCollect'] = (value['relstate'] == 3||value['relstate']==7)?'已收藏':false;
          return value['isCollect'] != false;
      });
      this.BaseCreateData(collectValues,'isCollect');
};

classifyByDia(name){
    let tempData=this.state.data.filter((value)=>{
        let is_true=false;
          value['diagnoses'].forEach((dValue)=>{
              if (dValue == name) {
                console.log(dValue);
                value['dia']=name;
                is_true=true;
                return ;
              }
          });
          return is_true;
    });
    console.log(tempData);
     this.BaseCreateData(tempData,'dia');
};


handlePatient(rowdata){
  //this.props.closeModal();
  //Alert.alert(rowdata.name);
  this.props.navigator.push({
    name:'self',
    patientData:rowdata,
    diags:this.props.diags,
  });
};
  renderRow(rowdata,sectionID,rowID){
   // console.log(rowdata.id);
    var rowDiaStr='';
   for (var i = 0; i < rowdata.diagnoses.length; i++) {
         rowDiaStr+=(rowdata.diagnoses[i]+'、'); 
       };
    rowDiaStr = rowDiaStr.substring(0,rowDiaStr.length-1);
    if (rowDiaStr.length>8) {
      rowDiaStr = rowDiaStr.substring(0,8);
      rowDiaStr=rowDiaStr[rowDiaStr.length-1]=='、' ?rowDiaStr.substring(0,rowDiaStr.length-1):rowDiaStr;
      rowDiaStr+='……';
    };
    return (
    <TouchableOpacity onPress={()=>this.handlePatient(rowdata)}>
        <View style={styles.item}>
            <View style={styles.itemImage}>
              <Image
                source={require('../../images/load/kobe.jpg')}
                style={styles.image} />
            </View>

            <View style={styles.itemContent}>
              <Text style={styles.itemHeader}>{rowdata.name==''?'未命名':rowdata.name}</Text>

              <View style={styles.jump}>
              <Text style={styles.redText}>
                {rowDiaStr}
              </Text>
                 <Image
                source={require('../../images/load/jump.png')} />
              </View>
            </View>
      </View>
   </TouchableOpacity>
      );

  };
  renderSectionHeader(sectionData,sectionID){
      var valueData=sectionID.toString();
      var tempList=valueData.split('-');
      if (tempList.length>1) {
          valueData=tempList[0]+'年'+parseInt(tempList[1])+'月'+parseInt(tempList[2].split(' ')[0])+'号';
      }
    return (
        <View style={{justifyContent:'center',padding:10}}>
      <Text style={{color:'#F08300',fontSize:13}}>{valueData}</Text>
      </View>
      );
  };

  _renderFooter(){
    //return  <View style={{height:185}}></View>
      //return <View style={{height:50}}><Text>到底了</Text></View>
  };
  _renderScrollComponent(){
      return <ScrollView></ScrollView>
  };
  onEndReached(){
   //tempData.push({'id':(tempData.length+1),'name':'zhansan','jb':'duoliang','time':'2013-02-04','isCollect':true});
    //this.createData('time');
    //this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(json,sectionIDS,rowIDs),});
    //this.props.changeNums(tempData.length);
  };
  render(){
    
           return (
                    <PullToRefreshViewAndroid
                        enabled={true}
                        style={{width:Dimensions.get('window').width}}>
                          <ScrollView style={{height:Dimensions.get('window').height,}}>
                                  <ListView
                                    ref="listview"
                                    style={styles.listview}
                                    pageSize={1}
                                    initialListSize={this.state.length}
                                    renderFooter={()=>this._renderFooter()}
                                    dataSource={this.state.dataSource}
                                    scrollRenderAheadDistance={5}
                                    onEndReachedThreshold={20}
                                    renderRow={(data)=>{return this.renderRow(data);}}
                                    onEndReached={()=>this.onEndReached()}
                                    renderSectionHeader={this.renderSectionHeader} />

                          </ScrollView>
                    </PullToRefreshViewAndroid>
            );
      
     


  };
};

const styles = StyleSheet.create({
  jump:{
    flexDirection: 'row',
    //flex:2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container:{
    flex:1,
    flexDirection: 'column',
  },
  titleSearch:{
    height:41,
      flex:1,
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
      flex:1,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  outItem:{
     backgroundColor: 'rgba(255,255,255,0.4)',
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
    marginRight:10,
     //backgroundColor: 'RGB(118, 104, 103)',
    borderColor: 'rgba(118, 104, 103, 0.6)',
  },
  itemHeader: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 18,
    flex:3,
    fontWeight: '300',
    color: '#ffffff',
  },
  redText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
   alignSelf:'center',
    fontWeight: '300',
    color: '#f5f5f5',
    marginRight:20,
  },
  listview:{

  },
});


export default MainList;
