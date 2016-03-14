'use strict';

import React, {
    StyleSheet,
    Dimensions,
} from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    body: {
        backgroundColor:'#E6E6E6',
        height:WINDOW_HEIGHT,
    },
    allPage:{
        height:WINDOW_HEIGHT,
        width:WINDOW_WIDTH,
        paddingLeft:7,
        paddingRight:7,
    },
    //下拉高度设置
    ScrollViewBody: {
        height:WINDOW_HEIGHT - 45,
    },
    //行居中
    lineCenter: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
    },
    textBold: {
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
        backgroundColor:'transparent',
    },
    //DoctorInfo
    headNav: {
        height:45,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#878181',
    },
    headImg: {
        marginLeft:10,
        right:10,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    picture: {
        width:WINDOW_WIDTH,
        height:WINDOW_HEIGHT * 0.3,
    },
    avatarMSG: {
        flexDirection:'column',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {//头像和认证所在view
        flexDirection:'column',
        alignItems: 'center',
        height:WINDOW_HEIGHT*0.15,
        flexWrap:'nowrap',
        marginBottom:10,
    },
    attestation: {
        borderRadius:5,
        backgroundColor:'blue'
    },
    avatarImg: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:3,
        width:WINDOW_HEIGHT * 0.15, //长为背景图高度的一半的正方形头像
        height:WINDOW_HEIGHT * 0.15,
        borderColor:'#BFBFBF',
        borderRadius:WINDOW_HEIGHT * 0.075,//半径为正方形的边长的一半
    },
    infoModal: {
        height:WINDOW_HEIGHT,
        width:WINDOW_WIDTH,
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    touchExit: {
        height:WINDOW_HEIGHT,
        width:WINDOW_WIDTH,
    },
    //
    imageText: {
        marginTop:-11,
        backgroundColor:'#EF8200',
        borderRadius:8,
    },
    memo: {
        padding:20,
        paddingTop:0,
        alignItems: 'center',
        backgroundColor:'#fff',
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
    },
    messageImg: {
        alignItems:'stretch',
        marginRight:10,
    },
    messageLable: {
        flexDirection:'row',
        alignItems: 'center',
        borderRightWidth:2,
        borderColor:'#E6E6E6',
        flex:0.5,
        paddingLeft:10,
    },
    //DoctorMsgEdit
    headMenu: {
        flex:3,
    },
    back: {
        flex:2,
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'flex-start',
    },

    psnInfo: {
        marginTop:20,
        borderBottomWidth:2,
        borderColor:'#d9d8db',
        borderTopWidth:2,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff',
    },
    psnInfoLine: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#d9d8db',
        borderBottomWidth:1,
        height:40,
    },
    psnInfoLineKey: {
        flex:0.2,
    },
    psnInfoLineValue: {
        flex:0.8,
    },
    textStyle: {
        color:'rgba(124,124,124,0.7)',
        fontSize:17,
    },
    // jobView
        tablebody: {
            backgroundColor:'#fff',
            top:WINDOW_HEIGHT*0.5,
            padding:10,
        },
        container: {
          flexDirection:'row',
          alignItems: 'center',
        },
        table: {
          borderLeftWidth:1,
          alignItems: 'center',
          borderTopWidth:1,
          justifyContent: 'center',
          borderColor:'#A7A7A7',
          height:25,
          flex:0.1,
        },
    //Prescription
    drugTouch: {
        paddingLeft:10,
        paddingRight:10,
    },
    drugLogo: {
        marginRight:10,
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:'#53AD55',
        alignItems:'center',
        justifyContent:'center'
    },
    drugLine: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:5,
        paddingBottom:5,
        borderBottomWidth:1,
        borderColor:'#EEEEEE',
    },
    //caseHistory
    nocase: {
        marginTop:100,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

    },
    caseHistoryTitle: {
        color:'#F08300',
        fontSize:16
    },
    caseLine: {
        paddingTop:3,
    },
    caseLineTitle: {
        color:'#F08300',
        fontSize:14
    },
    //caseView
    addCaseInput: {
        backgroundColor:'rgba(255,255,255,0.8)',
        height:34,
        borderRadius:10,
        flex:4,
        justifyContent:'center',
    },
    nessDescription: {
        height:140,
        marginTop:10,
        backgroundColor:'rgba(255,255,255,0.2)',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
    },
    caseText:{
        color:'#FFF',
        fontSize:16,
    },
    caseViewLine: {
        height:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    writeText: {
        color:'rgba(255,255,255,0.8)',
        fontSize:13,
    },
    caaseBtnLine: {
        flexDirection:'row',
        padding:10,
        paddingTop:0,
        
    },
    caseBtn: {
        backgroundColor:'#f08300',
        marginTop:10,
        height:40,
        borderRadius:10,
        alignSelf:'center',
        flex:0.5,
        marginRight:10
    }
});

export default styles;