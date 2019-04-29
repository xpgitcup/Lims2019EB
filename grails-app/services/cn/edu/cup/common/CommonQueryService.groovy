package cn.edu.cup.common

import cn.edu.cup.system.QueryStatementA
import grails.gorm.transactions.Transactional

@Transactional
class CommonQueryService {

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
    }

    def countFunction(params) {
        def (controllerName, actionName, GString paramsString, formatString) = genericKey(params)
        println("统计参数：${paramsString}")
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

}
