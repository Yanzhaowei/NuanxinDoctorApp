'use strict'

import React, {
  Alert,
  Component,
  ListView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged:(row1, row2)=>row1 !== row2,
    });
  }

  showNewsDetails(newsData) {
    this.props.navigator.push({name: 'newsDetails', passProps: newsData});
  }

  renderRow(
    newsData: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <TouchableHighlight underlayColor='rgba(34,26,38,0.1)' onPress={()=>this.showNewsDetails(newsData)}>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{newsData.subject}</Text>
          <Text style={styles.itemText}>{newsData.date}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  renderScrollComponent(){
      return <ScrollView></ScrollView>
  };
  render() {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.newsSet)}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={true}
        renderScrollComponent={()=>{return this.renderScrollComponent()}}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(118,104,103,0.6)',
  },
  itemText: {
    fontFamily: 'PingFang-SC-Regular',
		fontSize: 14,
    lineHeight: 20,
		fontWeight: '100',
		color: '#333333',
  },
});

export default NewsList;
