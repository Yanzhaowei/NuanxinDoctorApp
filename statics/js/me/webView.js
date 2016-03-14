'use strict';

import styles from './styles';
import BackTitle from './back';

import React, {
    Component,
    TouchableOpacity,
    Image,
    WebView,
    Text,
    View,

} from 'react-native';


class WebMainPage extends Component{
    render(){
        var URL=Homepage_URL+this.props.doctorId
        return(
            <View style={{flex:1}}>
                <BackTitle
                    navigator={this.props.navigator}
                    title={'我的主页'}>
                </BackTitle>
                <WebView
                    source={{uri:URL}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaSvriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
}

export default WebMainPage;
