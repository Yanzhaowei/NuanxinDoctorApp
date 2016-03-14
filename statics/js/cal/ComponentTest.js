'use strict'

import React, {
  Alert,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid,
} from 'react-native';
import Modal from 'react-native-root-modal';
class NAME extends Component {
  constructor(){
    super();
    this.state={
        isLoad:true,
    };
};

  render() {
    return (
      <View style={{backgroundColor:'#aaaaaa', shadowColor:'#FF0000', width: 800,  height: 1000,}}>
        <Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
          <Text > 是是是是是是是是是{'\n'}水水水水谁谁谁水水水水谁谁谁事实上事实上</Text>
        </Text>
        <Modal visible={true}
            style={styles.infoModal}>
            <View style={styles.container}>
              <ProgressBarAndroid />
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModal: {

  },
});

export default NAME;
