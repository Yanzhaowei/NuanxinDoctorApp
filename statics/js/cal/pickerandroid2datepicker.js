'use strict';

import React, {
    StyleSheet,
    View,
    Text,
    Platform,
    PickerIOS
} from 'react-native';

import PickerAndroid from 'react-native-picker-android';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

let YEAR_LIST = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
let MONTH_LIST = [1,2,3,4,5,6,7,8,9,10,11,12];
let DATE_LIST = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
export default class SomeScene extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
        }
    }

    render() {
        return (
            <View style = {styles.datePicker}>
                <Picker
                    selectedValue={this.state.year}
                    onValueChange={(year) => this.setState({year})}>
                    {YEAR_LIST.map((carMake) => (
                        <PickerItem
                            key={carMake}
                            value={carMake}
                            label={carMake}
                        />
                    ))}
                </Picker>
                <Picker
                    selectedValue={this.state.month}
                    onValueChange={(month) => this.setState({month})}>
                    {MONTH_LIST.map((carMake) => (
                        <PickerItem
                            key={carMake}
                            value={carMake}
                            label={carMake}
                        />
                    ))}
                </Picker>
                <Picker
                    selectedValue={this.state.date}
                    onValueChange={(date) => this.setState({date})}>
                    {DATE_LIST.map((carMake) => (
                        <PickerItem
                            key={carMake}
                            value={carMake}
                            label={carMake}
                        />
                    ))}
                </Picker>

            </View>
        );
    }
};

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
  },
});