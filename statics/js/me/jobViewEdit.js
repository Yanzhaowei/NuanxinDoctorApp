'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;

class JobViewEdit extends Component {
    constructor(props) {
      super(props);
      //定义一个时间数组
      var tableArray = new Array();
      for(var i = 0 ; i < 7 ;i++) {
        tableArray[i] = new Array();
        for(var j = 0; j < 3 ; j++) {
          var val = 0;
          if (j == 0) {
            val = 1;
          }else if(j == 1) {
            val = 2;
          }else {
            val = 4;
          }
          tableArray[i][j] = {check: false,value: val}
        }
      }
      this.state={
          tableState:tableArray,
      }
    }

    //点击事件
    _onPressTable(row,column) {
      var data = this.state.tableState;
      data[column][row]['check'] = !data[column][row]['check'];
      this.setState({
        tableState: data,
      })
      console.log();
      this.props.setworktime(this._getDoctorSchedule())
    }

   _renderTable() {
     return(
       <View style={{marginTop: 10, marginBottom: 10,}}>
         <View style={{marginLeft: 10, marginBottom: 10,}}>
           <Text style={{color: 'black',}}>请选择出诊时间</Text>
         </View>
         <View style={styles.tabRow}>
           <View style={styles.table}></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周一</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周二</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周三</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周四</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周五</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周六</Text></View>
           <View style={[styles.table,{borderLeftWidth: 0}]}><Text>周日</Text></View>
         </View>
         <View style={styles.tabRow}>
           {this._renderTableRow(0)}
         </View>
         <View style={styles.tabRow}>
           {this._renderTableRow(1)}
         </View>
         <View style={styles.tabRow}>
           {this._renderTableRow(2)}
         </View>
       </View>
     )
    }

    _getDoctorSchedule() {
      var data = this.state.tableState;
      var schedule = '';
      for(var i = 0; i < 7 ; i++) {
        var temp = 0;
        for(var j = 0; j < 3; j++) {
          temp += (data[i][j].check ? data[i][j].value : 0);
        }
        schedule += temp;
      }
      return schedule;
    }

    _renderTableRow(row) {
      var time = '';
      if(row == 0) {
        time = '上午';
      }else if (row == 1) {
        time = '下午';
      }else if(row == 2) {
        time = '晚上';
      }

      var rowsData = [];
      var tableArray = [0,1,2,3,4,5,6,7];
      tableArray.map((value) => {
        var data = null;
        if(value == 0) {
          data = (
            <View
              style={[styles.table,{borderTopWidth: 0}]}
              key={'table'+row+value}
            >
              <Text>
                {time}
              </Text>
            </View>
          )
        }else {
          var num = value - 1;
          data = (
            <TouchableOpacity
              key={'table'+row+value}
              onPress={() => this._onPressTable(row,value-1)}
              style={[styles.table,{
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  backgroundColor: this.state.tableState[num][row]['check']? 'orange' : 'transparent'}]}
            >
            </TouchableOpacity>
          )
        }
        rowsData.push(data);
      })
      return rowsData;
    }

  render() {
    return (
        <View style={{backgroundColor:'#fff'}}>
        {this._renderTable()}
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    tabRow: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 5,
      marginRight: 5,
    },
    table: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      borderWidth: 1,
      borderColor: '#E6E6E6'
    },
});
export default JobViewEdit;