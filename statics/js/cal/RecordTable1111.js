'use strict'

import React, {
  Alert,
  Component,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  // deletePrescription(medcine) {
  //   this.props.deleteData(this.props.recordData.date, medcine);
  // }
  render() {
    Alert.alert('',JSON.stringify(this.props.recordData));
    return (
      <View style = {this.props.style}>
        {/*<View style = {styles.header}>
          <Text style = {styles.headerText}>{this.props.recordData.date} {this.props.recordData.hospital}</Text>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>医生</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{this.props.recordData.doctor}</Text>
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
            <Text style = {styles.rowContentText}>{this.props.recordData.diagnosis}</Text>
          </View>
        </View>
        <View style = {[styles.tableRow, {height: 80}]}>
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
        </View>
        <View style = {styles.prescriptionRow}>
          <View style = {[styles.rowHeader, {alignSelf: 'center'}]}>
            <Text style = {styles.rowHeaderText}>药物处方</Text>
          </View>
          <View style = {styles.prescriptionRowContent}>
            <View style = {{padding:11}}>
              {
                this.props.recordData.prescription.map((pres)=>(
                  <View key = {pres.medcine}>
                    <Text style = {styles.rowContentText}>{pres.medcine}</Text>
                    <Text style = {styles.rowContentText}>{pres.period}</Text>
                    <Text style = {styles.rowContentText}>{pres.amount}</Text>
                    <View style = {styles.buttonRow}>
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
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        </View>*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'PingFang-SC-Regular',
    fontWeight: '100',
    color: '#333333',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 40,
    marginBottom: 1,
  },
  rowHeader: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#F0F0F0',
  },
  prescriptionRow: {
    flexDirection: 'row',
    marginBottom: 1,
    backgroundColor: '#FFFFFF',
  },
  prescriptionRowContent: {
      flex: 3,
      backgroundColor: '#FFFFFF',
      borderLeftWidth: 1,
      borderLeftColor: '#F0F0F0',
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