package cn.edu.cup.common

import cn.edu.cup.system.QueryStatementA
import grails.gorm.transactions.Transactional

@Transactional
class CommonQueryAService {

    def queryStatementAService
    def dataSource

    /*
    列表查询功能
    * */

    def listFunction(params) {
        def (QueryStatementA queryStatement, leftParams) = findOrCreateQueryString(params)
        // 开始执行查询
        def result = [:]
        def objectList
        // 设置缺省参数
        result.view = "default"
        if (queryStatement) {
            if (queryStatement.queryString) {
                // 处理视图
                if (queryStatement.viewName) {
                    result.view = queryStatement.viewName
                }
                // 执行查询
                def queryString = queryStatement.queryString
                println("列表查询：${queryString}")
                if (queryStatement.isSQL) {
                } else {
                    objectList = QueryStatementA.executeQuery(queryString, leftParams)
                    result.objectList = objectList
                }
                println("查询结果：${objectList}")
            }
        }
        return result
    }

    /*
    统计功能
    * */

    def countFunction(params) {
        def count = 1
        def (QueryStatementA queryStatement, leftParams) = findOrCreateQueryString(params)
        // 开始执行查询
        if (queryStatement) {
            if (queryStatement.queryString) {
                def queryString = queryStatement.queryString
                println("统计语句：${queryString}")
                if (queryStatement.isSQL) {
                    count = 0
                } else {
                    count = QueryStatementA.executeQuery(queryString, leftParams)
                }
            }
        }
        return count
    }

    /*
    找到或者创建查询语句
    * */

    private List findOrCreateQueryString(params) {
        def (controllerName,
             actionName,
             paramsString,
             formatString,
             keyString,
             leftParams
        ) = genericKey(params)

        println("查询参数：${paramsString}")
        def queryStatement =
                QueryStatementA.findByControllerNameAndActionNameAndKeyStringAndParamsString(
                        controllerName, actionName, keyString, paramsString)
        if (!queryStatement) {
            queryStatement = new QueryStatementA(
                    controllerName: controllerName,
                    actionName: actionName,
                    keyString: keyString,
                    formatString: formatString,
                    paramsString: paramsString
            )
            queryStatementAService.save(queryStatement)
        }
        [queryStatement, leftParams]
    }

    /*
    处理参数，先找到查询语句的关键字，形成用于查询的参数列表
    * */

    private List genericKey(params) {
        def controllerName = params.controller
        def actionName = params.action
        def formatString = params.format
        def keyString = params.key
        def paramsString

        def tmpps = [:]
        tmpps.putAll(params)
        def unUsed = ["controller", "action", "format", "key", "id"]
        unUsed.each { e ->
            tmpps.remove(e)
        }
        def pk = tmpps.keySet().sort()
        paramsString = "${pk}"
        [controllerName, actionName, paramsString, formatString, keyString, tmpps]
    }

}
