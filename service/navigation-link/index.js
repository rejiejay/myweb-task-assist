import consequencer from './../../utils/consequencer'
import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('navigationLink', dataAccessObject)

const getAllNavigationLink = async function getAllNavigationLink() {
    const linkInstance = await tableHandle.list('')
    if (linkInstance.result !== 1) return linkInstance
    const links = linkInstance.data

    const findChildren = link => {
        const children = []

        const findLinks = JSON.parse(JSON.stringify(links.filter(link => link.parentUniquelyIdentify !== 'root')))
        findLinks.forEach(element => {
            if (link.uniquelyIdentify === element.parentUniquelyIdentify) children.push(findChildren(element))
        })

        link.children = children

        return link
    }

    let navigationLink = []
    links.forEach(link => {
        if (link.parentUniquelyIdentify === 'root') navigationLink.push(findChildren(link))
    })

    return consequencer.success(navigationLink)
}

const NavigationLink = {
    getAllNavigationLink
}

export default NavigationLink
