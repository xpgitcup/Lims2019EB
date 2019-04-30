package cn.edu.cup.system

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class QueryStatementAController {

    QueryStatementAService queryStatementAService
    def commonQueryAService
    def commonService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        def model = [:]
        def userResult = false
        params.max = Math.min(max ?: 10, 100)
        if (params.title) {
            model.queryStatementATitle = params.title
            userResult = true
        }
        if (params.jsRoutine) {
            model.queryStatementAJsRoutine = params.jsRoutine
            userResult = true
        }

        if (userResult) {
            model
        } else {
            respond queryStatementAService.list(params), model:[queryStatementACount: queryStatementAService.count()]
        }
    }

    def show(Long id) {
        def view = "show"
        if (params.view) {
            view = params.view
        }

        def queryStatementA = queryStatementAService.get(id)

        if (request.xhr) {
            render(template: view, model: [queryStatementA: queryStatementA])
        } else {
            respond queryStatementA
        }
    }

    def create() {
        def view = "create"
        if (params.view) {
            view = params.view
        }

        def queryStatementA = new QueryStatementA(params)

        if (request.xhr) {
            render(template: view, model: [queryStatementA: queryStatementA])
        } else {
            respond queryStatementA
        }
    }

    def save(QueryStatementA queryStatementA) {

        if (queryStatementA == null) {
            notFound()
            return
        }

        def action = "index"
        if (params.nextAction) {
            action = params.nextAction
        }

        def controller = params.controller
        if (params.nextController) {
            controller = params.nextController
        }

        try {
            queryStatementAService.save(queryStatementA)
            flash.message = message(code: 'default.created.message', args: [message(code: 'queryStatementA.label', default: 'QueryStatementA'), queryStatementA.id])
        } catch (ValidationException e) {
            flash.message = queryStatementA.errors
        }

        withFormat {
            js { render "alert('queryStatementA创建成功!')" }

            json { render queryStatementA as JSON }

            '*' {
                if (params.url) {
                    redirect(params.url)
                } else {
                    redirect(controller: controller, action: action, params: params)
                }
            }
        }

    }

    def edit(Long id) {
        def view = "edit"
        if (params.view) {
            view = params.view
        }

        def queryStatementA = queryStatementAService.get(id)

        if (request.xhr) {
            render(template: view, model: [queryStatementA: queryStatementA])
        } else {
            respond queryStatementA
        }
    }

    def update(QueryStatementA queryStatementA) {
        if (queryStatementA == null) {
            notFound()
            return
        }

        def action = "index"
        if (params.nextAction) {
            action = params.nextAction
        }

        def controller = ""
        if (params.nextController) {
            controller = params.nextController
        }

        try {
            queryStatementAService.save(queryStatementA)
            flash.message = message(code: 'default.updated.message', args: [message(code: 'queryStatementA.label', default: 'QueryStatementA'), queryStatementA.id])
        } catch (ValidationException e) {
            flash.message = queryStatementA.errors
        }

        if (controller == "")
        {
            redirect(action: action)
        } else {
            redirect(controller: controller, action: action)
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        queryStatementAService.delete(id)
        flash.message = message(code: 'default.deleted.message', args: [message(code: 'queryStatementA.label', default: 'QueryStatementA'), id])

        def action = "index"
        if (params.nextAction) {
            action = params.nextAction
        }

        def controller = ""
        if (params.nextController) {
            controller = params.nextController
        }

        if (controller == "")
        {
            redirect(action: action)
        } else {
            redirect(controller: controller, action: action)
        }
    }

    def list() {
        prepareParams()
        def result = commonQueryAService.listFunction(params)
        result = processResult(result, params)
        def view = result.view
        flash.message = result.message
        if (request.xhr) {
            render(template: view, model: [objectList: result.objectList, flash: flash])
        } else {
            respond result.objectList
        }
    }

    def count() {
        prepareParams()
        def count = commonQueryAService.countFunction(params)
        def result = [count: count]

        if (request.xhr) {
            render result as JSON
        } else {
            result
        }
    }

    protected void prepareParams() {}

    protected def processResult(result, params) {
        return result
    }

    def importFromJsonFile() {

        def fileName = "${commonService.webRootPath}/${params.fileName}"
        def objectList = commonService.importObjectArrayFromJsonFileName(fileName, QueryStatementA.class)
        if (objectList.size()>0) {
            // 先清空
            QueryStatementA.list().each { e ->
                queryStatementAService.delete(e.id)
            }
            objectList.each { e ->
                queryStatementAService.save(e)
            }
        }

        def action = "index"
        if (params.nextAction) {
           action = params.nextAction
         }

        def controller = ""
        if (params.nextController) {
            controller = params.nextController
        }

        if (controller == "") {
            redirect(action: action)
        } else {
            redirect(controller: controller, action: action)
        }
    }

    def exportToJsonFile() {

        def fileName = "${commonService.webRootPath}/${params.fileName}"

       def fjson = commonService.exportObjects2JsonString(QueryStatementA.list())
        def printer = new File(fileName).newPrintWriter('utf-8')    //写入文件
        printer.println(fjson)
        printer.close()

        def action = "index"
        if (params.nextAction) {
            action = params.nextAction
        }

        def controller = ""
        if (params.nextController) {
            controller = params.nextController
        }

        if (controller == "")
        {
            redirect(action: action)
        } else {
            redirect(controller: controller, action: action)
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'queryStatementA.label', default: 'QueryStatementA'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
