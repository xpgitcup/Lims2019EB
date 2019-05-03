//全局变量定义
var treeViewThingTypeUl;
//全局变量定义
var listPlanDiv;
var localPageSizePlan;
var paginationPlanDiv;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    treeViewThingTypeUl = $("#treeViewThingTypeUl");

    treeViewThingTypeUl.tree({
        url: "operation4ThingType/getTreeViewData",
        onSelect: function (node) {
            console.info("树形结构节点选择：" + node.target.id);
            sessionStorage.setItem("currentNode" + document.title, node.target.id);
            treeNodeSelectedThingType(node);
        },
        onLoadSuccess: function () {
            var cnodeid = readStorage("currentNode" + document.title, 0);
            console.info("上一次：" + cnodeid);
            treeViewThingTypeUl.tree("collapseAll");
            if (cnodeid != 0) {
                console.info("扩展到：" + cnodeid);
                var cnode = $("#" + cnodeid);
                treeViewThingTypeUl.tree("expandTo", cnode);
                treeViewThingTypeUl.tree("select", cnode);
            }
        }
    })

    //变量获取
    listPlanDiv = $("#listPlanDiv");
    var localPageSizePlan = readLocalStorage("pageSize" + document.title, 10);
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countPlan(document.title)

    listPlanDiv.panel({
        href: loadPlan(document.title, cPageNumber, localPageSizePlan)
    });

    /*
    * 设置分页参数
    * */
    paginationPlanDiv = $("#paginationPlanDiv")
    paginationPlanDiv.pagination({
        pageSize: localPageSizePlan,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadPlan(document.title, pageNumber, pageSize);
        }
    })

});

/*
* 节点选择
* */
function treeNodeSelectedThingType(node) {
    console.info("选择" + node);
    $("#createItem").attr('href', 'javascript: createItemAuto(' + node.attributes[0] + ')');
    $("#createItem").html("自动创建" + node.attributes[0] + '的计划');
    $("#editItem").attr('href', 'javascript: editItem(' + node.attributes[0] + ')');
    $("#editItem").html("编辑" + node.attributes[0] + '计划');
    $("#currentTitle").html(node.text);

    sessionStorage.setItem("currentThingTypeId" + document.title, node.attributes[0]);

    var localPageSizePlan = readLocalStorage("pageSize" + document.title, 10);
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countPlan(document.title)
    loadPlan(document.title, cPageNumber, localPageSizePlan);
    paginationPlanDiv.pagination({total: total});
}

/*
* 统计函数
* */
function countPlan(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsPlan();
    var url = "operation4Plan/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadPlan(title, page, pageSize) {
    console.info("数据加载：" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsPlan();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4Plan/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsPlan() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    currentThingTypeId = readStorage("currentThingTypeId" + document.title, 1);
    var append = "&thingType=" + currentThingTypeId;
    return append;
}

function deleteItem(id) {
    ajaxExecuteWithMethod("operation4Plan/delete?id=" + id, 'DELETE');
    location.reload();
}

function editItem(id) {
    console.info("编辑计划...");
    ajaxRun("operation4Plan/edit?thingTypeId=" + id +
        "&view=editTypePlan",
        0, "operation4PlanDiv");
}

function showItem(id) {
    ajaxRun("operation4Plan/show?view=showTypePlan", id, "operation4PlanItemDiv");
}

function createItemAuto(id) {
    console.info("创建计划...");
    ajaxExecute("operation4Plan/createAuto?thingTypeId=" + id);
    location.reload();
}

function createItem(id) {
    console.info("创建计划...");
    ajaxRun("operation4Plan/create?thingTypeId=" + id +
        "&view=createTypePlan",
        0, "operation4PlanDiv");
}

function createPlanItem(id) {
    console.info("创建计划...");
    ajaxRun("operation4Plan/create?thingTypeId=" + id + "&view=createTypePlan",
        0, "operation4PlanDiv");
}