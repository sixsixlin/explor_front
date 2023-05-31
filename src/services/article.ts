import axios from '../utils/axios.ts'

export function findVarietyDict(){
    return axios.post('/article/findVarietyDict')
}
