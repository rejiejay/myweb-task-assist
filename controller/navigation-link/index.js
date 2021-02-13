/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'

const getAllNavigationLink = async function getAllNavigationLink(parameter, responseHanle) {
    const result = await service.link.getAllNavigationLink()
    responseHanle.json(result)
}

const NavigationLink = {
    get_link_all: getAllNavigationLink
}

export default NavigationLink
