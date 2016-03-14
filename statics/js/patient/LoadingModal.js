'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
                
import Modal from 'react-native-root-modal';
import Loading from './Loading';

class LoadingModal extends Component{
  constructor(props){
    super(props);  
    this.state={
      Lvisible:false,
    };
  };

closeModal(){
    this.setState({Lvisible:false});
}

tiggleModel(status){
   this.setState({Lvisible:status});
};

  render(){
      return  (
            <Modal visible={this.state.Lvisible}  
                      style={{height:Dimensions.get('window').height,
                                  width:Dimensions.get('window').width,top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                                 <Loading />
                </Modal>
        );
  };
};


const styles = StyleSheet.create({
  modalStyle:{
      top:(Dimensions.get('window').height-200)/2,
      left:(Dimensions.get('window').width-200)/2,
      height:200,
      width:200,
      borderWidth:1,
      borderColor:'#ffffff',
      borderRadius:20,
      backgroundColor: '#ffffff',
  },

  
});


export default LoadingModal;
