import axios from '../utils/axios.ts'
/**
 * 登录
 * @returns 
 */
export function login(data){
    return axios.post('/doLogin/userLogin',data)
}
/**
 * 查看用户资格状态
 * 
 */
export function qualification(data:any){
  return axios.post('/doLogin/censorPower',data)
}
/**
 * 用户申请文章编辑资格
 */
export function applyQualification(data:any){
  return axios.post('/doLogin/applyEditArticle',data)
}
/**
 * 用户反馈信息
 */
export function feedBackMsg(data:any){
  return axios.post('/reactManage/insertReactInfo',data)
}