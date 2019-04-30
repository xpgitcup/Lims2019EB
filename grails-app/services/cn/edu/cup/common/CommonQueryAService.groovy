package cn.edu.cup.common

import cn.edu.cup.system.QueryStatementA
import grails.gorm.transactions.Transactional

@Transactional
class CommonQueryAService {

    def queryStatementAService
    def dataSource

    def listFunction(params) {
        def (controllerName, actionName, GString paramsString, formatString) = genericKey(params)
        println("查询参数：${paramsString}")
        def queryStatement =
                QueryStatementA.findByControllerNameAndActionNameAndParamsStringAndFormatString(controllerName, actionName, paramsString, formatString)
        if (!queryStatement) {
            queryStatement = new QueryStatementA(
                    controllerName: controllerName,
                    actionName: actionName,
                    formatString: formatString,
                    paramsString: paramsString
            )
            queryStatementAService.save(queryStatement)
        }
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
                def ps4Query = processParameters(queryString, params)
                if (queryStatement.isSQL) {
                } else {
                    objectList = QueryStatementA.executeQuery(queryString, ps4Query)
                    result.objectList = objectList
                }
                println("查询结果：${objectList}")
            }
        }
        return result
    }

    def countFunction(params) {
        def count = 1
        // 首先，生成索引参数，用于查找查询语句。
        def (controllerName, actionName, GString paramsString, formatString) = genericKey(params)
        println("统计参数：${paramsString}")
        // 查找记录
        def queryStatement =
                QueryStatementA.findByControllerNameAndActionNameAndParamsStringAndFormatString(controllerName, actionName, paramsString, formatString)
        // 如果没有找到，就创建查询
        if (!queryStatement) {
            queryStatement = new QueryStatementA(
                    controllerName: controllerName,
                    actionName: actionName,
                    formatString: formatString,
                    paramsString: paramsString
            )
            queryStatementAService.save(queryStatement)
            println("创建查询：${paramsString}")
        }
        // 开始执行查询
        if (queryStatement) {
            if (queryStatement.queryString) {
                def queryString = queryStatement.queryString
                println("统计语句：${queryString}")
                def ps4Query = processParameters(queryString, params)
                if (queryStatement.isSQL) {
                    count = 0
                } else {
                    count = QueryStatementA.executeQuery(queryString, ps4Query)
                }
            }
        }
        return count
    }

    private List genericKey(params) {
        def controllerName = params.controller
        def actionName = params.action
        def formatString = params.format
        def paramsString
        def tmpps = [:]
        tmpps.putAll(params)
        tmpps.remove("controller")
        tmpps.remove("action")
        tmpps.remove("format")
        def pk = tmpps.keySet().sort()
        paramsString = "${pk}"
        [controllerName, actionName, paramsString, formatString]
    }

    def processParameters(queryString, params) {
        def ps = [:]
        ps.putAll(params)
        // 首先要删除不需要的各种参数....
        def unUsed = ["controller", "action", "format", "key", "id"]
        unUsed.each { e ->
            ps.remove(e)
        }
        println("处理SQL参数...${ps}")
        return ps
    }

}
