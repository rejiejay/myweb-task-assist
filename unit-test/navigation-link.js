import controller from './../controller/navigation-link'

import utils from './utils'

const listAllNavigationLink = responseHanle => controller.get_link_all({}, responseHanle)

const addNavigationLink = responseHanle => controller.get_link_add({
    topic: 'add',
    filterJson: JSON.stringify({
        longTerm: { id: 1, title: '务长期任务' },
        tags: [{ id: 1, name: 'js' }],
        multipleStatus: [1],
        multiplePriority: [1],
        minEffectTimestamp: new Date(2000, 1, 3, 0, 0).getTime(),
        maxEffectTimestamp: new Date(2000, 1, 5, 0, 0).getTime()
    })
}, responseHanle)

const NavigationLink = {
    listAllNavigationLink: utils.resolveHandle(listAllNavigationLink, { isShowResult: false }),
    addNavigationLink: utils.resolveHandle(addNavigationLink, { isShowResult: false })
}

export default NavigationLink
