var listQueryStatementDiv;
var paginationQueryStatementDiv;
var localQueryStatementPageSize = 10
var titleQueryStatement;// = "查询维护"

$(function () {
    console.info("加载..." + document.title);
    titleQueryStatement = document.title;   // 当前页面的标题：一般来说，就是域类的名称。对于单个面板的情况。

    var currentPage = readLocalStorage("currentPage" + document.title, 1);

    listQueryStatementDiv = $("#listQueryStatementDiv");
    listQueryStatementDiv.panel({
        href: loadQueryStatement(titleQueryStatement, currentPage, localQueryStatementPageSize)
    })

    paginationQueryStatementDiv = $("#paginationQueryStatementDiv");
    paginationQueryStatementDiv.pagination({
        pageSize: localQueryStatementPageSize,
        total: countQueryStatement(titleQueryStatement),
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: currentPage,
        onSelectPage: function (pageNumber, pageSize) {
            console.info("setupPaginationParams4TabPage: " + titleQueryStatement)
            sessionStorage.setItem("currentPage" + document.title, pageNumber);
            loadQueryStatement(titleQueryStatement, pageNumber, pageSize);
        }
    })

});

/*
* 统计函数
* */
function countQueryStatement(title) {
    //console.info(document.title + "+统计......");
    var url = "operation4QueryStatementA/count?key=" + title + appendParam();
    //console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    //console.info(document.title + "+统计......" + total);
    return total
}

/*
* 数据加载函数
* */
function loadQueryStatement(title, page, pageSize) {
    //console.info(document.title + "+数据加载......" + " 第" + page + "页/" + pageSize);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4QueryStatementA/list" + params + "&key=" + title + appendParam();
    //console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

/*
* 附加参数
* */
function appendParam() {
    var filter = readStorage("filter" + document.title, false)
    var keyString = readCookie("keyString", "")
    console.info("过滤状态：" + filter + " " + keyString);
    var param = ""
    if (filter) {
        if (keyString) {
            param = "&keyString=" + keyString;
            $("#currentFilter").html(keyString)
        } else {
            param = "&filter=true"
        }
    }
    console.info("附加参数：" + param);
    return param
}

/*
* 定位到需要编辑的记录
* */
function listToDo() {
    console.info(document.title + "+待完成......");
    sessionStorage.setItem("filter" + document.title, true)
    location.reload();
}

/*
* 清除过滤条件
* */
function clearFilter() {
    sessionStorage.setItem("filter" + document.title, false)
    location.reload();
}
