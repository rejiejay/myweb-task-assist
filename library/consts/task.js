const status = {
    notStarted: {
        serviceValue: 1,
        viewValue: 1,
        viewLable: '未开始'
    },
    design: {
        serviceValue: 2,
        viewValue: 2,
        viewLable: '设计中'
    },
    process: {
        serviceValue: 3,
        viewValue: 3,
        viewLable: '正在进行'
    },
    block: {
        serviceValue: 4,
        viewValue: 4,
        viewLable: '阻塞'
    },
    putOff: {
        serviceValue: 5,
        viewValue: 5,
        viewLable: '推迟'
    },
    completed: {
        serviceValue: 6,
        viewValue: 6,
        viewLable: '完成'
    }
}
const priority = {
    urgentImportant: {
        serviceValue: 1,
        viewValue: 1,
        viewLable: '紧急且重要'
    },
    delayImportant: {
        serviceValue: 2,
        viewValue: 2,
        viewLable: '重要不紧急'
    },
    urgentNormal: {
        serviceValue: 3,
        viewValue: 3,
        viewLable: '紧急不重要'
    },
    delayNormal: {
        serviceValue: 4,
        viewValue: 4,
        viewLable: '不紧急不重要'
    }
}
const sort = {
    default: {
        serviceValue: 1,
        viewValue: 1,
        viewLable: '默认排序'
    },
    time: {
        serviceValue: 1,
        viewValue: 1,
        viewLable: '时间排序'
    },
    random: {
        serviceValue: 2,
        viewValue: 2,
        viewLable: '随机排序'
    }
}

const task = {
    status,
    priority,
    sort
}

export default task
