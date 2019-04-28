package cn.edu.cup.system

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class SystemStatusController {

    SystemStatusService systemStatusService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond systemStatusService.list(params), model:[systemStatusCount: systemStatusService.count()]
    }

    def show(Long id) {
        respond systemStatusService.get(id)
    }

    def create() {
        respond new SystemStatus(params)
    }

    def save(SystemStatus systemStatus) {
        if (systemStatus == null) {
            notFound()
            return
        }

        try {
            systemStatusService.save(systemStatus)
        } catch (ValidationException e) {
            respond systemStatus.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'systemStatus.label', default: 'SystemStatus'), systemStatus.id])
                redirect systemStatus
            }
            '*' { respond systemStatus, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond systemStatusService.get(id)
    }

    def update(SystemStatus systemStatus) {
        if (systemStatus == null) {
            notFound()
            return
        }

        try {
            systemStatusService.save(systemStatus)
        } catch (ValidationException e) {
            respond systemStatus.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'systemStatus.label', default: 'SystemStatus'), systemStatus.id])
                redirect systemStatus
            }
            '*'{ respond systemStatus, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        systemStatusService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'systemStatus.label', default: 'SystemStatus'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'systemStatus.label', default: 'SystemStatus'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
