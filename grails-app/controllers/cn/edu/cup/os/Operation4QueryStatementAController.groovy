package cn.edu.cup.os

import cn.edu.cup.system.QueryStatementAController

import java.text.SimpleDateFormat

class Operation4QueryStatementAController extends QueryStatementAController {

    def exportToJsonFileName() {
        def now = new Date()
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh-mm")
        def fileName = "${params.fileName} ${df.format(now)}.json"
        commonService.exportObjectsToJsonFileName(queryStatementService.list(), fileName)
        redirect(action: "index")
    }

    def index() {}
}
