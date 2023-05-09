import { ProjectList, TaskList } from "~/_type/type"
import { getTaskForShow } from "./parse"

const task: TaskList = [
    {
        name: 'タスク1',
        id: '202305081',
        timestamp: 1000001,
        importance: 3,
        urgency: 2,
        personalPriority: 5.5,
        status: 'not started',
        about: undefined,
        projectId: '202305081',
        totalPriority: 15.5,
    },
    {
        name: 'タスク2-1',
        id: '202305082',
        timestamp: 1000003,
        importance: 1,
        urgency: 3,
        personalPriority: 3,
        status: 'not started',
        about: undefined,
        projectId: '202305083',
        totalPriority: 13.5,
    },
    {
        name: 'タスク2-2',
        id: '202305082',
        timestamp: 1000002,
        importance: 1,
        urgency: 3,
        personalPriority: 3,
        status: 'not started',
        about: undefined,
        projectId: '202305085',
        totalPriority: 13.5,
    },
    {
        name: 'タスク3',
        id: '202305083',
        timestamp: 1000013,
        importance: 5,
        urgency: 5,
        personalPriority: 10,
        status: 'not started',
        about: undefined,
        projectId: '202305083',
        totalPriority: 12,
    },
]

const project: ProjectList = [
    {
        name: 'プロジェクト1',
        id: '202305081',
        timestamp: 1000003,
        importance: 3,
        urgency: 2,
        personalPriority: 5.5,
        status: 'not started',
        about: undefined,
    },
    {
        name: 'プロジェクト2-1',
        id: '202305082',
        timestamp: 1000013,
        importance: 3,
        urgency: 1,
        personalPriority: 5,
        status: 'not started',
        about: undefined,
    },
    {
        name: 'プロジェクト2-2',
        id: '202305083',
        timestamp: 1000003,
        importance: 3,
        urgency: 1,
        personalPriority: 5,
        status: 'not started',
        about: undefined,
    },
    {
        name: 'プロジェクト3',
        id: '202305084',
        timestamp: 1000003,
        importance: 5,
        urgency: 2,
        personalPriority: 8.5,
        status: 'not started',
        about: undefined,
    },
]

const getName = () => {
    const list = getTaskForShow(task)(project)
    console.log(list.map(value => [value.name, value.projectName]))
}

test('getname', () => {
    getName()
})