//全局变量定义
var treeViewSystemAttributeUl;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    treeViewSystemAttributeUl = $("#treeViewSystemAttributeUl");

    treeViewSystemAttributeUl.tree({
        url: "operation4SystemAttribute/getTreeViewData",
        onSelect: function (node) {
            console.info("树形结构节点选择：" + node.target.id);
            sessionStorage.setItem("currentNode" + document.title, node.target.id);
            treeNodeSelectedSystemAttribute(node);
        },
        onLoadSuccess: function () {
            var cnodeid = readStorage("currentNode" + document.title, 0);
            console.info("上一次：" + cnodeid);
            treeViewSystemAttributeUl.tree("collapseAll");
            if (cnodeid != 0) {
                console.info("扩展到：" + cnodeid);
                var cnode = $("#" + cnodeid);
                treeViewSystemAttributeUl.tree("expandTo", cnode);
                treeViewSystemAttributeUl.tree("select", cnode);
            }
        }
    })
});

/*
* 节点选择
* */
function treeNodeSelectedSystemAttribute(node) {
    console.info("选择" + node);
    if (node) {
        var id = node.attributes[0];
        ajaxRun("operation4SystemAttribute/show", id, "showSystemAttributeDiv");
    }

    $("#createSystemAttribute").attr('href', 'javascript: createSystemAttribute(' + node.attributes[0] + ')');
    console.info("当前节点：" + node.target.id);
    $.cookie("currentSystemAttribute", node.target.id);
}

/*
* 新建
* */
function createSystemAttribute(id) {
    console.info("创建SystemAttribute. 上级节点：" + id);
    ajaxRun("operation4SystemAttribute/createSystemAttribute", id, "showSystemAttributeDiv");
}

/*
* 编辑
* */
function editSystemAttribute(id) {
    console.info("编辑SystemAttribute." + id);
    ajaxRun("operation4SystemAttribute/edit", id, "showSystemAttributeDiv");
}

