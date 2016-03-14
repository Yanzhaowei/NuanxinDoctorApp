'use strict';
/*my own module*/
import DoctorInfo from './doctorInfo';
import DoctorMsgEdit from './doctorMsgEdit';
import styles from './styles';

import React, {
        Component,
        View,
} from 'react-native';


class DoctorMainMessage extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            editShow:false
        };
    }
  render() {
          return(
             <View style={styles.body}>
                 <DoctorInfo
                     navigator={this.props.navigator}
                     changeEditShow = {() => {this.changeEditShow()}}
                     doctorId={this.props.doctorId}
                 />
            </View>
          );
  }
}

export default DoctorMainMessage;
