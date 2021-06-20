import ArrayHelper from './../../../utils/array-helper';
import TimeHelper from './../../../utils/time-helper';

import WindowsHeader from './windows/header'
import WindowsContainer from './windows/container'
import WindowsPagination from './windows/pagination'
import service from './../../service'
import utils from './utils.js'
import PageCommonUtils from './../../utils/page-common'

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // service\task\data-access-object.js
            list: [],
            count: 0,
            pageNo: 1,
            pageSize: 30,

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
        const filter = await PageCommonUtils.pageVarToFilter()

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
        const effectTimestampRange = filter.effectTimestampRangeFilter
        const multipleStatus = filter.statusMultipleFilter
        const multiplePriority = filter.priorityMultipleFilter
        window.location.replace(`./${PageCommonUtils.filterToUrlQuery({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, effectTimestampRange, multipleStatus, multiplePriority })}`)
    }

    renderEffectTimestamp = ({ minEffectTimestamp, maxEffectTimestamp }) => {
        const effectTimestampArray = []
        if (!!minEffectTimestamp) effectTimestampArray.push(`min ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+minEffectTimestamp))}`)
        if (!!maxEffectTimestamp) effectTimestampArray.push(`max ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+maxEffectTimestamp))}`)

        return effectTimestampArray.join(' - ')
    }

    addHandle = () => {
        const { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = this.state.filter
        let status = null
        let priority = null
        if (multipleStatus.length > 0) status = multipleStatus[0]
        if (multiplePriority.length > 0) priority = multiplePriority[0]

        window.open(`./windows-edit/${PageCommonUtils.filterToUrlQuery({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority })}`)
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
                addHandle={this.addHandle}
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
