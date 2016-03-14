'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} = React;

const icon_name=[
'病人','日程','发布','患教','我的'
];
const icon_selected=[
require('../images/tabbar_icons/person.png'),
require('../images/tabbar_icons/cal.png'),
require('../images/tabbar_icons/editor.png'),
require('../images/tabbar_icons/patient.png'),
require('../images/tabbar_icons/myself.png'),
];
const icon_unselecte=[
require('../images/tabbar_icons/normal_person.png'),
require('../images/tabbar_icons/normal_cal.png'),
require('../images/tabbar_icons/normal_editor.png'),
require('../images/tabbar_icons/normal_patient.png'),
require('../images/tabbar_icons/normal_myself.png'),
];

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  tabs: {
    flexDirection: 'row',
    marginTop:15,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
   // borderBottomColor: '#ccc',
  },
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor : React.PropTypes.string,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var activeTextColor = this.props.activeTextColor || "#F08300";
    var inactiveTextColor = this.props.inactiveTextColor || "black";
    var pageImage=isTabActive?icon_selected[page]:icon_unselecte[page];
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View style={{alignItems:'center',justifyContent:'center',}}>
        <Image source={pageImage} style={{marginBottom:5}}/>
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal',fontSize:11,}}>{icon_name[page]}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: this.props.underlineColor || "navy",
      bottom: 0,
    };

    return (
      <View style={{justifyContent:'center',height:44,  flexDirection: 'column',}}>
      <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
      </View>
    );
  },
});

export default DefaultTabBar;
