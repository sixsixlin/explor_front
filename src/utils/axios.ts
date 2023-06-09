import axios from 'axios';
import { ElMessage } from "element-plus";
import router from '../routers/router.ts';
axios.defaults.baseURL = '//localhost:8808/mid_technique/'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use(res =>{
    //拦截
    if(typeof res.data !== 'object'){
        ElMessage({
            showClose: true,
            message: '服务器异常'
        })
        return Promise.reject(res)
    }
    if(res.data.code != 20000){
        if(res.data.message)
            ElMessage({
                showClose: true,
                message: res.data.message
            })
        // 416表示未登录
        if(res.data.code == 416){
            // 先登录才能发请求,并跳转到登录接界面
            router.push({
                path:'/login'
            })
        }
        return Promise.reject(res)
    }        
    // 若数据正确 携带登录授权的token值
    if(res.data.data.token != null){
      // 登录之后的响应数据
      localStorage.setItem('token',res.data.data.token)
      // axios的每次请求都携带token
      axios.defaults.headers['token']=res.data.data.token
      ElMessage({
        message: '用户登录成功',
        type: 'success',
      })
      return
  }
    return res.data
})
export default axios
