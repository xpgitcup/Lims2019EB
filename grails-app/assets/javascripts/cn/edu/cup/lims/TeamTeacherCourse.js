//全局变量定义
var listTeamTeacherCourseDiv;
var localPageSizeTeamTeacherCourse;
//全局变量定义
var listTeamTeacherCourseSelectedDiv;
var localPageSizeTeamTeacherCourseSelected;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    listTeamTeacherCourseDiv = $("#listTeamTeacherCourseDiv");
    var localPageSizeTeamTeacherCourse = readLocalStorage("pageSize" + document.title, 10);
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countTeamTeacherCourse(document.title)

    listTeamTeacherCourseDiv.panel({
        href:loadTeamTeacherCourse(document.title, cPageNumber, localPageSizeTeamTeacherCourse)
    });

    /*
    * 设置分页参数
    * */
    var paginationTeamTeacherCourseDiv = $("#paginationTeamTeacherCourseDiv")
    paginationTeamTeacherCourseDiv.pagination({
        pageSize: localPageSizeTeamTeacherCourse,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadTeamTeacherCourse(document.title, pageNumber, pageSize);
        }
    })

    //变量获取
    listTeamTeacherCourseSelectedDiv = $("#listTeamTeacherCourseSelectedDiv");
    var localPageSizeTeamTeacherCourseSelected = readLocalStorage("pageSize" + document.title, 10);
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countTeamTeacherCourseSelected(document.title)

    listTeamTeacherCourseSelectedDiv.panel({
        href:loadTeamTeacherCourseSelected(document.title, cPageNumber, localPageSizeTeamTeacherCourseSelected)
    });

    /*
    * 设置分页参数
    * */
    var paginationTeamTeacherCourseSelectedDiv = $("#paginationTeamTeacherCourseSelectedDiv")
    paginationTeamTeacherCourseSelectedDiv.pagination({
        pageSize: localPageSizeTeamTeacherCourseSelected,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadTeamTeacherCourseSelected(document.title, pageNumber, pageSize);
        }
    })

});

/*
* 统计函数
* */
function countTeamTeacherCourse(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsTeamTeacherCourse();
    var url = "operation4TeamTeacherCourse/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadTeamTeacherCourse(title, page, pageSize) {
    console.info("数据加载：" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsTeamTeacherCourse();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4TeamTeacherCourse/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsTeamTeacherCourse() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "我的课程";
}

/*
* 统计函数
* */
function countTeamTeacherCourseSelected(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsTeamTeacherCourseSelected();
    var url = "operation4TeamTeacherCourse/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadTeamTeacherCourseSelected(title, page, pageSize) {
    console.info("数据加载：" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsTeamTeacherCourseSelected();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4TeamTeacherCourse/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsTeamTeacherCourseSelected() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    console.info("学生情况...")
    return "学生情况";
}