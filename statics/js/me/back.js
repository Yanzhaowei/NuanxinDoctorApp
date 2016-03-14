'use strict';

import React, {
  Component,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import styles from './styles';

class BackTitle extends Component {
    constructor(props){
        super(props);
    }
    _onPressAddCase(){
        this.props.navigator.push({
            name:'addCase'
        })
    }
    addBtn(){
        if(this.props.addBtn){
            return(
                <TouchableOpacity
                onPress= {() => {this._onPressAddCase()}}>
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
            {this.addBtn()}
        </View>
      );
  }
}
export default BackTitle;
