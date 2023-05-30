import axios from '../utils/axios.ts'

export function getUserInfo(){
    return axios.get('/test/hello')
}
