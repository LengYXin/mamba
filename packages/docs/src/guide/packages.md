# packages 
::: warning clients 依赖关系 导致 在单独 packages yarn add 会失败
除 docs 和 server 其他 packages 都 依赖 clients

 package.json
 ```json
 "dependencies": {
    "@mamba/clients": "^0.0.1",
    ...
```
[lerna 文档](https://github.com/lerna/lerna/tree/main/commands/add#readme)
```bash
 # 使用
lerna add <package>[@version] [--dev] [--exact] [--peer]
```
:::

| packages | Description                  | frame      |
| -------- | ---------------------------- | ---------- |
| clients  | 同构模块，基础控制器帮助类   | typescript |
| docs     | 文档                         | vuepress   |
| mobile   | 手机端视图模块               | Vue        |
| reactjs  | 中后台管理模块               | React      |
| vuejs    | 中后台管理模块               | Vue        |
| server   | Server Api                   | Nodejs     |
| weapp    | 小程序                       | Taro&React |
| www      | 主站点微前端（目前为空项目） |

 ## clients    
   
 ## docs      
 ## mobile    
   
 ## reactjs   
   
 ## server    
   
 ## vuejs     
   
 ## weapp     
   
 ## www       
   