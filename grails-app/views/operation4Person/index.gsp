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
    <g:set var="entityName" value="Person"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}</title>
    <asset:javascript src="cn/edu/cup/basic/${entityName}.js"/>
</head>

<body>
<div class="container-cup">
    <div class="easyui-panel">
        <div class="nav">
            <ul id="operation4PersonUl">
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
                            <li>
                                <input type="submit" value="ok">
                            </li>
                        </ul>
                    </g:uploadForm>
                </li>
                <li><a>||</a></li>
            </ul>
        </div>
    </div>
</div>


<div class="easyui-tabs" id="listPersonDiv">
    <div title="教师" data-options="closeable:false">
        <div id="list教师Div"></div>

        <div id="paginationPerson教师Div" class="easyui-pagination"></div>
    </div>

    <div title="学生" data-options="closeable:false">
        <div id="list学生Div"></div>

        <div id="paginationPerson学生Div" class="easyui-pagination"></div>
    </div>

    <div title="专业" data-options="closeable:false">
        <div id="list专业Div"></div>

        <div id="paginationPerson专业Div" class="easyui-pagination"></div>
    </div>

    <div title="年级" data-options="closeable:false">
        <div id="list年级Div"></div>

        <div id="paginationPerson年级Div" class="easyui-pagination"></div>
    </div>
</div>

<g:if test="${flash.message}">
    <div class="easyui-panel">
        <div class="message" role="status">${flash.message}</div>
    </div>
</g:if>

</body>
</html>
