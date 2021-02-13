import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('navigationLink', dataAccessObject)

const getAllNavigationLink = async function getAllNavigationLink() {
    return tableHandle.list('')
}

const NavigationLink = {
    getAllNavigationLink
}

export default NavigationLink
