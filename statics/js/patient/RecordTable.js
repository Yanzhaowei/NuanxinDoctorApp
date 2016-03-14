'use strict'

import React, {
  Alert,
  Component,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const DAYDIFF=86400000;

class RecordTable extends Component {
  constructor(props) {
    super(props);
  }
  takePhoto() {

  }
  // modifyPrescription(pres) {
  //   this.props.navigator.push({name: 'modifyPrescriptionPage', passProps: {
  //     date:this.props.recordData.date, modifyData: this.props.modifyData, prescriptionData: pres}})
  // }
  // deleteRecord(case_id) {
  //   this.props.deleteData(this.props.recordData.date, medcine);
  //   Alert.alert('', 'case_id:'+case_id);
  // }
  getPeriod(ctime,begin,days) {
    // Alert.alert('', 'ctime'+ctime+' begin:'+begin+' days:'+days);
    let tmp=ctime.split('-');
    let newDate=new Date(tmp[0],tmp[1]-1,tmp[2]);
    let beginDate=new Date(newDate.getTime()+ begin*DAYDIFF);
    let endDate=new Date(newDate.getTime()+(begin+days)*DAYDIFF);
    return '  '+(beginDate.getMonth()+1)+'月'+beginDate.getDate()+'日～'+(endDate.getMonth()+1)+'月'+endDate.getDate()+'日';
  }
  getAmount(dosage, unit) {
    // Alert.alert('', ''+dosage);
    let tmp=dosage.split('d');
    let time=['上午:','中午:','下午:','晚上:'];
    let strs=[];
    for (var i=0;i<4;++i) {
      if (tmp[i]) {
        strs.push(time[i]+tmp[i]+' '+unit);
      }
    }
    return '  '+strs.join(',');
  }
  render() {
    let deleteButton = (this.props.doctorId == this.props.recordData.doctor_id) ?
      <TouchableHighlight
        underlayColor='rgba(34,26,38,0.1)'
        onPress={()=>this.props.deleteRecord(this.props.recordData.case_id)}
        style={[styles.buttonStyle,{marginTop: 11}]}
      >
        <Text style={styles.buttonText}>删除病例</Text>
      </TouchableHighlight>
    : <View></View>
    return (
      <View style = {this.props.style}>
        <View style = {styles.header}>
          <Text style = {styles.headerText}>{this.props.recordData.ctime} {this.props.recordData.hospital}</Text>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>医生</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{this.props.recordData.doctor_name}</Text>
          </View>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>科室</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{this.props.recordData.department}</Text>
          </View>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>诊断</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{this.props.recordData.diagnose.join('、')}</Text>
          </View>
        </View>
        {/*<View style = {[styles.tableRow, {height: 80}]}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>病例</Text>
          </View>
          <View style = {styles.rowContent}>
            <TouchableHighlight
              underlayColor='rgba(34,26,38,0.1)'
              onPress={()=>this.takePhoto()}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>拍照上传</Text>
            </TouchableHighlight>
          </View>
        </View>*/}
        <View style = {styles.prescriptionRow}>
          <View style = {[styles.rowHeader, {alignSelf: 'center'}]}>
            <Text style = {styles.rowHeaderText}>药物处方</Text>
            {deleteButton}
          </View>
          <View style = {styles.prescriptionRowContent}>
            <View style = {{padding:11}}>
              {
                this.props.recordData.methods.map((pres, index)=>(
                  <View key = {index}>
                    <Text style = {styles.rowContentText}>{pres.name}</Text>
                    <Text style = {styles.rowContentText}>{this.getPeriod(this.props.recordData.ctime,pres.begin,pres.days)}</Text>
                    <Text style = {styles.rowContentText}>{this.getAmount(pres.dosage,pres.unit)}</Text>
                    {/*<View style = {styles.buttonRow}>
                        <TouchableHighlight
                          underlayColor='rgba(34,26,38,0.1)'
                          onPress={(p)=>this.modifyPrescription(pres)}
                          style={styles.buttonRowStyle}
                        >
                          <Text style={styles.buttonRowText}>修改</Text>
                        </TouchableHighlight>
                          <TouchableHighlight
                            underlayColor='rgba(34,26,38,0.1)'
                            onPress={(medcine)=>this.deletePrescription(pres.medcine)}
                            style={styles.buttonRowStyle}
                          >
                            <Text style={styles.buttonRowText}>删除</Text>
                          </TouchableHighlight>
                    </View>*/}
                  </View>
                ))
              }
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'PingFang-SC-Regular',
    fontWeight: '100',
    color: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
  },
  rowHeader: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowHeaderText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 16,
    fontWeight: '100',
    color: '#FFFFFF',
  },
  rowContent: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#AAAAAA',
  },
  rowContentText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 16,
    fontWeight: '100',
    color: '#FFFFFF',
  },
  prescriptionRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  prescriptionRowContent: {
      flex: 3,
      borderLeftWidth: 1,
      borderLeftColor: '#AAAAAA',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEA501',
    height: 30,
    width: 70,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 10,
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonRowStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 50,
    borderColor: '#FEA501',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  buttonRowText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 10,
    color: '#FEA501',
  },
});

export default RecordTable;