package cn.edu.cup.operation

import cn.edu.cup.lims.Thing
import cn.edu.cup.lims.ThingTypeCircle

class Operation4TeamTeacherProjectController extends Operation4TeamController {

    protected void prepareParams() {
        // 首先获取当前任务
        def parameters = systemCommonService.getParameters(request)
        def currentTask = "科研任务"

        def myself = session.systemUser.person()
        def currentTitle = session.systemUser.personTitle()

        def thingTypeList
        thingTypeList = ThingTypeCircle.allRelatedProjects(currentTitle)

        switch (params.key) {
            case "我参与的":
                def idlist = []
                thingTypeList.each { e ->
                    idlist.add(e.id)
                }
                params.thingTypeList = idlist
                params.myself = myself.id
                println("我参与：${myself.id} ${idlist}")
                break
            case "我领导的":
                params.thingTypeList = thingTypeList
                params.myself = myself
                break
            case "可选题目":
                params.thingTypeList = thingTypeList
                break
            case "相关团队":
                def currentThing = Thing.get(params.currentThing)
                params.currentThing = currentThing
                params.thingTypeList = thingTypeList
                break
            case "队员列表":
                break
        }
    }

    def index() {}
}
