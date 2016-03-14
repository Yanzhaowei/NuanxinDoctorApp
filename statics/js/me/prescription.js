'use strict';
import styles from './styles';
import DrugList from './drugList';
import BackTitle from './back';

import React, {
  Component,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

var WINDOW_HEIGHT = Dimensions.get('window').height;

class Prescription extends Component {
  render() {
    return (
        <View>
            <BackTitle title={'我的处方'} navigator = {this.props.navigator} />
            <ScrollView style={{height:WINDOW_HEIGHT-70}}>
                <DrugList doctorId={this.props.doctorId} navigator={this.props.navigator}/>
            </ScrollView>
        </View>

      );
  }
}
export default Prescription;
