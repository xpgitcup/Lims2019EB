<%--
  Created by IntelliJ IDEA.
  User: LiXiaopingChuyun
  Date: 2019/4/28
  Time: 13:42
--%>

<!doctype html>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--设置布局模板-->
    <meta name="layout" content="mainCup20190407"/>
    %{--浏览器标签上的标题-kq--}%
    <title>${cn.edu.cup.basic.Caption.findByName("main")?.title}</title>
    %{--浏览器标签上的图标-kq--}%
    <asset:link rel="icon" href="cup/${cn.edu.cup.basic.Caption.findByName("main").logo}" type="image/x-ico"/>
    <!-- 设置标题，如果没有特殊情况，标题叫这样了。 -->
    <g:set var="entityName" value="Lims2019EB"/>
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/${entityName}.js"/>
</head>

<body>

<div class="container-fluid">
    <div align="center">
        <asset:image src="cup/${cn.edu.cup.basic.Caption.findByName("main详细介绍")?.logo}"/>
    </div>
</div>

<div class='easyui-tabs' id='list1Div'>
    <div title='2' data-options='closeable:false'>
        <div id='list2Div'>
            <data>这里是显示数据</data>
        </div>
        <div id='pagination2Div' class='easyui-pagination'>
            <data>???</data>
        </div>
    </div>
    <div title='3' data-options='closeable:false'>
        <div id='list3Div'>
            <data>这里是显示数据</data>
        </div>
        <div id='pagination3Div' class='easyui-pagination'>
            <data>???</data>
        </div>
    </div>
</div>

</body>

</html>