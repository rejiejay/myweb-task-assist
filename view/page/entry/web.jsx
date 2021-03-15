import CONSTS from './../../../library/consts'
import valuesStructuresVerify from './../../../utils/values-structures-verify'
import { loadPageVar, queryToUrl } from './../../utils/url-helper';
import ArrayHelper from './../../../utils/array-helper';
import TimeHelper from './../../../utils/time-helper';

import WindowsHeader from './windows/header'
import WindowsContainer from './windows/container'
import WindowsPagination from './windows/pagination'
import service from './../../service'
import utils from './utils.js'

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

        if (sort.value === 2) list = ArrayHelper.uniqueDeduplicationByKey({ array: this.state.list.concat(fetch.list), key: 'id' })

        this.setState({ list, count: fetch.count, filter })
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

        if (!!longTermId) {
            const longTermTaskInstance = await service.getLongTermTask(longTermId)
            if (longTermTaskInstance.result === 1) longTerm = longTermTaskInstance.data
        }

        if (!!tagsPageVar) tags = tagsPageVar.split('-').reduce(reducer, [])

        if (!!multipleStatusPageVar) multipleStatus = multipleStatusPageVar.split('-').reduce(reducer, [])

        if (!!multiplePriorityPageVar) multiplePriority = multiplePriorityPageVar.split('-').reduce(reducer, [])

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

    pageNoChangeHandle = pageNo => this.setState({ pageNo }, this.initList)

    setSortHandle = sort => {
        this.setState({ sort }, this.initList)
    }

    setFilterHandle = async () => {
        const isMultipleFilter = true
        const initFilter = this.state.filter

        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, initFilter)
        if (selectInstance.result !== 1) return
        const filter = selectInstance.data

        const longTerm = filter.longTermFilter
        const tags = filter.tagFilter
        const minEffectTimestamp = filter.minEffectTimestampFilter
        const maxEffectTimestamp = filter.maxEffectTimestampFilter
        const multipleStatus = filter.statusMultipleFilter
        const multiplePriority = filter.priorityMultipleFilter
        let query = { }

        const arrayToQueryString = array => array.map(item => JSON.stringify(item)).join('-')
        if (longTerm && longTerm.id) query.longTermId = longTerm.id
        if (tags && tags.length > 0) query.tags = arrayToQueryString(tags)
        if (minEffectTimestamp) query.minEffectTimestamp = minEffectTimestamp
        if (maxEffectTimestamp) query.maxEffectTimestamp = maxEffectTimestamp
        if (filter.effectTimestampRangeFilter) {
            const effectTimestampRange = CONSTS.utils.viewValueToServiceView(CONSTS.task.effectTimestampRange, filter.effectTimestampRangeFilter)
            query.minEffectTimestamp = new Date().getTime()
            query.maxEffectTimestamp = minEffectTimestamp + effectTimestampRange
        }
        if (multipleStatus && multipleStatus.length > 0) query.multipleStatus = arrayToQueryString(multipleStatus)
        if (multiplePriority && multiplePriority.length > 0) query.multiplePriority = arrayToQueryString(multiplePriority)

        window.location.replace(`./${queryToUrl(query)}`)
    }

    renderEffectTimestamp = ({ minEffectTimestamp, maxEffectTimestamp }) => {
        const effectTimestampArray = []
        if (!!minEffectTimestamp) effectTimestampArray.push(`min ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+minEffectTimestamp))}`)
        if (!!maxEffectTimestamp) effectTimestampArray.push(`max ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+maxEffectTimestamp))}`)

        return effectTimestampArray.join(' - ')
    }

    render() {
        const { list, sort, pageNo, count, pageSize, filter } = this.state
        const { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = filter

        return <>
            <WindowsHeader
                longTerm={longTerm && longTerm.title}
                effectTimes={this.renderEffectTimestamp({ minEffectTimestamp, maxEffectTimestamp })}
                tags={tags && tags.length > 0 && tags.map(({ name }) => name).join('、')}
                status={multipleStatus && multipleStatus.length > 0 && multipleStatus.map(({ label }) => label).join('、')}
                priority={multiplePriority && multiplePriority.length > 0 && multiplePriority.map(({ label }) => label).join('、')}
                setSortHandle={this.setSortHandle}
                setFilterHandle={this.setFilterHandle}
            />

            <WindowsContainer
                list={list}
                resetHandle={this.initList}
            ></WindowsContainer>

            <WindowsPagination
                sort={sort}
                all={count}
                count={list.length}
                loadMoreHandle={this.initList}
                pageNo={pageNo}
                pageTotal={Math.ceil(count / pageSize)}
                handle={this.pageNoChangeHandle}
            ></WindowsPagination>

            <div className="copyright-component"><div className="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div></div>
        </>
    }
}
