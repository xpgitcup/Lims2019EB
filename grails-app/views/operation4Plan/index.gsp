<!--
  To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
<!--meta name="layout" content="main"/-->
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
<!--这个地方设置成固定的-->
    <g:set var="entityName" value="Plan"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/lims/${entityName}.js"/>
</head>

<body>

<div class="easyui-panel">
    <div class="nav">
        <ul id="operation4PlanUl" class="indicator-cup">
            <li class="icon-help">&nbsp&nbsp&nbsp&nbsp：</li>
            <li id="tipsOperation4Progress"></li>
            <li>当前：${planTitle}.${planJsRoutine}</li>
            <li id="currentTitle"></li>
            <li><a id="createItem"></a></li>
            <!--li><a id="editItem"></a></li-->
        </ul>
    </div>
</div>

<div class="container-cup">
    <div class="row-cup">
        <!--左面显示类型-->
        <div class="col-md-4">
            <div class="easyui-panel">
                <ul id="treeViewThingTypeUl" class="easyui-tree"></ul>
            </div>
        </div>
        <!--右边显示计划-->
        <div class="col-md-8">
            <div class="easyui-panel">
                <div title="Plan" id="listPlanDiv" class="easyui-panel"></div>

                <div id="paginationPlanDiv" class="easyui-pagination"></div>
            </div>

            <div id="operation4PlanItemDiv" class="easyui-panel"></div>
        </div>
    </div>
</div>

<g:if test="${flash.message}">
    <div class="easyui-panel">
        <div class="message" role="status">${flash.message}</div>
    </div>
</g:if>

</body>
</html>
