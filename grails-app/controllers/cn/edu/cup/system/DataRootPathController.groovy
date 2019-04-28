package cn.edu.cup.system

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class DataRootPathController {

    DataRootPathService dataRootPathService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond dataRootPathService.list(params), model:[dataRootPathCount: dataRootPathService.count()]
    }

    def show(Long id) {
        respond dataRootPathService.get(id)
    }

    def create() {
        respond new DataRootPath(params)
    }

    def save(DataRootPath dataRootPath) {
        if (dataRootPath == null) {
            notFound()
            return
        }

        try {
            dataRootPathService.save(dataRootPath)
        } catch (ValidationException e) {
            respond dataRootPath.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'dataRootPath.label', default: 'DataRootPath'), dataRootPath.id])
                redirect dataRootPath
            }
            '*' { respond dataRootPath, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond dataRootPathService.get(id)
    }

    def update(DataRootPath dataRootPath) {
        if (dataRootPath == null) {
            notFound()
            return
        }

        try {
            dataRootPathService.save(dataRootPath)
        } catch (ValidationException e) {
            respond dataRootPath.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'dataRootPath.label', default: 'DataRootPath'), dataRootPath.id])
                redirect dataRootPath
            }
            '*'{ respond dataRootPath, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        dataRootPathService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'dataRootPath.label', default: 'DataRootPath'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'dataRootPath.label', default: 'DataRootPath'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
