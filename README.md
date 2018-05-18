# 项目文件
clone or download
默认安装[node](https://nodejs.org/dist/v8.10.0/node-v8.10.0-x64.msi),[cnpm](https://npm.taobao.org/)。    
```cmd
cnpm install  
```
- projects/ 为项目文件
- projects/dgy/ 为大观园源码

开发PC端页面：
1. 更新gulpfile.js
> line 18 更新开发目录
```javascript
var nowPath = '/dgy/***/';
```

2. 打开当前文件夹cmd，输入 
```cmd
gulp pc
```