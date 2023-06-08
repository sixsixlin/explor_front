import axios from '../utils/axios.ts'
/**
 * 登录
 * @returns 
 */
export function login(data){
    return axios.post('/doLogin/userLogin',data)
}
