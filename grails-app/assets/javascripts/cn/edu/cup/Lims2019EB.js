var listLims2019EBDiv;
var lims2019EBTabNames = ["进度", "登录", "近7天进度", "近7天登录", "完成度"];

$(function () {

    console.info("加载..." + document.title);

    listLims2019EBDiv = $("#listLims2019EBDiv");
    //console.info(listLims2019EBDiv);
    // 当前页面的缺省标签页
    var currentTab = readStorage("current" + document.title, "");
    var localPageSize = readLocalStorage("pageSize" + document.title, 10);

    listLims2019EBDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + document.title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //var cPageNumber = readCookie("currentPage" + title, 1)
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadLims2019EB(title, cPageNumber, localPageSize)
            // 设置翻页
            configPagination(title);
        }
    });
    // 打开缺省的标签
    listLims2019EBDiv.tabs("select", currentTab);

    /*
    * 设置分页参数
    * */
    function configPagination(title) {
        var paginationDiv = $("#pagination" + title + "Div")
        var currentPage = readCookie("currentPage" + title, 1);
        var total = countLims2019EB(title)
        paginationDiv.pagination({
            pageSize: localPageSize,
            total: countLims2019EB(title),
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: currentPage,
            displayMsg: false,
            onSelectPage: function (pageNumber, pageSize) {
                console.info("setupPaginationParams4TabPage: " + title)
                $.cookie("currentPage" + title, pageNumber);     //记录当前页面
                loadLims2019EB(title, pageNumber, pageSize);
            }
        })
        return currentPage;
    }

});

/*
* 统计函数
* */
function countLims2019EB(title) {
    console.info(document.title + "+统计......");
    var append = shiftDisplay(title);
    var url = "home/query?function=count&key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadLims2019EB(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = shiftDisplay(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "home/query?function=list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function shiftDisplay(title) {
    return "";
}