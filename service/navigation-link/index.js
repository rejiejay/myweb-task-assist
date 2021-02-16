import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'
import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('navigationLink', dataAccessObject)

const getAllNavigationLink = async function getAllNavigationLink() {
    const linkInstance = await tableHandle.list('')
    if (linkInstance.result !== 1) return linkInstance
    const links = linkInstance.data

    const sqlHandle = new SQLite.SqlHandle()
    const navigationLink = sqlHandle.tableToNodeTreeConver(links)

    return consequencer.success(navigationLink)
}

const addNavigationLink = async function addNavigationLink({ topic, filterJson }) {
    const uniquelyIdentify = StringHelper.createRandomStr({ length: 32 })
    const parentUniquelyIdentify = 'root'

    const addInstance = await tableHandle.add({ uniquelyIdentify, parentUniquelyIdentify, topic, filterJson })
    if (addInstance.result !== 1) return addInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`uniquelyIdentify = "${uniquelyIdentify}"`)
    const queryInstance = await tableHandle.list(sqlHandle.toSqlString())
    if (queryInstance.result !== 1) return queryInstance
    const queryData = queryInstance.data
    if (queryData.length <= 0) return consequencer.error('新增失败')

    const requestAddData = queryData[0]
    return consequencer.success(requestAddData)
}

const editNavigationLink = async function editNavigationLink({ id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson }) {
    const addInstance = await tableHandle.updata(id, { uniquelyIdentify, parentUniquelyIdentify, topic, filterJson })
    if (addInstance.result !== 1) return addInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`id = ${id}`)
    const queryInstance = await tableHandle.list(sqlHandle.toSqlString())
    if (queryInstance.result !== 1) return queryInstance
    const queryData = queryInstance.data
    if (queryData.length <= 0) return consequencer.error('编辑失败')

    const requestAddData = queryData[0]
    return consequencer.success(requestAddData)
}

const deleteNavigationLink = async function deleteNavigationLink(id) {
    const deleteInstance = await tableHandle.del(id)
    return deleteInstance
}

const NavigationLink = {
    getAllNavigationLink,
    addNavigationLink,
    editNavigationLink,
    deleteNavigationLink
}

export default NavigationLink
