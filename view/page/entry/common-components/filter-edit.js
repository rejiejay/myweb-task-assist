import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import service from './../service'

class FilterEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

   async componentDidMount() {
        await this.initTaskTagInfor()
        await this.initTaskLongTermInfor()
    }

    async initTaskTagInfor() {
        const { longTermTaskId } = this.props
        const fetchInstance = await service.getAllTaskTagInfor()
        console.log('fetchInstance', fetchInstance)
    }

    async initTaskLongTermInfor() {
        const { taskTagId } = this.props
    }

    render() {
        return <div className='filter-edit-container'>
            <CommonlyListItem key='long-term-task'
                title='是否为(Long Term Task)项目?'
            >
                <div>Long Term Task</div>
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
