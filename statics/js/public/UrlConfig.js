/*************************
 *实现与后台数据交互
*************************/

global.Basic_URL = 'http://www.xingwenpeng.com/doctor/';
global.Wechat_URL = 'http://www.xingwenpeng.com/wechat/';
global.Test_URL = 'http://www.xingwenpeng.com/test_online/';

var patient_openid = 'oKuU6wCL1pB-5pSv2hNS06P-xR9c';
global.Homepage_URL = 'http://www.xingwenpeng.com/patient/mydoctor/mydoctor_homepage/?patient_openid='+patient_openid+'&new_doctor_id=&doctor_id=';
//验证医生用户名密码
global.CheckUserInfo_URL = Basic_URL + 'AppLogin/';
//医生注册
global.DoctorRegist_URL = Basic_URL + 'AppDoctorRegist/';
//获取医生信息
global.DocInfo = Basic_URL + 'info/';
//编辑后保存医生信息
global.SaveDovInfo = Basic_URL + 'editorInfo/';
//获取患者列表
global.PatientList_URL = Basic_URL + 'patlist/';

//新获取患者列表
global.Apppatlist_URL = Basic_URL + 'Apppatlist/';
//根据症状来返回药品
global.Meds_URL = Basic_URL + 'meds/';
//添加病人服用药品
global.SavePrescript_URL = Basic_URL + 'savePrescript/';
//获取都太的测量等数据
global.PatRecords_URL = Basic_URL + 'pat_records/';
//获取都太的测量等数据
global.PatRecordsDetails_URL = Basic_URL + 'pat_records_details/';

//医生订单列表
global.GetDocOrder_URL = Basic_URL + 'docOrders/';
//根据订单号获取订单详情
global.OrderDetail_URL = Basic_URL + 'order/';

//获取医生诊断列表
global.DocDiags_URL = Basic_URL + 'docDiags/';
//添加医生诊断
global.AddDocDiag_URL = Basic_URL + 'addDocDiag/';
//添加医生药物
global.AddDocMed_URL = Basic_URL + 'addDocMed/';
//获取经典病例
global.TypicalList_URL = Basic_URL + 'getTypical/';
//增加经典病例
global.AddTypicalCase_URL = Basic_URL + 'addTypical/';
//删除经典病例
global.DelTypicalCase_URL = Basic_URL + 'delTypical/';
//更新经典病例
global.UpdataTypicalCase_URL = Basic_URL + 'updateTypical/';
//获取所有药品
global.MedicineList_URL = Basic_URL + 'getMed/';
//获取药品模板列表
global.MedModelList_URL = Basic_URL + 'getModel/';
//增加药品模板
global.AddMedModel_URL = Basic_URL + 'addModel/';
//删除药品模板
global.delMedModel_URL = Basic_URL + 'delModel/';
//患者的医生订单列表
global.PatientOrderList_URL = Basic_URL + 'patOrders/';
//患者的病例列表
global.PatientCaseBook_URL = Basic_URL + 'patCaseBook/';
//删除病例
global.DeleteCase_URL = Basic_URL + 'delCase/';
//医生收藏患者
global.Collection_URL = Basic_URL + 'collection/';
//取消收藏
global.EndCollection_URL = Basic_URL + 'cancel/';
//获取医患关系状态
global.GetRel_URL = Basic_URL + 'getrel/';
//获取医生诊断和系统诊断
global.GetDiags_URL = Basic_URL + 'getdiags/';
//删除服药方法
global.DelMedMethod_URL = Basic_URL + 'delMedMethod/';
//修改服药方法
global.ModifyMethod_URL = Basic_URL + 'modifyMethod/';
//得到医生编号
global.GetDocNum_URL = Basic_URL + 'getdocNum/';
//得到科室信息
global.GetDeparts_URL = Basic_URL + 'getdepars/';
//修改密码
global.ModifyPass_URL = Basic_URL + 'AppModifyPass/';
//发送短信
global.sendMsg_URL = Basic_URL + 'AppSendMsg/';
//上传医生头像
global.Uploadphoto_URL = Basic_URL + 'uploadPhoto/';
//获取二维码
global.DoctorQrcode_URL = Wechat_URL + 'AppGetQrcode/';
//发送医嘱信息
global.SendDoctorMsg_URL = Wechat_URL + 'sendDoctorMsg/';
//liangbiao
global.SendTest_URL = Wechat_URL + 'patientTestTable/';
//获取量表列表
global.GetTablelist_URL = Test_URL + 'getTablelist/';