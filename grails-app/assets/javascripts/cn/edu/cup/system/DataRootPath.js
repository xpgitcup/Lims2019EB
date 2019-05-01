//全局变量定义
var listDataRootPathDiv;
var localPageSizeDataRootPath;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    listDataRootPathDiv = $("#listDataRootPathDiv");
    var localPageSizeDataRootPath = readLocalStorage("pageSize" + document.title, 10);

    listDataRootPathDiv.panel({
        href:loadDataRootPath(document.title, cPageNumber, localPageSizeDataRootPath)
    });

    /*
    * 设置分页参数
    * */
    var paginationDataRootPathDiv = $("#paginationDataRootPathDiv")
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countDataRootPath(document.title)
    paginationDataRootPathDiv.pagination({
        pageSize: localPageSizeDataRootPath,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadDataRootPath(document.title, pageNumber, pageSize);
        }
    })

});

/*
* 统计函数
* */
function countDataRootPath(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsDataRootPath();
    var url = "operation4DataRootPath/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadDataRootPath(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsDataRootPath();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4DataRootPath/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsDataRootPath() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

function deleteItem(id) {
    console.info("删除：" + id);
    ajaxExecuteWithMethod("operation4DataRootPath/delete?id=" + id, 'DELETE');
    console.info("删除：" + id + "了！");
    location.reload();
}

/*
* 查询
* */
function DataRootPath() {
    var keyString = document.getElementById("keyString");
    //alert("查询..." + keyString.value);
    console.info("查询..." + keyString.value);
    $.cookie("filter", true);
    $.cookie("keyString", keyString.value);
    //$("#currentFilter").html(keyString.value);
    location.reload();
}

