package cn.edu.cup.system

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class StatusParameterController {

    StatusParameterService statusParameterService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond statusParameterService.list(params), model:[statusParameterCount: statusParameterService.count()]
    }

    def show(Long id) {
        respond statusParameterService.get(id)
    }

    def create() {
        respond new StatusParameter(params)
    }

    def save(StatusParameter statusParameter) {
        if (statusParameter == null) {
            notFound()
            return
        }

        try {
            statusParameterService.save(statusParameter)
        } catch (ValidationException e) {
            respond statusParameter.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'statusParameter.label', default: 'StatusParameter'), statusParameter.id])
                redirect statusParameter
            }
            '*' { respond statusParameter, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond statusParameterService.get(id)
    }

    def update(StatusParameter statusParameter) {
        if (statusParameter == null) {
            notFound()
            return
        }

        try {
            statusParameterService.save(statusParameter)
        } catch (ValidationException e) {
            respond statusParameter.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'statusParameter.label', default: 'StatusParameter'), statusParameter.id])
                redirect statusParameter
            }
            '*'{ respond statusParameter, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        statusParameterService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'statusParameter.label', default: 'StatusParameter'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'statusParameter.label', default: 'StatusParameter'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
