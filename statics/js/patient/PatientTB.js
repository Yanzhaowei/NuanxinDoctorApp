'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} = React;


var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:30,
   
  },

  tabs: {
     flexDirection: 'row',
     justifyContent:'center',
     marginTop:12,
     height:30,
     backgroundColor:'#F4F1F5',
     width:Dimensions.get('window').width-150,
     borderWidth:1,
     borderColor:'#FE9300', 
     alignItems:'center',
     alignSelf:'center',
  },
});

var PatientTB = React.createClass({
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
    var activeTextColor = this.props.activeTextColor || "white";
    var inactiveTextColor = this.props.inactiveTextColor || "#FE9300";
    var isBorder= page === 1;
    return (
      <TouchableOpacity style={[styles.tab,{backgroundColor:isTabActive?'#FE9300':'rgba(0,0,0,0)',borderColor:'#FE9300',borderLeftWidth:isBorder?1:0,borderRightWidth:isBorder?1:0}]} key={name} onPress={() => this.props.goToPage(page)}>
       
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        
      </TouchableOpacity>
    );
  },

  render() {
    return (
      <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        
      </View>
    );
  },
});

module.exports = PatientTB;
