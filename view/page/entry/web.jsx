import CONSTS from './../../../library/consts'
import valuesStructuresVerify from './../../../utils/values-structures-verify'
import { loadPageVar } from './../../utils/url-helper';

import WindowsHeader from './windows/header'
import WindowsContainer from './windows/container'
import WindowsPagination from './windows/pagination'
import service from './service'

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // service\task\data-access-object.js
            list: [],
            count: 0,
            pageNo: 1,
            pageSize: CONSTS.defaultPageSize,

            filter: {
                longTerm: { id: null, title: '' },
                tags: [],
                minEffectTimestamp: null,
                maxEffectTimestamp: null,
                // library\consts\task.js -> status && priority
                multipleStatus: [],
                multiplePriority: []
            },

            sort: { value: 1, label: 'Sort' },
        }
    }

    componentDidMount() {
        this.initList()
    }

    initList = async () => {
        const { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = await this.initPageVar()
        const { sort, pageNo, pageSize } = this.state

        const filter = { longTerm, pageNo, pageSize, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }

        const fetchInstance = await service.getTaskList(filter, sort)
        if (fetchInstance.result !== 1) return
        const fetch = fetchInstance.data
        let list = fetch.list

        this.setState({ list, count: fetch.count })
    }

    async initPageVar() {
        let longTerm = { id: null, title: '' }
        let tags = []
        let multipleStatus = []
        let multiplePriority = []

        const longTermId = loadPageVar('longTermId')
        const tagsPageVar = loadPageVar('tags')
        const minEffectTimestamp = loadPageVar('minEffectTimestamp')
        const maxEffectTimestamp = loadPageVar('maxEffectTimestamp')
        const multipleStatusPageVar = loadPageVar('multipleStatus')
        const multiplePriorityPageVar = loadPageVar('multiplePriority')

        const reducer = (accumulator, currentValue) => {
            const verifyInstance = valuesStructuresVerify.isJSONString(currentValue)
            if (verifyInstance.result === 1) accumulator.push(verifyInstance.data)
            return accumulator
        }

        if (longTermId) {
            const longTermTaskInstance = await service.getLongTermTask(longTermId)
            if (longTermTaskInstance.result === 1) longTerm = longTermTaskInstance.data
        }

        if (tagsPageVar) tags = tagsPageVar.split('-')

        if (!!multipleStatusPageVar) {
            multipleStatus = multipleStatusPageVar.split('-').reduce(reducer, [])
        }

        if (!!multiplePriorityPageVar) {
            multiplePriority = multiplePriorityPageVar.split('-').reduce(reducer, [])
        }

        const filter = {
            longTerm,
            tags,
            minEffectTimestamp: minEffectTimestamp || null,
            maxEffectTimestamp: maxEffectTimestamp || null,
            multipleStatus,
            multiplePriority
        }

        this.setState({ filter })

        return filter
    }

    render() {
        const { list } = this.state

        return <>
            <WindowsHeader></WindowsHeader>

            <WindowsContainer
                list={list}
                resetHandle={this.initList}
            ></WindowsContainer>

            <WindowsPagination></WindowsPagination>

            <div className="copyright-component"><div className="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div></div>
        </>
    }
}
