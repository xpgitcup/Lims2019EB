//全局变量定义
var listThingDiv;
var ThingTabNames = ["科研", "教学"];
var localPageSizeThing;

$(function () {
    console.info("加载..." + document.title);

    //变量获取
    listThingDiv = $("#listThingDiv");
    var defaultTab = listThingDiv.tabs("tabs")[0].panel("options").title
    var currentTab = readStorage("current" + document.title, defaultTab);
    var localPageSizeThing = readLocalStorage("pageSize" + document.title, 10);
    console.info("首次加载..." + currentTab);

    listThingDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //记录当前页
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadThing(title, cPageNumber, localPageSizeThing)
            // 设置翻页
            configPagination(title);
            //页面切换
            shiftTabThing(title);
        }
    });
    // 打开缺省的标签
    listThingDiv.tabs("select", currentTab);

    var list科研Div = $("#list科研Div");
    var cPageNumber = readStorage("currentPage" + document.title + "科研", 1);
    console.info("panel首次加载.....")
    list科研Div.panel({
        href: loadThing("科研", cPageNumber, localPageSizeThing)
    })

    /*
    * 设置分页参数
    * */
    function configPagination(title) {
        var paginationDiv = $("#paginationThing" + title + "Div")
        var cPageNumber = readStorage("currentPage" + document.title + title, 1);
        var total = countThing(title)
        paginationDiv.pagination({
            pageSize: localPageSizeThing,
            total: total,
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: cPageNumber,
            onSelectPage: function (pageNumber, pageSize) {
                sessionStorage.setItem("currentPage" + document.title + title, pageNumber);     //记录当前页面
                loadThing(title, pageNumber, pageSize);
            }
        })
    }

});

/*
* 统计函数
* */
function countThing(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsThing(title);
    var url = "operation4Thing/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadThing(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsThing(title);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4Thing/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsThing(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

function shiftTabThing(title) {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    $("#currentTemplate").html("下载[" + title + "]模板");
    $("#currentTemplate").attr("href", "operation4Thing/downloadTemplate?key=" + title);
    $("#currentImport").html("导入[" + title + "]数据");
    $("#importKey").attr("value", title);
    $("#createItem").html("创建：" + title + " 数据");
    switch (title) {
        case "科研":
            $("#createItem").attr("href", "javascript: createProject('" + title + "')");
            break
        case "教学":
            $("#createItem").attr("href", "javascript: createCourse('" + title + "')");
            break
    }
}

function editProject(id) {
    console.info("编辑项目信息...");
    var title = getCurrentTabTitle(operation4ThingDiv);
    ajaxRun("operation4Thing/editProject", id, "list" + title + "Div");
}

function createProject(title) {
    console.info("创建教学任务...");
    //var title = getCurrentTabTitle(operation4ThingDiv);
    ajaxRun("operation4Thing/createProject", 0, "list" + title + "Div");
}

function createCourse(title) {
    console.info("创建教学任务...");
    //var title = getCurrentTabTitle(operation4ThingDiv);
    ajaxRun("operation4Thing/createCourse", 0, "list" + title + "Div");
}

function deleteCourse(id) {
    console.info("删除教学任务：" + id);
    ajaxExecuteWithMethod("operation4Thing/delete?id=" + id, 'DELETE');
    console.info("删除：" + id + "了！");
    location.reload();
}

/*
* 定位到需要编辑的记录
* */
function listToDo() {
    console.info(jsTitleThing + "+待完成......");
    var title = jsTitleThing;
    var page = 1;   //每次都定位到第一页
    var params = getParams(page, localPageSizeThing);    //getParams必须是放在最最前面！！
    ajaxRun("operation4Thing/list" + params + "&key=" + title + ".TODO", 0, "list" + title + "Div");
}

