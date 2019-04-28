var listLims2019EBDiv;
var lims2019EBTabNames = ["进度", "登录", "近7天进度", "近7天登录", "完成度"];

$(function () {
    listLims2019EBDiv = $("#listLims2019EBDiv");

    var currentTab = readCookie("current" + tabsName, defaultTab);

    listLims2019EBDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info(tabsName + "--选择标签：" + title + "--" + index);
            //$.cookie("current" + tabsName, title, {path: '/'});
            $.cookie("current" + tabsName, title);
            //------------------------------------------------------------------------------------------------------
            var cPageNumber = readCookie("currentPage" + title, 1)
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
        var total = countFunction(title)
        paginationDiv.pagination({
            pageSize: localPageSize,
            total: countLims2019EB(title),
            pageList: pageList, //[1, 3, 5, 10, 20, 30],
            showPageList: settings.showPageList,
            pageNumber: currentPage,
            displayMsg: paginationMessage,
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
    console.info(jsTitleTeam + "+统计......");
    var append = shiftDisplay(title);
    var total = ajaxCalculate("operation4Team/count?key=" + title + append);
    return total
}

/*
* 数据加载函数
* */
function loadLims2019EB(title, page, pageSize) {
    console.info(jsTitleTeam + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = shiftDisplay(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    ajaxRun("operation4Team/list" + params + "&key=" + title + append, 0, "list" + title + "Div");
}