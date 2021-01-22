import service from './service.js'
import TaskList from './mobile-components/task-car'

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowBigCard: false,
            list: []
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

    render() {
        const { list, isShowBigCard } = this.state

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
                    <div className='list-bottom-button right-line'>Filter</div>
                </div>
                <div className='bottom-operate-sort'>
                    <div className='list-bottom-button left-line'>Sort</div>
                </div>
            </div>
        </>
    }
}
