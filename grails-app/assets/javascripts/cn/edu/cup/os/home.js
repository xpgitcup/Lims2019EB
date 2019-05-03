//全局变量定义
var listHomeDiv;
var HomeTabNames =["我领导的","我参与的","我管理的"];
var localPageSizeHome;

$(function () {

    console.info("加载..." + document.title);

    /* 统计在线人数 */
    ajaxRun("home/countOnlineUsers", 0, "onlineCount")
    /* 显示菜单*/
    ajaxRun("home/getMenuItems", 0, "applicationMenuDiv")

    //变量获取
    listHomeDiv = $("#listHomeDiv");
    var currentTab = readStorage("current" + document.title, "");
    var localPageSizeHome = readLocalStorage("pageSize" + document.title, 5);   //只显示5个记录

    listHomeDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + document.title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //记录当前页
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadHome(title, cPageNumber, localPageSizeHome)
            // 设置翻页
            configPagination(title);
        }
    });
    // 打开缺省的标签
    listHomeDiv.tabs("select", currentTab);

    /*
    * 设置分页参数
    * */
    function configPagination(title) {
        var paginationDiv = $("#paginationHome" + title + "Div")
        var cPageNumber = readStorage("currentPage" + document.title + title, 1);
        var total = countHome(title)
        paginationDiv.pagination({
            pageSize: localPageSizeHome,
            total: total,
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: cPageNumber,
            onSelectPage: function (pageNumber, pageSize) {
                sessionStorage.setItem("currentPage" + doument.title + title, pageNumber);     //记录当前页面
                loadHome(title, pageNumber, pageSize);
            }
        })
        return currentPage;
    }

});

/*
* 统计函数
* */
function countHome(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsHome();
    var url = "home/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadHome(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsHome();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "home/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsHome() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "-登录后";
}