'use strict'

import React,{
  View,
  Image,
  Text,
  Component,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Index from "../patient/Index"

class DoctorMainScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Index mainNavigator={this.props.navigator} doctorId={this.props.doctorId} />
    )
  }
}

export default DoctorMainScreen;
