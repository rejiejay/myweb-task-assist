/**
 * UnitTest对外方法:
 * @all 测试所有的接口
 * @other 其他模块 部分接口 测试
 */
import task from './task'
import utils from './utils'

const UnitTest = {
    all: utils.methodHelper({ ...task }),
    task: utils.methodHelper({ ...task })
}

export default UnitTest
