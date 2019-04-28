package cn.edu.cup.lims

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ProjectPlanController {

    ProjectPlanService projectPlanService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond projectPlanService.list(params), model:[projectPlanCount: projectPlanService.count()]
    }

    def show(Long id) {
        respond projectPlanService.get(id)
    }

    def create() {
        respond new ProjectPlan(params)
    }

    def save(ProjectPlan projectPlan) {
        if (projectPlan == null) {
            notFound()
            return
        }

        try {
            projectPlanService.save(projectPlan)
        } catch (ValidationException e) {
            respond projectPlan.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'projectPlan.label', default: 'ProjectPlan'), projectPlan.id])
                redirect projectPlan
            }
            '*' { respond projectPlan, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond projectPlanService.get(id)
    }

    def update(ProjectPlan projectPlan) {
        if (projectPlan == null) {
            notFound()
            return
        }

        try {
            projectPlanService.save(projectPlan)
        } catch (ValidationException e) {
            respond projectPlan.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'projectPlan.label', default: 'ProjectPlan'), projectPlan.id])
                redirect projectPlan
            }
            '*'{ respond projectPlan, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        projectPlanService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'projectPlan.label', default: 'ProjectPlan'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'projectPlan.label', default: 'ProjectPlan'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
