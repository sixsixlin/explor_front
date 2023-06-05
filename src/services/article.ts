import axios from '../utils/axios.ts'

export function findVarietyDict(){
    return axios.post('/article/findVarietyDict')
}

export function getUserList(){
    return axios.post('/userManage/getUserList')
}

export function getUserByStatusOrName(params:any){
    return axios.post('/userManage/getUserByStatusOrName',params)
}
