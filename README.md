## 将项目进行git管理
# （1）创建本地仓库：
  git init: 生成一个带有.git的文件，这时生成工作区；
  git add *: 将工作区的文件提交到暂存区；
  git commit -m '描述信息': 将暂存区的文件提交到版本区；
  以上三步操作，完成本地仓库的创建。
# （2）创建远程仓库
  登录github，new responsitory，点击create即可创建完成。
# （3）将本地仓库的文件提交到远程仓库
  -首先建立本地仓库与远程仓库的连接:
    -通过SSH方式：git remote add origin git@github.com:kai208307/Vue_gshop.git
    -通过http方式：git remote add origin https://github.com/kai208307/Vue_gshop.git
  这两种方式的区别为：SSH方式需要配置SSH文件，建立连接的时候不需要输入用户名和密码；http方式需要每次输入用户名和密码；
  -提交到远程仓库：git push origin master
  完成以上操作，远程仓库和本地仓库均会有一个master分支，查看有什么分支：git branch,因为项目比较大，所以需要建立其他的分支，
  最后确认无误后，将其他分支的内容合并到主分支上；
# （4）创建个人分支
    git branch '个人分支名称'
# （5）切换到个人分支
    git checkout '个人分支名称'
# （6）将个人分支推动到远程仓库中
    git push origin '个人分支名称'
  这时远程仓库就多了一个‘个人分支’。

 开始项目：
 1、本次项目使用stylus预编译器，编译成css语句，利用的是webpack这个工具，但是webpack不认识stylus，所以需要借助stylus-loader
 这个库，使webpack可以识别stylus语句。另外，因为webstorm不能识别stylus语句，所以需要在style标签上声明，使用的语句是stylus，
 故<style lang="stylus" rel="stylesheet/stylus"></style>;下载依赖：npm install stylus stylus-loader --save-dev
 2、创建相关文件夹：api（关于发送ajax请求的，其中包含两个文件：）

