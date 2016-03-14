'use strict';

import React, {
  Alert,
	View,
  ScrollView,
	Text,
	TouchableOpacity,
  TouchableHighlight,
  Component,
	Dimensions,
  StyleSheet,
} from 'react-native';
import Picker from 'react-native-picker';

let recordData = {
  date: '16年1月21日',
  hospital: '首都医科大学宣武医院',
  doctor: '李宁',
  department: '神经内科',
  diagnosis: '癫痫',
  prescription: [
    {medcine: '可元', period: '1月21日~1月21日', amount: '中午： 0.5粒'},
    {medcine: 'a', period: '1月21日~1月21日', amount: '中午： 0.5粒'},
    {medcine: 'b', period: '1月21日~1月21日', amount: '中午： 0.5粒'},
    {medcine: 'c', period: '1月21日~1月21日', amount: '中午： 0.5粒'},
    {medcine: 'd', period: '1月21日~1月21日', amount: '中午： 0.5粒'},
  ]
}

class ComponentTest extends Component {
  constructor(props) {
    super(props);

  }
  takePhoto() {

  }
  addRecord() {

  }
	render(){
		return (
      <ScrollView style = {styles.container}>
        <TouchableHighlight
          underlayColor='rgba(34,26,38,0.1)'
          onPress={()=>this.addRecord()}
          style={styles.buttonNewStyle}
        >
          <Text style={styles.buttonNewText}>+添加病例</Text>
        </TouchableHighlight>
        <View style = {styles.header}>
          <Text style = {styles.headerText}>{recordData.date} {recordData.hospital}</Text>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>医生</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{recordData.doctor}</Text>
          </View>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>科室</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{recordData.department}</Text>
          </View>
        </View>
        <View style = {styles.tableRow}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>诊断</Text>
          </View>
          <View style = {styles.rowContent}>
            <Text style = {styles.rowContentText}>{recordData.diagnosis}</Text>
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
        <View style = {[styles.tableRow, {height: 180}]}>
          <View style = {styles.rowHeader}>
            <Text style = {styles.rowHeaderText}>药物处方</Text>
          </View>
          <View style = {styles.prescriptionRowContent}>
            <ScrollView style = {{padding:11}}>
              {
                recordData.prescription.map((pres)=>(
                  <View key = {pres.medcine}>
                    <Text style = {styles.rowContentText}>{pres.medcine}</Text>
                    <Text style = {styles.rowContentText}>{pres.period}</Text>
                    <Text style = {styles.rowContentText}>{pres.amount}</Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>

      </ScrollView>
		);
	}
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 40,
    backgroundColor: '#F0F0F0',
    padding: 11,
  },
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
    height: 40,
    marginBottom: 1,
  },
  rowHeader: {
    flex:1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  rowContent: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prescriptionRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  prescriptionRowContent: {
      flex: 3,
      backgroundColor: '#FFFFFF',
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
  buttonNewStyle: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FEA501',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 11,
  },
  buttonNewText: {
    fontFamily: 'PingFang-SC-Regular',
    fontSize: 14,
    color: '#FEA501',
  },
})
export default ComponentTest;
