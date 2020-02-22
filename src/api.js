const baseUrl = 'http://192.168.111.116:8001/ctm/';
const API = {
  dapinConfig: baseUrl + 'paramItem/getAreaGenreByItemName',//大屏配置
  getHospitalInfo: baseUrl + 'hosp/getHospital',//医院logo请求
  getRoomPersonNumber: baseUrl + 'rmApi/clothesUseRecord/findAllOperationRoomPersonNumber',//手术室人数
  getDeviceUsageCondition: baseUrl + 'rmApi/device/device/getDeviceUsageCondition',//更衣鞋柜使用情况
  firstLate: baseUrl + 'rmApi/operationSchedule/findAllLate',//首台迟到
  searchMemberList: baseUrl + 'rmApi/operationSchedule/findOperation',//手术排班信息查询
  getClothUseAgainstByPage: baseUrl + 'rmApi/clothesUseRecord/getClothUseAgainstByPage',//衣物超期未归还(包括手术衣和手术鞋))
  getKeysDisListByPage: baseUrl + 'rmApi/device/keysDis/getKeysDisListByPage',//钥匙超期未归还人员信息
  //协同管理系统api
  findScreenByDeviceId: baseUrl + 'rmApi/screenValue/findScreenByDeviceId' ,// 显示大屏数据显示获取
  hospLogo: 'http://192.168.111.155:8111/bsp/rmApi/userManage/bspHospital/list', // 获取logo数据
}

export default API;
