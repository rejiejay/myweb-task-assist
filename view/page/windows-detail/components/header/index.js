export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center flex-rest">
                <div className="operat-item hover-item">标签分类</div>
                <div className="operat-item hover-item">优先级</div>
            </div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item">新增计划</div>
            </div>
        </div>
    }
}
