import service from './service.js'
import TaskList from './mobile-components/task-car'
import ActionSheet from './../../components/action-sheet'
import FullscreenIframe from './../../components/fullscreen-iframe'
import toast from './../../components/toast'
import CONSTS from './../../../library/consts'

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowBigCard: false,
            list: [],
            sort: { value: 1, lable: 'Sort' },
            longTermId: { id: null, title: '' } // 长期的任务不进行多选
        }

        this.filter = {
            tags: [],
            minEffectTimestampFilter: null,
            maxEffectTimestampFilter: null,
            status: [],
            priority: []
        }
    }

    componentDidMount() {
        this.initList()
    }

    async initList() {
        const fetchInstance = await service.getTaskList()
        if (fetchInstance.result !== 1) return

        this.setState({ list: fetchInstance.data })
    }

    selectSortHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.sort)
        const selectInstance = await ActionSheet({
            title: '请选择排序',
            options
        })

        if (selectInstance.result !== 1) return

        const sort = selectInstance.data

        // TODO: add API
        this.setState({ sort })
    }

    selectFilterHandle = () => {
        toast.show()
        import('./common-components/filter-edit').then(async ({ FilterEdit }) => {
            toast.destroy()
            const selectInstance = await FullscreenIframe({
                Element: FilterEdit,
                className: 'mobile-device-task-filter-edit',
                props: {
                    isMultipleFilter: true
                }
            })

            if (selectInstance.result !== 1) return

            console.log('selectInstance', selectInstance)
        })
    }

    render() {
        const { list, isShowBigCard, sort } = this.state

        return <>
            <div className='list-top-operate flex-start-center'>
                <div className='top-operate-navigation flex-start flex-rest'>
                    <div className='list-top-button'>Navigation</div>
                </div>
                <div className='switch-car-size'>
                    <div className='list-top-button'
                        onClick={() => this.setState({ isShowBigCard: !isShowBigCard })}
                    >{isShowBigCard ? 'Switch Small Car' : 'Switch Big Car'}</div>
                </div>
            </div>

            <TaskList
                list={list}
                isShowBigCard={isShowBigCard}
            />

            <div className='list-bottom-operate flex-start-center'>
                <div className='bottom-operate-filter flex-start flex-rest'>
                    <div className='list-bottom-button right-line' onClick={this.selectFilterHandle}>Filter</div>
                </div>
                <div className='bottom-operate-sort'>
                    <div className='list-bottom-button left-line' onClick={this.selectSortHandle}>{sort.lable}</div>
                </div>
            </div>
        </>
    }
}
