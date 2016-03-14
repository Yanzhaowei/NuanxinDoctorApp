'use strict';

import styles from './styles';
import BackTitle from './back';

import React, {
    Component,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    View,
    Alert,
} from 'react-native';


class CaseView extends Component{
    constructor(props){
        super(props);
        this.state = {
            case:{
                check:'',
                description:'',
                details:'',
                diagnose:'',
                doctorId:this.props.doctorId,
                medicine:'',
                prescription:'',
                progress:'',
                summary:'',
            },
            status:null,
        }
    }

    _submitCaseInfo() {
      var caseinfo = this.state.case;
      fetch(AddTypicalCase_URL,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id:caseinfo['doctorId'],
          check: caseinfo['check'],
          tag:'',
          description: caseinfo['description'],
          details: caseinfo['details'],
          diagnose: caseinfo['diagnose'],
          medicine: caseinfo['medicine'],
          prescription: caseinfo['prescription'],
          progress: caseinfo['progress'],
          summary: caseinfo['summary'],
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var data = responseData.status;
        this.setState({
            status:data
        })
        if(this.state.status === 'success'){
            Alert.alert(
              '提示',
              '添加成功',
              [
                {text: '确定',onPress:()=>{this.props.navigator.pop()}}
              ]
            )
        }
      })
      .catch((err)=>{
        Alert.alert(
          '提示',
          '网络异常',
          [
            {text: '确定',onPress:()=>{ return null}}
          ]
        )
      })
      .done()
    };

    //提交按钮事件
    _onPressSubmit() {
        if(this.state.status === 'success'){
            Alert.alert(
              '提示',
              '已成功添加',
              [
                {text: '确定',onPress:()=>{this.props.navigator.pop()}}
              ]
            )
        }
        else{
            this._submitCaseInfo();
        }
    }
    render(){
        return(
            <View>
                <Image
                    source={require('../../images/load/background.png')}
                    style={styles.allPage}
                >
                    <View style={styles.caseViewLine}>
                        <View style={{flex:1}}>
                            <Text style={[styles.textBold,{color:'#f08300'}]}>主诉:</Text>
                        </View>
                        <View style={styles.addCaseInput}>
                            <TextInput
                                ref='check'
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                textAlignVertical={'center'}
                                //underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                var data = this.state.case;
                                data['check']= text;
                                this.setState({case: data})}}
                            />
                        </View>
                    </View>

                    <View style={styles.nessDescription}>
                        <View style={{
                            height:36,
                            justifyContent:'center',
                            }}>
                            <Text style={styles.caseText}>病情详述:</Text>
                        </View>
                        <View style={{flex:1, height:300, width:330}}>
                            <TextInput
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['details']= text;
                                    this.setState({case: data})}
                                }
                                selectionColor='#FF7F00'
                                textAlignVertical={'center'}
                                multiline={true}
                                numberOfLines={3}
                                style={[styles.caseText,{
                                fontSize:14,
                                height:100,
                                width:330,
                                backgroundColor:'rgba(255,255,255,0.5)',
                                borderRadius:10
                                }]}

                            />
                           
                        </View>
                    </View>

                    <View style={{marginTop:10,marginBottom:5}}>
                        <Text style={[styles.textBold,{color:'#f08300'}]}>暖心诊治:</Text>
                    </View>

                    <View style={[styles.nessDescription,{
                        height:280,
                        marginTop:0,
                        }]}>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={styles.writeText}>病情概要:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['description']= text;
                                    this.setState({case: data})}}
                                />
                            </View>
                        </View>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={styles.writeText}>曾服药物:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['medicine']= text;
                                    this.setState({case: data})}}
                                />

                            </View>
                        </View>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={styles.writeText}>诊       断:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['diagnose']= text;
                                    this.setState({case: data})}}
                                />

                            </View>
                        </View>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={styles.writeText}>处       方:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                var data = this.state.case;
                                data['prescription']= text;
                                this.setState({case: data})}}
                                />

                            </View>
                        </View>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <Text style={styles.writeText}>治疗进展:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['progress']= text;
                                    this.setState({case: data})}}
                                />

                            </View>
                        </View>
                        <View style={styles.caseViewLine}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={styles.writeText}>治疗心得:</Text>
                            </View>
                            <View style={styles.addCaseInput}>
                                <TextInput
                                style={{flex:1}}
                                selectionColor='#FF7F00'
                                onChangeText={(text) => {
                                    var data = this.state.case;
                                    data['summary']= text;
                                    this.setState({case: data})}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity
                        onPress={() => {this._onPressSubmit()}}
                        style={styles.caseBtn}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={styles.caseText}>提交</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress= {() => {this.props.navigator.pop()}}
                        style={[styles.caseBtn,{
                            marginRight:0,
                            backgroundColor:'#DDDDDD',
                        }]}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={[styles.caseText,{color:'#666666'}]}>取消</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
}

export default CaseView;
