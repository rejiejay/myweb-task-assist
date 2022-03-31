export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { goLongTermSelectPage, goRandomlyListPage, goCompleteListPage } = this.props

        return <>
            <div className='list-header-top flex-start-center'>
                <div className='header-top-left flex-rest flex-start'>
                    <div className='top-left-item' onClick={goLongTermSelectPage}>长期任务</div>
                </div>
                <div className='header-top-right flex-start'>
                    <div className='top-right-item' onClick={goCompleteListPage}>完成</div>
                    <div className='top-right-item' onClick={goRandomlyListPage}>随机</div>
                </div>
            </div>
        </>
    }
}
