package cn.edu.cup.basic

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class CaptionController {

    CaptionService captionService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond captionService.list(params), model:[captionCount: captionService.count()]
    }

    def show(Long id) {
        respond captionService.get(id)
    }

    def create() {
        respond new Caption(params)
    }

    def save(Caption caption) {
        if (caption == null) {
            notFound()
            return
        }

        try {
            captionService.save(caption)
        } catch (ValidationException e) {
            respond caption.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'caption.label', default: 'Caption'), caption.id])
                redirect caption
            }
            '*' { respond caption, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond captionService.get(id)
    }

    def update(Caption caption) {
        if (caption == null) {
            notFound()
            return
        }

        try {
            captionService.save(caption)
        } catch (ValidationException e) {
            respond caption.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'caption.label', default: 'Caption'), caption.id])
                redirect caption
            }
            '*'{ respond caption, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        captionService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'caption.label', default: 'Caption'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'caption.label', default: 'Caption'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
