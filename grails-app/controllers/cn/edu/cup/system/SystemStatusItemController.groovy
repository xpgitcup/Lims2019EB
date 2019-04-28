package cn.edu.cup.system

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class SystemStatusItemController {

    SystemStatusItemService systemStatusItemService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond systemStatusItemService.list(params), model:[systemStatusItemCount: systemStatusItemService.count()]
    }

    def show(Long id) {
        respond systemStatusItemService.get(id)
    }

    def create() {
        respond new SystemStatusItem(params)
    }

    def save(SystemStatusItem systemStatusItem) {
        if (systemStatusItem == null) {
            notFound()
            return
        }

        try {
            systemStatusItemService.save(systemStatusItem)
        } catch (ValidationException e) {
            respond systemStatusItem.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'systemStatusItem.label', default: 'SystemStatusItem'), systemStatusItem.id])
                redirect systemStatusItem
            }
            '*' { respond systemStatusItem, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond systemStatusItemService.get(id)
    }

    def update(SystemStatusItem systemStatusItem) {
        if (systemStatusItem == null) {
            notFound()
            return
        }

        try {
            systemStatusItemService.save(systemStatusItem)
        } catch (ValidationException e) {
            respond systemStatusItem.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'systemStatusItem.label', default: 'SystemStatusItem'), systemStatusItem.id])
                redirect systemStatusItem
            }
            '*'{ respond systemStatusItem, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        systemStatusItemService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'systemStatusItem.label', default: 'SystemStatusItem'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'systemStatusItem.label', default: 'SystemStatusItem'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
