/**
 * UnitTest对外方法:
 * @all 测试所有的接口
 * @other 其他模块 部分接口 测试
 */
import task from './task'
import tags from './tags'
import auth from './auth'
import longTerm from './long-term'
import NavigationLink from './navigation-link'
import sql from './sql'

import utils from './utils'

const UnitTest = {
    all: utils.methodHelper({
        ...task,
        ...tags,
        ...auth,
        ...longTerm,
        ...NavigationLink,
        ...sql
    }),
    tags: utils.methodHelper({ ...tags }),
    task: utils.methodHelper({ ...task }),
    auth: utils.methodHelper({ ...auth }),
    longTerm: utils.methodHelper({ ...longTerm }),
    NavigationLink: utils.methodHelper({ ...NavigationLink }),
    sql: utils.methodHelper({ ...sql })
}

export default UnitTest
