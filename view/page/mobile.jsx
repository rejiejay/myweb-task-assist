import server from './server.js'

/**
 * 因为GroupTask和Task的数据不太一样、所以分开2个React.Component
 */
class TaskCar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isBigCar: true
        }
    }

    render() {
        return <div className='task-car'>TaskSmallCar</div>
    }
}
class GroupTaskCar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isBigCar: true
        }
    }

    render() {
        return <div className='group-task-car'>TaskSmallCar</div>
    }
}

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowBigCar: true
        }
    }

    componentDidMount() {
        server.getTaskList()
    }

    render() {
        const { isShowBigCar } = this.state

        return <>
            <div className='list-top-operate flex-start-center'>
                <div className='top-operate-navigation flex-start flex-rest'>
                    <div className='list-top-button'>Navigation</div>
                </div>
                <div className='switch-car-size'>
                    <div className='list-top-button'>{isShowBigCar ? 'Switch Small Car' : 'Switch Big Car'}</div>
                </div>
            </div>

            <div className='list-content'>
            </div>

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
