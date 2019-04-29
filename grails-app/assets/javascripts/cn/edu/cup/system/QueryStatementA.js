var listQueryStatementDiv;
var paginationQueryStatementDiv;

$(function () {
    console.info("加载..." + document.title);
    listQueryStatementDiv = $("#listQueryStatementDiv");
    paginationQueryStatementDiv = $("#paginationQueryStatementDiv");

    paginationQueryStatementDiv.pagination({
        pageSize: localPageSize,
        total: countQueryStatement(title),
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: currentPage,
        displayMsg: false,
        onSelectPage: function (pageNumber, pageSize) {
            console.info("setupPaginationParams4TabPage: " + title)
            $.cookie("currentPage" + title, pageNumber);     //记录当前页面
            loadQueryStatement(title, pageNumber, pageSize);
        }
    })

});

/*
* 统计函数
* */
function countQueryStatement(title) {
    console.info(document.title + "+统计......");
    var append = shiftDisplay(title);
    var url = "home/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadQueryStatement(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = shiftDisplay(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "home/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}
