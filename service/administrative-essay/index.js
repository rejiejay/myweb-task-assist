import SQLite from './../../module/SQLite/index.js'
import consequencer from './../../utils/consequencer'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('administrative_aptitude_essay_helper', dataAccessObject)

const getList = async function getList({ categorys, isRandom, pageNo }) {
    const sqlHandle = new SQLite.SqlHandle()
    const pageSize = 9;

    if (categorys) {
        categorys.forEach(category => {
            sqlHandle.addOrFilterSql(`category = "${category}"`)
        });
    }

    if (isRandom) {
        sqlHandle.addOrderByRandom(pageSize)
    } else {
        const isASC = false
        sqlHandle.addOrder('timestamp', isASC)
        sqlHandle.addPagination(pageNo, pageSize)
    }

    return tableHandle.list(sqlHandle.toSqlString())
}

const getCount = async function getCount({ categorys }) {
    const sqlHandle = new SQLite.SqlHandle()

    if (categorys) {
        categorys.forEach(category => {
            sqlHandle.addOrFilterSql(`category = "${category}"`)
        });
    }

    const queryInstance = await tableHandle.query(`SELECT COUNT(id) FROM administrative_aptitude_essay_helper ${sqlHandle.toSqlString()}`)
    if (queryInstance.result !== 1) return queryInstance
    let result
    try {
        const query = queryInstance.data[0]
        const count = query.values[0][0]
        result = count
    } catch (error) {
        return consequencer.error(`${error}`)
    }
    return consequencer.success(result)
}

const getById = async function getById(id) {
    const findInstance = await tableHandle.find(id)
    return findInstance
}

const getOneRandom = async function getOneRandom() {
    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addOrderByRandom(1)
    return tableHandle.list(sqlHandle.toSqlString())
}

const addRecord = async function addRecord({ title, content, category }) {
    const addData = {
        title,
        content,
        category,
        timestamp: new Date().getTime()
    }
    const addInstance = await tableHandle.add(addData)
    if (addInstance.result !== 1) return addInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`title = "${title}"`)
    sqlHandle.addAndFilterSql(`content = "${content}"`)
    sqlHandle.addAndFilterSql(`timestamp = ${addData.timestamp}`)
    const queryInstance = await tableHandle.list(sqlHandle.toSqlString())
    if (queryInstance.result !== 1) return queryInstance
    const queryData = queryInstance.data
    if (queryData.length <= 0) return consequencer.error('新增成功, 但是查询数据失败')
    const requestAddData = queryData[0]

    return await this.getById(requestAddData.id)
}

const editRecord = async function editRecord({ id, title, content, category }) {
    const findInstance = await tableHandle.find(id)
    if (findInstance.result !== 1) return findInstance

    const editInstance = await tableHandle.updata(id, { title, content, category })
    if (editInstance.result !== 1) return editInstance

    return await this.getById(id)
}

const deleteRecord = async function deleteRecord(id) {
    const findInstance = await tableHandle.find(id)
    if (findInstance.result !== 1) return findInstance
    return tableHandle.del(id)
}

const AdministrativeAptitudeEssayHelper = {
    getList,
    getCount,
    getById,
    getOneRandom,
    addRecord,
    editRecord,
    deleteRecord,
}

export default AdministrativeAptitudeEssayHelper