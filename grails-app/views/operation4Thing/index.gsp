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
    <g:set var="entityName" value="Thing"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/lims/${entityName}.js"/>
</head>

<body>

<div class="container-cup">
    <div class="nav">
        <div class="easyui-panel" style="width: 100%">
            <ul id="operation4ThingUl">
                <li>
                    <a id="currentTemplate" href="">下载模板</a>
                </li>
                <li><a>||</a></li>
                <li><a id="currentImport">导入数据</a></li>
                <li>
                    <g:uploadForm method="post" action="importFromFile">
                        <ul>
                            <li>
                                <input type="file" name="uploadedFile"/>
                            </li>
                            <li>
                                <input type="hidden" name="key" value="" id="importKey"/>
                            </li>
                            <!--li>
                                <input type="checkbox" name="autoUpdateType" checked="checked"/>
                                <label>自动更新分类</label>
                            </li-->
                            <li>
                                <input type="submit" value="ok">
                            </li>
                        </ul>
                    </g:uploadForm>
                </li>
                <li><a>||</a></li>
                <li><a id="createItem" href=""></a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container-cup">
    <div class="easyui-panel">
        <div class="easyui-tabs" id="listThingDiv">
            <div title="科研" data-options="closeable:false">
                <div id="list科研Div"></div>
                <div id="paginationThing科研Div" class="easyui-pagination"></div>
            </div>
            <div title="教学" data-options="closeable:false">
                <div id="list教学Div"></div>
                <div id="paginationThing教学Div" class="easyui-pagination"></div>
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
