import controller from './../controller/navigation-link'

import utils from './utils'

const listAllNavigationLink = responseHanle => controller.get_link_all({}, responseHanle)

const NavigationLink = {
    listAllNavigationLink: utils.resolveHandle(listAllNavigationLink, { isShowResult: false })
}

export default NavigationLink
