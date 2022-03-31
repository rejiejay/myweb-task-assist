export default class BottomOperate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    previousHandle = () => {
        const { pageNo, setPageNoHandle } = this.props
        if (pageNo <= 1) {
            return
        }

        const newPage = pageNo - 1
        setPageNoHandle(newPage)
    }

    nextHandle = () => {
        const { pageNo, pageTotal, setPageNoHandle } = this.props
        if (pageNo >= pageTotal) {
            return
        }

        const newPage = pageNo + 1
        setPageNoHandle(newPage)
    }

    render() {
        const { pageNo, pageTotal } = this.props

        return <>
            <div className='bottom-operate'
                onClick={this.previousHandle}
            >上一页 ({pageNo || 1}/{pageTotal || 0})</div>
            <div className='bottom-operate-center flex-rest'></div>
            <div className='bottom-operate'
                onClick={this.nextHandle}
            >下一页 ({pageNo || 1}/{pageTotal || 0})</div>
        </>
    }
}
