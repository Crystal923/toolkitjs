echo "第一步：pull远程仓库代码···"
git pull origin master
echo "第二步：添加新增文件···"
git add .
read -p "请输入提交信息：" msg
if [ ! -n "$msg" ] ;then 
	echo "提交失败，提交信息不能为空哦！"
else
        echo "第三步：提交代码到本地仓库···"
	git commit -m "$msg update by Crystal"
	echo "第四步：push代码到远程仓库···"
        git push origin master
fi
