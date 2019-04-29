package cn.edu.cup.lims

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class CourseController {

    CourseService courseService
    def commonQueryService
    def commonService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        def model = [:]
        def userResult = false
        params.max = Math.min(max ?: 10, 100)
        if (params.title) {
            model.courseTitle = params.title
            userResult = true
        }
        if (params.jsRoutine) {
            model.courseJsRoutine = params.jsRoutine
            userResult = true
        }

        if (userResult) {
            model
        } else {
            respond courseService.list(params), model:[courseCount: courseService.count()]
        }
    }

    def show(Long id) {
        def view = "show"
        if (params.view) {
            view = params.view
        }

        def course = courseService.get(id)

        if (request.xhr) {
            render(template: view, model: [course: course])
        } else {
            respond course
        }
    }

    def create() {
        def view = "create"
        if (params.view) {
            view = params.view
        }

        def course = new Course(params)

        if (request.xhr) {
            render(template: view, model: [course: course])
        } else {
            respond course
        }
    }

    def save(Course course) {

        if (course == null) {
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
            courseService.save(course)
            flash.message = message(code: 'default.created.message', args: [message(code: 'course.label', default: 'Course'), course.id])
        } catch (ValidationException e) {
            flash.message = course.errors
        }

        withFormat {
            js { render "alert('course创建成功!')" }

            json { render course as JSON }

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

        def course = courseService.get(id)

        if (request.xhr) {
            render(template: view, model: [course: course])
        } else {
            respond course
        }
    }

    def update(Course course) {
        if (course == null) {
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
            courseService.save(course)
            flash.message = message(code: 'default.updated.message', args: [message(code: 'course.label', default: 'Course'), course.id])
        } catch (ValidationException e) {
            flash.message = course.errors
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

        courseService.delete(id)
        flash.message = message(code: 'default.deleted.message', args: [message(code: 'course.label', default: 'Course'), id])

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
        def result = commonQueryService.listFunction(params)
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
        def count = commonQueryService.countFunction(params)
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
        def objectList = commonService.importObjectArrayFromJsonFileName(fileName, Course.class)
        if (objectList.size()>0) {
            // 先清空
            Course.list().each { e ->
                courseService.delete(e.id)
            }
            objectList.each { e ->
                courseService.save(e)
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

       def fjson = commonService.exportObjects2JsonString(Course.list())
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
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'course.label', default: 'Course'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
