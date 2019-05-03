<%--
  Created by IntelliJ IDEA.
  User: LiXiaopingChuyun
  Date: 2019/4/3
  Time: 14:22
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="mainCup20190407"/>
    <title>Home</title>
</head>

<body>

<div align="center" class="container-fluid">
    <asset:image src="cup/${cn.edu.cup.basic.Caption.findByName("main详细介绍")?.logo}"/>
</div>

<div class="container-cup">

    <div class="easyui-tabs" id="listHomeDiv">
        <div title="我领导的" data-options="closeable:false">
            <div id="list我领导的Div"></div>
            <div id="paginationHome我领导的Div" class="easyui-pagination"></div>
        </div>
        <div title="我参与的" data-options="closeable:false">
            <div id="list我参与的Div"></div>
            <div id="paginationHome我参与的Div" class="easyui-pagination"></div>
        </div>
        <div title="我管理的" data-options="closeable:false">
            <div id="list我管理的Div"></div>
            <div id="paginationHome我管理的Div" class="easyui-pagination"></div>
        </div>
    </div>
</div>
</body>
</html>