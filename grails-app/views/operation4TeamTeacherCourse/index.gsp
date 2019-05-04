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
    <g:set var="entityName" value="TeamTeacherCourse"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/lims/${entityName}.js"/>
</head>

<body>

<div class="container-cup">
    <div class="easyui-panel">
        <div class="nav">
            <ul class="indicator-cup">
                <li id="currentCase">${currentCase}</li>
                <li>操作指示：</li>
                <li id="currentTask">${currentTask}</li>
                <li>==></li>
                <li>选择任务</li>
                <li>==></li>
                <li>完成任务</li>
                <li></li>
                <li></li>
                <li class="icon-help">&nbsp&nbsp&nbsp&nbsp：</li>
                <li><a id="tipsOperation4Team"></a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container-cup">
    <div class="row-cup">
        <div class="col-6">
            <div class="easyui-panel" title="可选：${currentTask}">
                <div class="easyui-tabs" id="listTeamTeacherProjectDiv">
                    <div title="可选题目" data-options="closeable:false">
                        <div id="list可选题目Div"></div>
                        <div id="paginationTeamTeacherProject可选题目Div" class="easyui-pagination"></div>
                    </div>
                    <div title="相关团队" data-options="closeable:false">
                        <div id="list相关团队Div"></div>
                        <div id="paginationTeamTeacherProject相关团队Div" class="easyui-pagination"></div>
                    </div>
                    <div title="队员列表" data-options="closeable:false">
                        <div id="list队员列表Div"></div>
                        <div id="paginationTeamTeacherProject队员列表Div" class="easyui-pagination"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="easyui-panel" title="已选：${currentTask}">
                <div class="easyui-tabs" id="listTeamTeacherProjectSelectedDiv">
                    <div title="我领导的" data-options="closeable:false">
                        <div id="list我领导的Div"></div>
                        <div id="paginationTeamTeacherProjectSelected我领导的Div" class="easyui-pagination"></div>
                    </div>
                    <div title="我参与的" data-options="closeable:false">
                        <div id="list我参与的Div"></div>
                        <div id="paginationTeamTeacherProjectSelected我参与的Div" class="easyui-pagination"></div>
                    </div>
                </div>
            </div>
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
