import controller from './../controller/navigation-link'

import utils from './utils'

const listAllNavigationLink = responseHanle => controller.get_link_all({}, responseHanle)

const addNavigationLink = responseHanle => controller.post_link_add({
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

const editNavigationLink = responseHanle => controller.post_link_edit({
    id: 1,
    uniquelyIdentify: 'e71f41f2864f42ad6eef13a379ff903769ef7ea8',
    parentUniquelyIdentify: 'root',
    topic: 'edit',
    filterJson: JSON.stringify({
        longTerm: { id: 2, title: '务长期任务2' },
        tags: [],
        multipleStatus: [],
        multiplePriority: [],
        minEffectTimestamp: null,
        maxEffectTimestamp: null
    })
}, responseHanle)

const deleteNavigationLink = responseHanle => controller.post_link_delete({ id: 4 }, responseHanle)

const NavigationLink = {
    listAllNavigationLink: utils.resolveHandle(listAllNavigationLink, { isShowResult: false }),
    addNavigationLink: utils.resolveHandle(addNavigationLink, { isShowResult: false }),
    editNavigationLink: utils.resolveHandle(editNavigationLink, { isShowResult: false }),
    deleteNavigationLink: utils.resolveHandle(deleteNavigationLink, { isShowResult: false })
}

export default NavigationLink
