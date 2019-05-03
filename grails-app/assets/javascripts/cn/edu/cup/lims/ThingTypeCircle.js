//全局变量定义
var listThingTypeCircleDiv;
var localPageSizeThingTypeCircle;
//全局变量定义
var treeViewThingTypeUl;
//全局变量定义
var treeViewPersonTitleUl;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    listThingTypeCircleDiv = $("#listThingTypeCircleDiv");
    var localPageSizeThingTypeCircle = readLocalStorage("pageSize" + document.title, 10);
    var cPageNumber = readStorage("currentPage" + document.title, 1);
    var total = countThingTypeCircle(document.title)

    listThingTypeCircleDiv.panel({
        href:loadThingTypeCircle(document.title, cPageNumber, localPageSizeThingTypeCircle)
    });

    /*
    * 设置分页参数
    * */
    var paginationThingTypeCircleDiv = $("#paginationThingTypeCircleDiv")
    paginationThingTypeCircleDiv.pagination({
        pageSize: localPageSizeThingTypeCircle,
        total: total,
        pageList: [1, 3, 5, 10, 20, 30],
        showPageList: false,
        pageNumber: cPageNumber,
        onSelectPage: function (pageNumber, pageSize) {
            sessionStorage.setItem("currentPage" + document.title, pageNumber);     //记录当前页面
            loadThingTypeCircle(document.title, pageNumber, pageSize);
        }
    })

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
    treeViewPersonTitleUl = $("#treeViewPersonTitleUl");

    treeViewPersonTitleUl.tree({
        url: "operation4PersonTitle/getTreeViewData",
        onSelect: function (node) {
            console.info("树形结构节点选择：" + node.target.id);
            sessionStorage.setItem("currentNode" + document.title, node.target.id);
            treeNodeSelectedPersonTitle(node);
        },
        onLoadSuccess: function () {
            var cnodeid = readStorage("currentNode" + document.title, 0);
            console.info("上一次：" + cnodeid);
            treeViewPersonTitleUl.tree("collapseAll");
            if (cnodeid != 0) {
                console.info("扩展到：" + cnodeid);
                var cnode = $("#" + cnodeid);
                treeViewPersonTitleUl.tree("expandTo", cnode);
                treeViewPersonTitleUl.tree("select", cnode);
            }
        }
    })

});

/*
* 统计函数
* */
function countThingTypeCircle(title) {
    console.info(document.title + "+统计......");
    var append = setupAppendParamsThingTypeCircle();
    var url = "operation4ThingTypeCircle/count?key=" + title + append
    console.info(document.title + " : " + url);
    var total = ajaxCalculate(url);
    return total
}

/*
* 数据加载函数
* */
function loadThingTypeCircle(title, page, pageSize) {
    console.info("数据加载：" + title + " 第" + page + "页/" + pageSize);
    var append = setupAppendParamsThingTypeCircle();
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    var url = "operation4ThingTypeCircle/list" + params + "&key=" + title + append;
    console.info(document.title + " : " + url);
    ajaxRun(url, 0, "list" + title + "Div");
}

function setupAppendParamsThingTypeCircle() {
    // 根据sessionStorage的参数，设置相应的附加参数，不同的标签的--都在各自页面考虑，所以不带参数
    return "";
}

/*
* 节点选择
* */
function treeNodeSelectedThingType(node) {
    console.info("选择" + node);
    $("#thingType").attr("value", node.attributes[0])
}

/*
* 节点选择
* */
function treeNodeSelectedPersonTitle(node) {
    console.info("选择" + node);
    $("#personTitle").attr("value", node.attributes[0])
}






/////////////////////////////////////////////////////////

function deleteItem(id) {
    console.info("删除：" + id);
    ajaxExecuteWithMethod("operation4ThingTypeCircle/delete?id=" + id, 'DELETE');
    console.info("删除：" + id + "了！");
    location.reload();
}

/*
* 定位到需要编辑的记录
* */
function listToDo() {
    console.info(jsTitleThingTypeCircle + "+待完成......");
    var title = jsTitleThingTypeCircle;
    var page = 1;   //每次都定位到第一页
    var params = getParams(page, localPageSizeThingTypeCircle);    //getParams必须是放在最最前面！！
    ajaxRun("operation4ThingTypeCircle/list" + params + "&key=" + title + ".TODO", 0, "list" + title + "Div");
}

function shiftDisplay(title) {
    console.info("显示当前提示...")
    $("#currentTemplate").html("下载[" + title + "]模板");
    $("#currentTemplate").attr("href", "operation4ThingTypeCircle/downloadTemplate?key=" + title);
    $("#currentImport").html("导入[" + title + "]数据");
    $("#importKey").attr("value", title);
}

function changeUpNode(node) {
    console.info("修改根节点的id...")
    $("#createItem").attr('href', 'javascript: createItem(' + node.attributes[0] + ')');
    $("#createItem").html("创建" + node.attributes[0] + '的子节点');
    $("#editItem").attr('href', 'javascript: editItem(' + node.attributes[0] + ')');
    $("#editItem").html("编辑" + node.attributes[0] + '节点');
    $("#deleteItem").attr('href', 'operation4ThingTypeCircle/delete/' + node.attributes[0]);
    $("#deleteItem").html("删除" + node.attributes[0] + '节点');
    $("#currentTitle").html(node.text);
    ajaxRun("operation4ThingTypeCircle/show", node.attributes[0], "showInformationDiv");
}

