'use strict';

import React, {
  Component,
  Text,
  View,
  ListView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

var WINDOW_HEIGHT = Dimensions.get('window').height;

import styles from './styles'
import Modal from 'react-native-root-modal';
import BackTitle from './back';



class CaseHistory extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            caseData:false,
            dataSource:ds.cloneWithRows(['1','2','3']),
        }
        this.postCaseData();
    }

    _classicCaseList() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowdata)=>{return this._renderRow(rowdata)}}
            />

        );
    }

    //病例显示数据
    _renderRow(rowdata) {
        return (
            <View style={{paddingTop:20}}>
                <View style={{paddingBottom:10}}>
                    <Text style={styles.caseHistoryTitle}>
                        {rowdata.description}
                    </Text>
                </View>
                <View style={{backgroundColor:'rgba(255,255,255,0.2)',borderRadius:5,padding:5}}>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>病情描述：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>
                            　　{rowdata.details}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>主诉：</Text>
                        <Text style={styles.caseText}>
                            　　{rowdata.check}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>曾服药物：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>
                            　　{rowdata.medicine}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>诊断：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>
                            　　{rowdata.diagnose}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>药方：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>
                            　　{rowdata.prescription}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>治疗进展：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>
                            　　{rowdata.progress}
                        </Text>
                    </View>
                    <View style={styles.caseLine}>
                        <Text style={styles.caseLineTitle}>总结：</Text>
                        <Text style={[styles.caseText,{fontSize:14}]}>　　{rowdata.summary}</Text>
                    </View>
                </View>
            </View>
        )

    }

    _isDataLoad() {
        if(this.state.caseData){
            return  this._classicCaseList()
        }
        else{
         return  this._NoclassicCase()
        }
    }

    //当没有数据返回时的页面
    _NoclassicCase(){
        return(
            <View style={styles.nocase}>
                <Image
                    source={require('../../images/me/casepage.png')}
                    style={{width:100,height:100}}
                />
                <View style={{paddingBottom:5}}>
                    <Text style={styles.writeText}>您暂时没有经典病例,</Text>
                </View>
                <View>
                    <Text style={styles.writeText}>请点击右上方添加按钮添加。</Text>
                </View>
            </View>
        )
    }

    //返回病例数据
    postCaseData(){
        fetch(TypicalList_URL,{
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
               return response.json();
          })
          .then((responseData)=>{
            this.setState({
                caseData:responseData,
                dataSource:this.state.dataSource.cloneWithRows(responseData),
            })
          })
          .catch((err)=>{
              console.log(err.toString());
          })
          .done();
    };


  render() {
    return (
        <View>
            <BackTitle
                navigator={this.props.navigator}
                addBtn={true}
                title={'经典病例'} />
                <Image
                    source={require('../../images/load/background.png')}
                    style={styles.allPage}>
                    <ScrollView style={{height:300}}>
                    {this._isDataLoad()}
                    <View style={{height:80}}></View>
                    </ScrollView>
                </Image>
        </View>
      );
  }
}
export default CaseHistory;