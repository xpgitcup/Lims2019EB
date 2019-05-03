//全局变量定义
var listPersonDiv;
var PersonTabNames =["教师","学生","专业","年级"];
var localPageSizePerson;

$(function () {
    console.info("加载..." + document.title);

    //变量获取
    listPersonDiv = $("#listPersonDiv");
    var defaultTab = listPersonDiv.tabs("tabs")[0].panel("options").title
    var currentTab = readStorage("current" + document.title, defaultTab);
    var localPageSizePerson = readLocalStorage("pageSize" + document.title, 10);
    console.info("首次加载..." + currentTab);

    listPersonDiv.tabs({
        onSelect: function (title, index) {
            //记录tabs的缺省页面，所以采用tabsName
            console.info("选择标签：" + title + "--" + index);
            sessionStorage.setItem("current" + document.title, title);
            //------------------------------------------------------------------------------------------------------
            //记录当前页
            var cPageNumber = readStorage("currentPage" + document.title + title, 1);
            loadPerson(title, cPageNumber, localPageSizePerson)
            // 设置翻页
            configPagination(title);
        }
    });
    // 打开缺省的标签
    listPersonDiv.tabs("select", currentTab);

    var list教师Div = $("#list教师Div");
    var cPageNumber = readStorage("currentPage" + document.title + "教师", 1);
    console.info("panel首次加载.....")
    list教师Div.panel({
        href: loadPerson("教师", cPageNumber, localPageSizePerson)
    })

    /*
    * 设置分页参数
    * */
    function configPagination(title) {
        var paginationDiv = $("#paginationPerson" + title + "Div")
        var cPageNumber = readStorage("currentPage" + document.title + title, 1);
        var total = countPerson(title)
        paginationDiv.pagination({
            pageSize: localPageSizePerson,
            total: total,
            pageList: [1, 3, 5, 10, 20, 30],
            showPageList: false,
            pageNumber: cPageNumber,
            onSelectPage: function (pageNumber, pageSize) {
                sessionStorage.setItem("currentPage" + document.title + title, pageNumber);     //记录当前页面
                loadPerson(title, pageNumber, pageSize);
            }
        })
    }

});

/*
* 统计函数
* */
function countPerson(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsPerson();
    var url = "operation4Person/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadPerson(title, page, pageSize) {
    console.info(document.title + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsPerson();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4Person/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsPerson() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

/*
* 定位到需要编辑的记录
* */
function listToDo() {
    console.info(jsTitlePerson + "+待完成......");
    var title = jsTitlePerson;
    var page = 1;   //每次都定位到第一页
    var params = getParams(page, localPageSizePerson);    //getParams必须是放在最最前面！！
    ajaxRun("operation4Person/list" + params + "&key=" + title + ".TODO", 0, "list" + title + "Div");
}

function shiftDisplay(title) {
    console.info("显示当前提示...")
    $("#currentTemplate").html("下载[" + title + "]模板");
    $("#currentTemplate").attr("href", "operation4Person/downloadTemplate?key=" + title);
    $("#currentImport").html("导入[" + title + "]数据");
    $("#importKey").attr("value", title);
    $("#imputManual").html("手输[" + title + "]");
    switch (title) {
        case "教师":
            //$("#inputTeacher").style.display = "block";
            //$("#inputTeacher").className = ""; //不起作用
            $("#inputTeacher").attr("class", "")
            $("#inputStudent").attr("class", "hidden")
            console.info("----显示" + title);
            break
        case "学生":
            $("#inputTeacher").attr("class", "hidden")
            $("#inputStudent").attr("class", "")
            break
        default:
            $("#inputTeacher").attr("class", "hidden")
            $("#inputStudent").attr("class", "hidden")
    }
}

