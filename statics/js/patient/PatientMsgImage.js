'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Navigator,
  Dimensions,
} from 'react-native';

const DAYDIFF=86400000;
import Loading  from './Loading';
import LoadingModal from './LoadingModal';
import Modal from 'react-native-root-modal';

class PatientMsgImageMonth extends Component{
	constructor(props){
	    super(props);  
	    var table=this.createTables();
	    this.state={
	    	isLoad:false,
	    	datas:{},
	    	Lvisible:false,
	    	tables:table,
	    	patientData:this.props.patientData,
	    	dates:new Date(),
	    }
	};
	postData(){
		this.setState({isLoad:false});
		fetch(PatRecords_URL,{
		            method: 'post',
		            headers: {
		              'Accept': 'application/json',
		              'Content-Type': 'application/json',
		            },
		            body: JSON.stringify({
		              patient_id:this.props.patientData.id,
		            })
		      })
		      .then((response) => {
		           return response.json();
		      })
		      .then((responseData)=>{
		        this.setState({datas:responseData,isLoad:true});
		        this.changeSetTables();
		      })
		      .catch((err)=>{
		          console.log(err.toString());
		      })
		      .done();
	};
	componentDidMount(){
		this.postData();
	}
	filterDatas(){
		let result={};
		for (let key in this.state.datas){
			if (key != 'status') {
				let tempList=this.state.datas[key].filter((value)=>{
					let date=new Date(value['ctime']);
					return this.state.dates.getMonth() == date.getMonth() && this.state.dates.getFullYear() == date.getFullYear();
				});
				result[key]=tempList;
			}
		}
		//console.log(result);
		return result;
	}
	changeSetTables(){
		let filData=this.filterDatas();
		this.ClearTables();
		for (let key in filData){
			let index;
			switch(key){
				case 'cases':
				index=0;
				break;
				case 'followUps':
				index=1;
				break;
				case 'tests':
				index=2;
				break;
			}
			for (let data of filData[key]){
				let date=new Date(data['ctime']);
				let nums=date.getDate()-1;
				let indexnum=parseInt(nums/2);
				this.state.tables[index][indexnum][nums%2] = data;
			}
		};
		
		this.setState({tables:this.state.tables});
	}
	createTables(){
		let table=[];
		for (let i = 0; i < 4; i++) {
			table.push([]);
			for (let j = 0; j < 16; j++) {
				table[i].push(['','']);
			};
		};
		return table;
	};
	ClearTables(){
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 16; j++) {
				this.state.tables[i][j]=['',''];
			};
		};

	};
	getMsg(data,type){
		 this.refs['loadModal'].tiggleModel(true);
		let id;
		switch(type){
			case 0:
			id=data.case_id;
			break;
			case 1:
			id=data.follow_id;
			break;
			case 2:
			id=data.record_id;
			break;
		};
		fetch(PatRecordsDetails_URL,{
		            method: 'post',
		            headers: {
		              'Accept': 'application/json',
		              'Content-Type': 'application/json',
		            },
		            body: JSON.stringify({
		              patient_id:this.props.patientData.id,
		              id:id,
		              record_type:type,
		            })
		      })
		      .then((response) => {
		           return response.json();
		      })
		      .then((responseData)=>{
		        console.log(responseData);
		        this.refs['loadModal'].tiggleModel(false);
		        this.setState({Lvisible:true});
		      })
		      .catch((err)=>{
		          console.log(err.toString());
		          this.refs['loadModal'].tiggleModel(false);
		      })
		      .done();

	};
	closeModal(){
		  this.setState({Lvisible:false});
		  Alert.alert(this.state.Lvisible+'');
	}
	createViewByTb(){
		let columnView=[];
		let rowView=[];
		let viewColors=['#63B13C','#FDB611','#F2711A','#E4141C'];
		if (this.state.isLoad == false) {
			columnView=(<Loading />);
		}
		else{
			
			for (let i = 0; i < this.state.tables.length; i++) {
				rowView.push([]);
				columnView.push(
					<View key={i} style={styles.trView}> 
						{rowView[i]}
					</View>
				);
				for (let j = 0; j < this.state.tables[i].length; j++) {
					let contentSon=['',''];
					let content=(
						<View style={styles.contentSon}>
							{contentSon}
						</View>
					);
					for (let z = 0; z < 2; z++) {
						if(this.state.tables[i][j][z] == ''){
							contentSon[z]=(<View style={[styles.tdView]}>
									</View>);
						}
						else{
							//console.log(this.state.tables[i][j][z]);
							contentSon[z]=(<TouchableOpacity onPress={()=>this.getMsg(this.state.tables[i][j][z],i)} style={[styles.tdView,{backgroundColor:viewColors[i]}]}>
									<Text style={styles.trTxt}>{this.state.tables[i][j][z]['ctime'].split('/')[2]}</Text>
								</TouchableOpacity>);
						}
					};
					
					rowView[i].push(
						content
					);
				};
			};
		}
		return columnView;
	};
	proWeek(){
		let value=this.state.dates;
		if (value.getMonth() == 1) {
			value.setMonth(12);
			value.setFullYear(value.getFullYear()-1);
		}
		else{
			value.setMonth(value.getMonth()-1);
		}
		this.setState({dates:value});
		this.changeSetTables();
	};
	nextWeek(){
		let value=this.state.dates;
		if (value.getMonth() == 12) {
			value.setMonth(1);
			value.setFullYear(value.getFullYear()+1);
		}
		else{
			value.setMonth(value.getMonth()+1);
		}
		this.setState({dates:value});
		this.changeSetTables();
	};
	render(){
		return (
			<View style={styles.container} >
				<View style={styles.DfImageMain}>
					<View style={styles.MainContent}>
						<View style={styles.rowTl}>
							<View style={[styles.rowTr,{backgroundColor:'#63B13C'}]}>
								<Text style={styles.trTxt}>处方</Text>
							</View>
							<View style={[styles.rowTr,{backgroundColor:'#FDB611'}]}>
								<Text style={styles.trTxt}>随访</Text>
							</View>
							<View style={[styles.rowTr,{backgroundColor:'#F2711A'}]}>
								<Text style={styles.trTxt}>测量</Text>
							</View>
							<View style={[styles.rowTr,{backgroundColor:'#E4141C'}]}>
								<Text style={styles.trTxt}>luna</Text>
							</View>
						</View>
						<View style={styles.tabelTB}> 
							{this.createViewByTb()}
						</View>
					</View>				
				</View>
				<View  style={styles.DfImageCG}>
				<View style={styles.DfImageCGContent}>
					<TouchableOpacity onPress={()=>this.proWeek()} style={styles.btnImage}><Image source={require('../../images/icon/prepM.png')}></Image></TouchableOpacity>
					<Text style={{alignSelf:'center',fontSize:18}}> {`${this.state.dates.getMonth()+1}月`}</Text>
					<TouchableOpacity onPress={()=>this.nextWeek()} style={styles.btnImage}><Image source={require('../../images/icon/nextM.png')}></Image></TouchableOpacity>
					</View>
				</View>
				 <Modal visible={this.state.Lvisible}
			                        style={{height:Dimensions.get('window').height,
			                                    width:Dimensions.get('window').width,top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(0,0,0,0.1)'}}>
			                               <TouchableOpacity onPress={()=>this.closeModal()} style={styles.modalStyle}>

			                               </TouchableOpacity>
			                             
			              </Modal>
				<LoadingModal ref='loadModal'/>
			</View>
		);
	};
};

const styles = StyleSheet.create({
  	container: {
    		height:250,
    		backgroundColor:'#ffffff',
    		marginBottom:10,
  	},
  	btnImage:{
  		height:50,
  		width:50,
  		justifyContent:'center',
  		alignItems:'center',
  	},
	DfImage:{
		flexDirection: 'column',
		flex:1,
	},
	DfImageMain:{
		flex:3,
		height:200,
	},
	DfImageCG:{
		flex:1,
		height:50,
		flexDirection:'column',
		justifyContent: 'center',
	},
	DfImageCGContent:{
		flexDirection:'row',
    		justifyContent: 'space-around',
	},
	MainContent:{
		flexDirection:'row',
		flex:1,
	},
	rowTl:{
		flexDirection:'column',
		flex:1,
	},
	tabelTB:{
		flexDirection:'column',
		flex:4,
	},
	rowTr:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	trTxt:{
		color:'white',
		fontSize:12,
	},
	trView:{
		flexDirection:'row',
		flex:1,
	},
	tdView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:Dimensions.get('window').width*0.75/16,
		height:Dimensions.get('window').width*0.75/16,
		width:Dimensions.get('window').width*0.75/16,
	},
	contentSon:{
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		flex:1,
	},
	tdViewTwo:{
		flex:2,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:1,
		borderRadius:Dimensions.get('window').width*0.75/16,

	},
	modalStyle:{
	      top:(Dimensions.get('window').height-300)/2,
	      left:(Dimensions.get('window').width-250)/2,
	      height:300,
	      width:250,
	      borderWidth:1,
	      borderColor:'#ffffff',
	      borderRadius:20,
	      backgroundColor: '#ffffff',
	},
});

  export default PatientMsgImageMonth;