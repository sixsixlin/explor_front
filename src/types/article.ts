export interface Article{
    articleID:number;     //文章id
    articleTitle:string; //文章标题
    articleInitTime:string; //文章创建时间
    articleContent:string; //文章内容
    articleMd:string; //文章格式
    userID:number  //修改者的id
    articleLableID:string; //文章标签id;
    imgURL:string;//文章图片路径;
}