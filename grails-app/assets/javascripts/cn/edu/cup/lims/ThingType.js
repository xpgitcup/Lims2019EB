//全局变量定义
var treeViewThingTypeUl;

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
});

/*
* 节点选择
* */
function treeNodeSelectedThingType(node) {
    console.info("选择" + node);
    $("#createItem").attr('href', 'javascript: createItem(' + node.attributes[0] + ')');
    $("#createItem").html("创建" + node.attributes[0] + '的子节点');
    $("#editItem").attr('href', 'javascript: editItem(' + node.attributes[0] + ')');
    $("#editItem").html("编辑" + node.attributes[0] + '节点');
    $("#currentTitle").html(node.text);
    showThingType(node);
}

function deleteItem(id) {
    console.info("删除：" + id);
    ajaxExecuteWithMethod("operation4ThingType/delete?id=" + id, 'DELETE');
    console.info("删除：" + id + "了！");
    location.reload();
}

function editItem(id) {
    //var title = getCurrentTabTitle(operation4ThingTypeDiv);
    ajaxRun("operation4ThingType/edit", id, "showThingTypeDiv");
}

function createItem(id) {
    //var title = getCurrentTabTitle(operation4ThingTypeDiv);
    //ajaxRun("operation4ThingType/create/?upTitle=" + id, 0, "list" + title + "Div");
    ajaxRun("operation4ThingType/create?upType=" + id, 0, "showThingTypeDiv");
}

function createProject(id) {
    //var title = getCurrentTabTitle(operation4ThingTypeDiv);
    //ajaxRun("operation4ThingType/create/?upTitle=" + id, 0, "list" + title + "Div");
    ajaxRun("operation4ThingType/createProject", id, "showThingTypeDiv");
}

function createCourse(id) {
    //var title = getCurrentTabTitle(operation4ThingTypeDiv);
    //ajaxRun("operation4ThingType/create/?upTitle=" + id, 0, "list" + title + "Div");
    ajaxRun("operation4ThingType/createCourse", id, "showThingTypeDiv");
}

/*
* 显示节点信息
* */
function showThingType(node) {
    if (node) {
        var id = node.attributes[0];
        ajaxRun("operation4ThingType/show", id, "showThingTypeDiv");
    }
}
