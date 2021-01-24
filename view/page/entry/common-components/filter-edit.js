import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import Button from './../../../components/button'
import ActionSheet from './../../../components/action-sheet'
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

    selectLongTermTaskHandle = async () => {
        const { longTermOptions } = this.state
        const selectInstance = await ActionSheet({ title: '请选择 Long Term Task', options: longTermOptions })
        if (selectInstance.result !== 1) return
        const longTerm = selectInstance.data
        this.setState({ longTermFilter: { id: longTerm.value, des: longTerm.label } })
    }

    cancelSelectLongTermTaskHandle = () => this.setState({ longTermFilter: { id: null, des: '' } })

    render() {
        const { longTermFilter } = this.state

        return <div className='filter-edit-container'>
            <CommonlyListItem key='long-term-task'
                title='是否为(Long Term Task)项目?'
            >
                <>
                    <Button style={{ ...jsxStyle.basicFlex.startCenter }}
                        onClick={this.selectLongTermTaskHandle}
                    >
                        {longTermFilter.id ?
                            `属于长期项目: ${longTermFilter.des}` :
                            '不属于长期任务项目'
                        }
                    </Button>
                    <div style={{ height: '5px' }}></div>
                    {longTermFilter.id && <Button
                        onClick={this.cancelSelectLongTermTaskHandle}
                    >取消选择长期</Button>}
                </>
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
            <div style={{ height: '15px' }}></div>
            <div style={{ borderTop: '1px solid #ddd' }}></div>
            <div style={{ height: '15px' }}></div>
            <Button
                style={{ backgroundColor: '#1890ff' }}
            >确认</Button>
            <div style={{ height: '5px' }}></div>
            <Button
                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
            >取消</Button>
        </div>
    }
}

export default FilterEdit
