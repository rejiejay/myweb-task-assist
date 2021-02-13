/**
 * navigation-link 对外方法
 */
import valuesStructuresVerify from './../../utils/values-structures-verify'
import service from './../../service/index.js'

const getAllNavigationLink = async function getAllNavigationLink(parameter, responseHanle) {
    const result = await service.link.getAllNavigationLink()
    responseHanle.json(result)
}

const addNavigationLink = async function addNavigationLink({ topic, filterJson }, responseHanle) {
    const verifys = [
        { value: topic, field: 'topic', method: 'isStringNil' },
        { value: filterJson, field: 'filterJson', method: 'isStringNil' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.link.addNavigationLink({ topic, filterJson })
    responseHanle.json(result)
}

const NavigationLink = {
    get_link_all: getAllNavigationLink,
    post_link_add: addNavigationLink
}

export default NavigationLink
