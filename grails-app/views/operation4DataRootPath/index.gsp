<%--
  Created by IntelliJ IDEA.
  User: LiXiaopingChuyun
  Date: 2019/4/23
  Time: 11:04
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<!-- 实现可定制的布局 -->
    <g:if test="${layout}">
        <meta name="layout" content="${layout}"/>
    </g:if>
    <g:else>
        <g:if test="${session.layout}">
            <meta name="layout" content="${session.layout}"/>
        </g:if>
        <g:else>
            <meta name="layout" content="main"/>
        </g:else>
    </g:else>
<!-- end 实现可定制的布局 -->
    <g:set var="entityName" value="DataRootPath"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/system/${entityName}.js"/>
</head>

<body>
<div class="easyui-panel">
    <div class="nav">
        <ul id="operation4DataRootPathUl" class="indicator-cup">
            <li></li>
            <li>
                <a href="operation4DataRootPath/exportToJsonFileName?fileName=config/out/DataRootPathS" class="save">阿里导出Json文件</a>
            </li>
            <li>
                <a href="operation4DataRootPath/exportToJsonFile?fileName=config/out/DataRootPath.json" class="save">导出Json文件</a>
            </li>
            <li>
                <a href="operation4DataRootPath/importFromJsonFile?fileName=config/DataRootPath.json" class="create">从Json文件导入</a>
            </li>
        </ul>
    </div>
</div>

<div class="easyui-panel">
    <div title="DataRootPath" id="listDataRootPathDiv" class="easyui-panel"></div>
    <div id="paginationDataRootPathDiv" class="easyui-pagination"></div>
</div>

<g:if test="${flash.message}">
    <div class="easyui-panel"><div class="message" role="status">${flash.message}</div></div>
</g:if>

</body>
</html>