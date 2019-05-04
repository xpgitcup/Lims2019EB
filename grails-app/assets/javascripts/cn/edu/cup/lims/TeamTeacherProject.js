//全局变量定义
var listTeamTeacherProjectDiv;
var TeamTeacherProjectTabNames = ["可选题目", "相关团队", "队员列表"];
var localPageSizeTeamTeacherProject;
//全局变量定义
var listTeamTeacherProjectSelectedDiv;
var TeamTeacherProjectSelectedTabNames = ["我领导的", "我参与的"];
var localPageSizeTeamTeacherProjectSelected;

$(function () {
    console.info("加载..." + document.title);

    //变量获取
    listTeamTeacherProjectDiv = $("#listTeamTeacherProjectDiv");
    var defaultTab = listTeamTeacherProjectDiv.tabs("tabs")[0].panel("options").title
    var currentTab = readStorage("current" + document.title, defaultTab);
    var localPageSizeTeamTeacherProject = readLocalStorage("pageSize" + document.title, 10);
    console.info("首次加载..." + currentTab);

    listTeamTeacherProjectDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //记录当前页
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadTeamTeacherProject(title, cPageNumber, localPageSizeTeamTeacherProject)
            // 设置翻页
            configPaginationTeamTeacherProject(title);
            //页面切换
            shiftTabTeamTeacherProject(title);
        }
    });
    // 打开缺省的标签
    listTeamTeacherProjectDiv.tabs("select", currentTab);

    var list可选题目Div = $("#list可选题目Div");
    var cPageNumber = readStorage("currentPage" + document.title + "可选题目", 1);
    console.info("panel首次加载.....")
    list可选题目Div.panel({
        href: loadTeamTeacherProject("可选题目", cPageNumber, localPageSizeTeamTeacherProject)
    })

    /*
    * 设置分页参数
    * */
    function configPaginationTeamTeacherProject(title) {
        var paginationDiv = $("#paginationTeamTeacherProject" + title + "Div")
        var cPageNumber = readStorage("currentPage" + document.title + title, 1);
        var total = countTeamTeacherProject(title)
        paginationDiv.pagination({
            pageSize: localPageSizeTeamTeacherProject,
            total: total,
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: cPageNumber,
            onSelectPage: function (pageNumber, pageSize) {
                sessionStorage.setItem("currentPage" + document.title + title, pageNumber);     //记录当前页面
                loadTeamTeacherProject(title, pageNumber, pageSize);
            }
        })
    }

    //变量获取
    listTeamTeacherProjectSelectedDiv = $("#listTeamTeacherProjectSelectedDiv");
    var defaultTab = listTeamTeacherProjectSelectedDiv.tabs("tabs")[0].panel("options").title
    var currentTab = readStorage("current" + document.title, defaultTab);
    var localPageSizeTeamTeacherProjectSelected = readLocalStorage("pageSize" + document.title, 10);
    console.info("首次加载..." + currentTab);

    listTeamTeacherProjectSelectedDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //记录当前页
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadTeamTeacherProjectSelected(title, cPageNumber, localPageSizeTeamTeacherProjectSelected)
            // 设置翻页
            configPaginationTeamTeacherProjectSelected(title);
            //页面切换
            shiftTabTeamTeacherProjectSelected(title);
        }
    });
    // 打开缺省的标签
    listTeamTeacherProjectSelectedDiv.tabs("select", currentTab);

    var list我领导的Div = $("#list我领导的Div");
    var cPageNumber = readStorage("currentPage" + document.title + "我领导的", 1);
    console.info("panel首次加载.....")
    list我领导的Div.panel({
        href: loadTeamTeacherProjectSelected("我领导的", cPageNumber, localPageSizeTeamTeacherProjectSelected)
    })

    /*
    * 设置分页参数
    * */
    function configPaginationTeamTeacherProjectSelected(title) {
        var paginationDiv = $("#paginationTeamTeacherProjectSelected" + title + "Div")
        var cPageNumber = readStorage("currentPage" + document.title + title, 1);
        var total = countTeamTeacherProjectSelected(title)
        paginationDiv.pagination({
            pageSize: localPageSizeTeamTeacherProjectSelected,
            total: total,
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: cPageNumber,
            onSelectPage: function (pageNumber, pageSize) {
                sessionStorage.setItem("currentPage" + document.title + title, pageNumber);     //记录当前页面
                loadTeamTeacherProjectSelected(title, pageNumber, pageSize);
            }
        })
    }

});

/*
* 统计函数
* */
function countTeamTeacherProject(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsTeamTeacherProject(title);
    var url = "operation4TeamTeacherProject/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadTeamTeacherProject(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsTeamTeacherProject(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4TeamTeacherProject/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsTeamTeacherProject(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    var append = ""
    switch (title) {
        case "相关团队":
            var currentThing = readStorage("currentThing", 0)
            append = "&currentThing=" + currentThing
            break
        case "队员列表":
            var currentTeam = readStorage("currentTeam", 0)
            append = "&currentTeam=" + currentTeam
            break
    }
    return append;
}

function shiftTabTeamTeacherProject(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

/*
* 统计函数
* */
function countTeamTeacherProjectSelected(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsTeamTeacherProjectSelected(title);
    var url = "operation4TeamTeacherProject/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadTeamTeacherProjectSelected(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsTeamTeacherProjectSelected(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4TeamTeacherProject/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsTeamTeacherProjectSelected(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

function shiftTabTeamTeacherProjectSelected(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

//以上是自动生成的代码--------------------------------------------------------------------------------------------------
function listTeam(id) {
    //selectCurrentItem(id)
    sessionStorage.setItem("currentThing", id);
    listTeamTeacherProjectDiv.tabs("select", "相关团队");
}

function createTeam(id) {
    console.info("创建团队...");
    sessionStorage.setItem("currentThing", id);
    ajaxExecute("operation4TeamTeacherProject/createTeam/" + id)
    listTeamTeacherProjectDiv.tabs("select", "相关团队");
    location.reload();
}

function quitTeam(id) {
    ajaxExecute("operation4TeamTeacherProject/quitTeam/" + id);
    listTeamTeacherProjectDiv.tabs("select", "相关团队");
    location.reload();
}

/*
* 解散团队
* */
function disband(id) {
    ajaxExecute("operation4TeamTeacherProject/disband/" + id)
    location.reload();
}

function joinTeam(id) {
    ajaxExecute("operation4TeamTeacherProject/joinTeam/" + id)
    sessionStorage.setItem("currentTeam", id);
    listTeamTeacherProjectDiv.tabs("select", "队员列表");
    listTeamTeacherProjectSelectedDiv.tabs("select", "我参与的")
}

function listMembers(id) {
    sessionStorage.setItem("currentTeam", id);
    listTeamTeacherProjectDiv.tabs("select", "队员列表");
}
