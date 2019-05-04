package cn.edu.cup.operation

import cn.edu.cup.lims.TeamController

class Operation4TeamTeacherCourseController extends TeamController {

    def index() {
        model:[currentTask: "教学任务"]
    }
}
