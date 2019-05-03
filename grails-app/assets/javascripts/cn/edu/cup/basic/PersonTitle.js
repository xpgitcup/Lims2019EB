//全局变量定义
var treeViewPersonTitleUl;

$(function () {

    console.info("加载..." + document.title);

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
* 节点选择
* */
function treeNodeSelectedPersonTitle(node) {
    console.info("选择" + node);
    $("#createItem").attr('href', 'javascript: createItem(' + node.attributes[0] + ')');
    $("#createItem").html("创建" + node.attributes[0] + '的子节点');
    $("#editItem").attr('href', 'javascript: editItem(' + node.attributes[0] + ')');
    $("#editItem").html("编辑" + node.attributes[0] + '节点');
    $("#deleteItem").attr('href', 'javascript: deleteItem(' + node.attributes[0] + ')');
    $("#deleteItem").html("删除" + node.attributes[0] + '节点');
    $("#currentTitle").html(node.text);
    showPersonTitle(node);
}

function deleteItem(id) {
    console.info("删除：" + id);
    ajaxExecuteWithMethod("operation4PersonTitle/delete?id=" + id, 'DELETE');
    console.info("删除：" + id + "了！");
    location.reload();
}

function editItem(id) {
    ajaxRun("operation4PersonTitle/edit", id, "showPersonTitleDiv");
}

/*
* 新建
* */
function createItem(id) {
    ajaxRun("operation4PersonTitle/create?upTitle=" + id, 0, "showPersonTitleDiv");
}

function createPersonTitle(id) {
    console.info("创建PersonTitle. 上级节点：" + id);
    ajaxRun("operation4PersonTitle/createPersonTitle", id, "showPersonTitleDiv");
}

/*
* 编辑
* */
function editPersonTitle(id) {
    console.info("编辑PersonTitle." + id);
    ajaxRun("operation4PersonTitle/editPersonTitle", id, "showPersonTitleDiv");
}

/*
* 显示节点信息
* */
function showPersonTitle(node) {
    if (node) {
        var id = node.attributes[0];
        ajaxRun("operation4PersonTitle/show", id, "showPersonTitleDiv");
    }
}

/*
* 节点被选择。。。
* */
function changeUpNode(node) {
    console.info(jsTitle + "+节点选择......" + node);
    console.info("修改根节点的id...")
}

/*
* 统计函数
* */
function countPersonTitle(title) {
    console.info(jsTitle + "+统计......");
    var total = ajaxCalculate("operation4PersonTitle/count?key=" + title);
    return total
}

/*
* 数据加载函数
* */
function loadPersonTitle(title, page, pageSize) {
    console.info(jsTitle + "+数据加载......" + title + " 第" + page + "页/" + pageSize);
    var params = getParams(page, pageSize);    //getParams必须是放在最最前面！！
    ajaxRun("operation4PersonTitle/list" + params + "&key=" + title, 0, "list" + title + "Div");
}