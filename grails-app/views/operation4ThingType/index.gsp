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
    <g:set var="entityName" value="ThingType"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/lims/${entityName}.js"/>
</head>

<body>

<div class="container-cup">
        <div class="nav">
            <div class="easyui-panel" style="width: 100%">
            <ul id="operation4ThingTypeUl">
                <li><a>当前</a></li>
                <li><a id="currentTitle"></a></li>
                <li><a>||</a></li>
                <li><a id="createRootItem" href="javascript: createItem(0)">创建根节点</a></li>
                <li><a id="createItem" href="#"></a></li>
                <li><a id="editItem" href="#"></a></li>
                <!--li><a id="deleteItem" href="#"></a></li-->
                <!--li><a id="exportMatterType" href="operation4ThingType/exportToJsonFile?fileName=config/thingType.json" class="save">导出文件</a></li-->
            </ul>
        </div>
    </div>
</div>

<div class="container-cup">
    <div class="row-cup">
        <div class="col-md-6">
            <div id="operation4ThingTypeDiv" class="easyui-panel">
                <ul id="treeViewThingTypeUl" class="easyui-tree"></ul>
            </div>
        </div>

        <div class="col-md-6">
            <div id="showThingTypeDiv" class="easyui-panel"></div>
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
