<!DOCTYPE html>
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
    <g:set var="entityName" value="${message(code: 'queryStatementA.label', default: 'QueryStatementA')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>

<body>
<a href="#list-queryStatementA" class="skip" tabindex="-1"><g:message code="default.link.skip.label"
                                                                      default="Skip to content&hellip;"/></a>

<div id="list-queryStatementA" class="content scaffold-list" role="main">
    <g:if test="${flash.message}">
        <div class="message" role="status">${flash.message}</div>
    </g:if>
    <!--f:table collection="${objectList}"/-->
    <table>
        <thead>
        <th>Controller</th>
        <th>Action</th>
        <th>关键字</th>
        <th>参数</th>
        <th>查询</th>
        <th>视图</th>
        <th>isSQL</th>
        </thead>
        <tbody>
        <g:each in="${objectList}" var="item" status="i">
            <tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
                <td>
                    ${item.controllerName}
                    <a href="operation4QueryStatementA/edit/${item.id}">编辑</a>
                    <a href="javascript: deleteItem(${item.id})">删除</a>
                </td>
                <td>${item.actionName}</td>
                <td>${item.keyString}</td>
                <td>${item.paramsString}</td>
                <td>${item.queryString}</td>
                <td>${item.viewName}</td>
                <td>${item.isSQL}</td>
            </tr>
        </g:each>
        </tbody>
    </table>
</div>
</body>
</html>