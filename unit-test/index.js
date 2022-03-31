/**
 * UnitTest对外方法:
 * @all 测试所有的接口
 * @other 其他模块 部分接口 测试
 */
import auth from './auth'
import taskDetail from './task-detail'
import taskList from './task-list'
import taskTag from './task-tag'
import longTerm from './long-term'
import longTermProgram from './long-term-program'
import taskTermList from './task-term-list'

import utils from './utils'

const UnitTest = {
    all: utils.methodHelper({
        ...auth,
        ...taskDetail,
        ...taskList,
        ...taskTag,
        ...longTerm,
        ...longTermProgram,
        ...taskTermList,
    }),
    auth: utils.methodHelper({ ...auth }),
    taskDetail: utils.methodHelper({ ...taskDetail }),
    taskList: utils.methodHelper({ ...taskList }),
    taskTag: utils.methodHelper({ ...taskTag }),
    longTerm: utils.methodHelper({ ...longTerm }),
    longTermProgram: utils.methodHelper({ ...longTermProgram }),
    taskTermList: utils.methodHelper({ ...taskTermList }),
}

export default UnitTest
