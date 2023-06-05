import axios from '../utils/axios.ts'
/**
 * 根据文章标签或者 文章主题查找文章
 * @param data 
 * @returns 
 */
export function findArticle(data){
    return axios.post('/article/findArticle', data)
}
