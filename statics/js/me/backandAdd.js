'use strict';

import React, {
  Component,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import styles from './styles'

class BackTitle extends Component {
    constructor(props){
        super(props);
    }
    addBtn(){
        if(this.props.addBtn){
            return(
                <TouchableOpacity
                onPress= {() => {this.props.navigator.pop()}}>
                    <Image style={styles.headImg}
                    source = {require('../../images/icon/add.png')} />
                </TouchableOpacity>
            )
        }

    }
  render() {
    return (
        <View style={styles.headNav}>
            <TouchableOpacity
                style={styles.back}
                onPress= {() => {this.props.navigator.pop()}}>
                <Image style={styles.headImg}
                    source = {require('../../images/me/back.png')} />
            </TouchableOpacity>
            <View style={styles.headMenu}>
                <Text style={styles.textBold}>{this.props.title}</Text>
            </View>
        </View>
      );
  }
}
export default BackTitle;
