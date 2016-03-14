'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-root-modal';

var {WINDOW_HEIGHT,WINDOW_WIDTH} = Dimensions.get('window');

class MyModal extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            visible: false,
        };
    }
    _onPressBtn(conpnt) {
        let name;
        switch (conpnt) {
            case 'webpage':
                name='webMainPage';
                break;
            case 'prescription':
                name='prescription';
                break;
            case 'caseHistory':
                name='caseHistory';
                break;
        }
        this.props.navigator.push({
            name:name,
        })
    };
  render() {
    return (
        <View>
        {/*button*/}
            <TouchableOpacity
                style={[styles.doctorMessage,{marginTop:10}]}
                onPress={()=>this.props.showModal('ShowCode')}>
                <View style={styles.myqrcode}>
                    <Image
                        style={styles.avatarImg}
                        source = {require('../../images/me/myqrcode.png')}>
                    </Image>
                    <Text>我的二维码</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.doctorMessage}
                onPress={()=>this.props.showModal('ShowJobview')}>
                <View style={styles.myqrcode}>
                    <Image
                        style={styles.avatarImg}
                        source = {require('../../images/me/worktime.png')}>
                    </Image>
                    <Text>出诊安排</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.doctorMessage}
                onPress={()=>{return this._onPressBtn('webpage')}}>
                <View style={styles.myqrcode}>
                    <Image
                        style={styles.avatarImg}
                        source = {require('../../images/me/homepage.png')}>
                    </Image>
                    <Text>我的个人主页</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.doctorMessage}
                onPress={()=>{return this._onPressBtn('prescription')}}>
                <View style={styles.myqrcode}>
                    <Image
                        style={styles.avatarImg}
                        source = {require('../../images/me/prescription.png')}>
                    </Image>
                    <Text>我的处方</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.doctorMessage}
              onPress={()=>{return this._onPressBtn('caseHistory')}}>
              <View style={styles.myqrcode}>
                  <Image
                      style={styles.avatarImg}
                      source = {require('../../images/me/case.png')}>
                  </Image>
                <Text>经典病例</Text>
              </View>
            </TouchableOpacity>
        </View>

      );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginTop:10,
        alignItems: 'center',
    },
    button: {
        flex: 0.3,
        borderRadius:5,
        backgroundColor:'#63B8FF',
        marginTop:30,
        height:35,
        marginLeft:20,
        marginRight:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doctorMessage: {
        flexDirection:'row',
        backgroundColor:'#fff',
        height:45,
        borderBottomWidth:1,
        borderBottomColor:'#E6E6E6',
        paddingBottom:10,
        paddingTop:10,
        alignItems:'stretch',
        paddingLeft:10,
    },
    messageImg: {
        alignItems:'stretch',
        marginRight:10,
    },
    myqrcode: {
        flexDirection:'row',
        alignItems:'center',
    },
    codeIcon: {
        width:100,
        height:100,
    },
    avatarImg: {
        alignItems:'stretch',
        marginRight:10,
    },
    modal: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        overflow: 'hidden'
    },
    codeTitle: {
        left:10,
        top:20,
        flexDirection:'row',
        marginBottom:20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width:WINDOW_WIDTH * 0.7,
        alignItems: 'center',
        height:WINDOW_HEIGHT * 0.6,
    },
    text: {
        color: '#fff'
    }
});
export default MyModal;
