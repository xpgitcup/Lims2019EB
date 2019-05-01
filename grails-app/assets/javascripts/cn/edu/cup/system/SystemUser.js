//全局变量定义
var listSystemUserDiv;
var localPageSizeSystemUser;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    listSystemUserDiv = $("#listSystemUserDiv");
    var localPageSizeSystemUser = readLocalStorage("pageSize" + document.title, 10);

    listSystemUserDiv.panel({
        href:loadSystemUser(document.title, cPageNumber, localPageSizeSystemUser)
    });

    /*
    * 设置分页参数
    * */
    var paginationSystemUserDiv = $("#paginationSystemUserDiv")
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countSystemUser(document.title)
    paginationSystemUserDiv.pagination({
        pageSize: localPageSizeSystemUser,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadSystemUser(document.title, pageNumber, pageSize);
        }
    })

});

/*
* 统计函数
* */
function countSystemUser(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsSystemUser();
    var url = "operation4SystemUser/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadSystemUser(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsSystemUser();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4SystemUser/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsSystemUser() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

/*
 * 新建
 * */
function createSystemUser(id) {
    console.info("创建SystemUser. 上级节点：" + id);
    ajaxRun("operation4SystemUser/create", id, "showSystemUserDiv");
}

/*
 * 编辑
 * */
function editSystemUser(id) {
    console.info("编辑SystemUser." + id);
    ajaxRun("operation4SystemUser/edit", id, "showSystemUserDiv");
}

/*
 * 显示当前属性
 * */
function showSystemUser(id) {
    console.info("显示当前" + id);
    if (id) {
        ajaxRun("operation4SystemUser/show", id, "showSystemUserDiv");
    }
}

