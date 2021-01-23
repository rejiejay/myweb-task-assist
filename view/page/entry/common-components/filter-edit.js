import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import Button from './../../../components/button'
import jsxStyle from './../../../components/jsx-style'

import service from './../service'

class FilterEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagOptions: [],
            tagFilter: null,
            longTermOptions: [],
            longTermFilter: {
                id: null,
                des: ''
            }
        }
    }

    async componentDidMount() {
        this.initTaskTagFilter()
        await this.initAllTaskTagInfor()
        await this.initTaskLongTermInfor()
    }

    async initAllTaskTagInfor() {
        const fetchInstance = await service.getAllTaskTagInfor()
        if (fetchInstance.result !== 1) return
        const tags = fetchInstance.data

        this.setState({ tagOptions: tags.map(tag => ({ value: tag, label: tag })) })
    }

    initTaskTagFilter() {
        const { tagFilter } = this.props
        if (!tagFilter) return

        this.setState({ tagFilter })
    }

    async initTaskLongTermInfor() {
        const { longTermFilterId } = this.props
        let { longTermFilter } = this.state

        const fetchInstance = await service.getAllLongTermTask()
        if (fetchInstance.result !== 1) return
        const allLongTermTask = fetchInstance.data

        const longTermOptions = allLongTermTask.map(longTerm => ({ value: longTerm.id, label: longTerm.title }))

        if (longTermFilterId) longTermFilter = longTermOptions.reduce((filter, longTerm) => {
            if (longTermFilterId === longTerm.value) filter = { id: longTerm.value, des: longTerm.label }
            return filter
        }, longTermFilter);

        this.setState({ longTermOptions, longTermFilter })
    }

    render() {
        return <div className='filter-edit-container'>
            <CommonlyListItem key='long-term-task'
                title='是否为(Long Term Task)项目?'
            >
                <Button style={{ ...jsxStyle.basicFlex.startCenter }}
                >Long Term Task</Button>
            </CommonlyListItem>
            <CommonlyListItem key='time-filter'
                title='时间过滤器'
            >
                <div>Time Filter</div>
            </CommonlyListItem>
            <CommonlyListItem key='tag-filter'
                title='标签Tag过滤器'
            >
                <div>Tag Filter</div>
            </CommonlyListItem>
            <CommonlyListItem key='task-status-filter'
                title='任务状态筛选器'
            >
                <div>Task Filter</div>
            </CommonlyListItem>
        </div>
    }
}

export default FilterEdit
