'use strict';

import React, {
  Alert,
	View,
	Text,
	TouchableOpacity,
  	Component,
	Dimensions
} from 'react-native';
import Picker from 'react-native-picker';

function createDateData(){
	let date = {};
	for(let i=1950;i<2050;i++){
		let month = {};
		for(let j = 1;j<13;j++){
			let day = [];
			if(j === 2){
        if (i % 4 === 0 && i %100 !== 0 | i % 400 === 0) {
          for(let k=1;k<30;k++){
  					day.push(k+'日');
  				}
        } else {
          for(let k=1;k<29;k++){
  					day.push(k+'日');
  				}
        }
			}
			else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
				for(let k=1;k<32;k++){
					day.push(k+'日');
				}
			}
			else{
				for(let k=1;k<31;k++){
					day.push(k+'日');
				}
			}
			month[j+'月'] = day;
		}
		date[i+'年'] = month;
	}
	return date;
};

class datePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear() + '年',
      month: new Date().getMonth() + 1 + '月',
      date: new Date().getDate() + '日',
    }

  }

dataBack(){
	return [year,month,date];
};

pickerDone(pickedValue){
	this.setState({year: pickedValue[0], month: pickedValue[1], date: pickedValue[2]});
	this.props.data['startTime']=(new Date(parseInt(pickedValue[0]),parseInt(pickedValue[1]),parseInt(pickedValue[2]),0,0,0)).toLocaleDateString();
	this.props.changeColor();
};
  componentDidMount() {
    //this.picker.show();
  }
	render(){
		return (
				<Picker
          					ref={picker => this.picker = picker}
					style={{height: 320,}}
					showDuration={300}
					 pickerBtnText={'提交'}
                      				pickerCancelBtnText={'取消'}
					pickerData={createDateData()}
					selectedValue={[this.state.year, this.state.month, this.state.date]}
					onPickerDone={(pickedValue) => this.pickerDone(pickedValue)}
				/>
		);
	}
};

export default datePicker;
