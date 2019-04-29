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
        <g:set var="entityName" value="${message(code: 'dataRootPath.label', default: 'DataRootPath')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <a href="#list-dataRootPath" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div id="list-dataRootPath" class="content scaffold-list" role="main">
            <g:if test="${flash.message}">
                <div class="message" role="status">${flash.message}</div>
            </g:if>
            <f:table collection="${objectList}" />

            <div class="paginationGrails">
                <g:paginate total="${dataRootPathCount ?: 0}" />
            </div>
        </div>
    </body>
</html>