package cn.edu.cup.system

class QueryStatementA {

    String controllerName
    String actionName
    String formatString
    String paramsString
    String queryString
    String viewName
    boolean isSQL = false

    static constraints = {
        controllerName(nullable: false)
        actionName(nullable: false)
        formatString(nullable: true)
        paramsString(nullable: true)
        queryString(nullable: true)
        viewName(nullable: true)
        isSQL()
    }

    String toString() {
        return "${controllerName}.${actionName}.${paramsString}"
    }
}
