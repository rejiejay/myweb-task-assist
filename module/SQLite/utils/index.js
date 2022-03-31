import StringHelper from './../../../view/utils/string-helper'
import NumberHelper from './../../../utils/number-helper'
import const_progress from './../../../view/consts/progress'
import const_priority from './../../../view/consts/priority'

export const cn = NumberHelper.createRandomNum;
export const csl = StringHelper.createRandomStr;
export const cs = () => csl({ length: cn() })
export const cb = (probability = 50) => cn() < probability;

const getItemByRandomly = list => {
    if (list.length < 1) {
        return null;
    }

    if (list.length === 1) {
        return list[0];
    }

    const index = cn(list.length - 1)
    return list[index]
}

let longTermPrograms = [];
const createLongTermDetailProgram = (parentId = cs()) => {
    const nowTimestamp = new Date().getTime()
    const id = cs()

    return {
        id,
        longTermProgramId: id,
        parentId,
        name: 'LongTermProgram' + cs(),
        operationalPosition: cn(nowTimestamp), // for sort
    }
}

let longTerm = [];
const createLongTerm = () => {
    const nowTimestamp = new Date().getTime()
    const id = cs()
    const programs = [];
    const count = cn(5) + 1;
    for (let index = 0; index < count; index++) {
        const program = createLongTermDetailProgram(id)
        longTermPrograms.push(program)
        programs.push(program)
    }

    return {
        id,
        longTermId: id,
        name: 'LongTerm' + cs(),
        description: 'LongTermDescription' + cs(),
        programs,
        operationalPosition: cn(nowTimestamp), // for sort
    }
}

const initLongTerm = () => {
    const count = cn(15) + 1;
    const newLongTerm = [];
    for (let index = 0; index < count; index++) {
        newLongTerm.push(createLongTerm())
    }

    longTerm = newLongTerm;

    return newLongTerm
}

const getLongTermRandomly = () => {
    if (longTerm.length <= 0) {
        longTerm = initLongTerm();
    }

    return getItemByRandomly(longTerm)
}

export const createItem = () => {
    const nowTimestamp = new Date().getTime()
    const ct = () => nowTimestamp + cn(nowTimestamp)
    const minutTimestamp = 1000 * 60
    const hourTimestamp = minutTimestamp * 60
    const dayTimestamp = hourTimestamp * 24
    const yearTimestamp = dayTimestamp * 400;

    const { longTermId, longTermName } = (() => {
        let longTermId = '';
        let longTermName = '';
        const isLongTerm = cb(30);
        const myLongTerm = getLongTermRandomly();

        if (isLongTerm && myLongTerm) {
            longTermId = myLongTerm.id;
            longTermName = myLongTerm.name;
        }

        return {
            longTermId,
            longTermName,
        }
    })();

    const deadlineTimestamp = (() => {
        const haveDeadline = cb(60);
        if (!haveDeadline) {
            return ''
        }

        const isWithinThreeDay = cb(30);
        if (isWithinThreeDay) {
            return nowTimestamp + cn(dayTimestamp * 3)
        }

        const isWithinWeek = cb(50);
        if (isWithinWeek) {
            return nowTimestamp + cn(dayTimestamp * 7)
        }

        return nowTimestamp + cn(yearTimestamp)
    })()

    const progress = (() => {
        const isNew = cb(40);
        const isHandle = cb(50);

        if (isNew) {
            return ''
        }

        if (isHandle) {
            return 'handle'
        }

        const progressArray = Object.values(const_progress.values)
        return progressArray[cn(progressArray.length - 1)]
    })()

    const priority = (() => {
        const havePriority = cb(20);
        const isImportantDelayed = cb(50);

        if (!havePriority) {
            return ''
        }

        if (isImportantDelayed) {
            return 'importantDelayed'
        }

        const priorityArray = Object.values(const_priority.values)
        return priorityArray[cn(priorityArray.length - 1)]
    })()

    const readCount = (() => {
        const haveRead = cb(80);

        if (haveRead) {
            return 0
        }


        return cn(300)
    })()

    const id = cs()

    return {
        id,
        taskId: id,

        title: `${longTermId ? '长期-' : ''}任务标题${longTermId ? longTermName : cs()}`,
        content: '内容' + cs(),

        specific: cb(20) ? `specific${cs()}` : '',
        measurable: cb(20) ? `measurable${cs()}` : '',
        attainable: cb(20) ? `attainable${cs()}` : '',
        relevant: cb(20) ? `relevant${cs()}` : '',
        timeBound: cb(20) ? `timeBound${cs()}` : '',

        longTermId,
        longTermName,
        longTermProgramId: '', // for categorized program

        deadlineTimestamp,
        tag: cb(10) ? `标签-${csl({ length: cn(10) + 5 })}` : '',
        progress,
        priority,

        createTimestamp: nowTimestamp, // useless
        updateTimestamp: ct(), // for sort quick-recall recently
        completedTimestamp: '',
        readCount, // for sort quick-recall recently
        operationalPosition: cn(nowTimestamp), // for sort un-categorized
    }
}

let data = [];

const init = () => {
    const myLongTerm = initLongTerm();
    const count = cn(myLongTerm.length * 15) + cn(30) + 1;
    const myData = [];
    for (let index = 0; index < count; index++) {
        myData.push(createItem())
    }

    data = myData;

    return myData;
}

export const getData = () => {
    if (data.length <= 0) {
        return init();
    }

    return data;
}

export const getLongTerm = () => {
    if (longTerm.length <= 0) {
        return initLongTerm();
    }

    return longTerm;
}

export const getLongTermData = () => {
    if (data.length <= 0) {
        return init();
    }

    return data.filter(item => !!item.longTermId);
}

export const getDataByCount = (count) => {
    const data = getData();
    if (count > data.length) {
        return data;
    }

    const spliceData = []
    for (let index = 0; index < count; index++) {
        spliceData.push(data[index]);
    }

    return spliceData;
}

export const getUnCategorizedMock = () => {
    const data = getData();

    return data.filter(item => {
        if (item.longTermId) {
            return false;
        }
        if (item.deadlineTimestamp) {
            return false;
        }
        return true;
    });
}

export const getDeadlineMock = () => {
    const data = getData();

    return data.filter(item => {
        if (item.longTermId) {
            return false;
        }
        if (item.deadlineTimestamp) {
            return true;
        }
        return false;
    });
}

export const getAllMockData = () => {
    if (data.length <= 0) {
        init();
    }

    return {
        longTerm,
        longTermPrograms,
        data
    };
}
