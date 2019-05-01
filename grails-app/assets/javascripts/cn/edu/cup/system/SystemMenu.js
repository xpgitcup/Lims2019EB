//全局变量定义
var treeViewSystemMenuUl;

$(function () {

    console.info("加载..." + document.title);

    //变量获取
    treeViewSystemMenuUl = $("#treeViewSystemMenuUl");

    treeViewSystemMenuUl.tree({
        url: "operation4SystemMenu/getTreeViewData",
        onSelect: function (node) {
            console.info("树形结构节点选择：" + node.target.id);
            sessionStorage.setItem("currentNode" + document.title, node.target.id);
            treeNodeSelectedSystemMenu(node);
        },
        onLoadSuccess: function () {
            var cnodeid = readStorage("currentNode" + document.title, 0);
            console.info("上一次：" + cnodeid);
            treeViewSystemMenuUl.tree("collapseAll");
            if (cnodeid != 0) {
                console.info("扩展到：" + cnodeid);
                var cnode = $("#" + cnodeid);
                treeViewSystemMenuUl.tree("expandTo", cnode);
                treeViewSystemMenuUl.tree("select", cnode);
            }
        }
    })
});

/*
* 节点选择
* */
function treeNodeSelectedSystemMenu(node) {
    console.info("选择" + node);
    if (node) {
        $("#createSystemMenu").attr('href', 'javascript: createSystemMenu(' + node.attributes[0] + ')');
        var id = node.attributes[0];
        ajaxRun("operation4SystemMenu/getSystemMenu", id, "showSystemMenuDiv");
    }
}

/*
 * 新建
 * */
function createSystemMenu(id) {
    console.info("创建SystemMenu. 上级节点：" + id);
    ajaxRun("operation4SystemMenu/createSystemMenu", id, "showSystemMenuDiv");
}

/*
 * 编辑
 * */
function editSystemMenu(id) {
    console.info("编辑SystemMenu." + id);
    ajaxRun("operation4SystemMenu/edit", id, "showSystemMenuDiv");
}