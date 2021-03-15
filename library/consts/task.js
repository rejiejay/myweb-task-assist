import TimeHelper from './../../utils/time-helper'

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

const effectTimestampRange = {
    default: {
        serviceValue: null,
        viewValue: null,
        viewLable: 'Nil'
    },
    halfWeek: {
        serviceValue: TimeHelper.dayTimestamp * 3.5,
        viewValue: 1,
        viewLable: '半周'
    },
    oneWeek: {
        serviceValue: TimeHelper.dayTimestamp * 7,
        viewValue: 2,
        viewLable: '一周'
    },
    doubleWeek: {
        serviceValue: TimeHelper.dayTimestamp * 14,
        viewValue: 3,
        viewLable: '两周'
    },
    oneMonth: {
        serviceValue: TimeHelper.monthTimestamp,
        viewValue: 4,
        viewLable: '一个月'
    },
    doubleMonth: {
        serviceValue: TimeHelper.monthTimestamp * 2,
        viewValue: 5,
        viewLable: '二个月'
    },
    oneQuarterly: {
        serviceValue: TimeHelper.monthTimestamp * 3,
        viewValue: 6,
        viewLable: '一个季度'
    },
    halfYear: {
        serviceValue: TimeHelper.monthTimestamp * 6,
        viewValue: 7,
        viewLable: '半年'
    },
    oneYear: {
        serviceValue: TimeHelper.yearTimestamp,
        viewValue: 8,
        viewLable: '一年'
    },
    doubleYear: {
        serviceValue: TimeHelper.yearTimestamp * 2,
        viewValue: 9,
        viewLable: '两年'
    }
}

const task = {
    status,
    priority,
    sort,
    effectTimestampRange
}

export default task
