export default class SideOperation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className='side-operation'>
            <div className="side-operation-header noselect flex-start">
                <div className="operation-header-item header-item-button flex-center flex-rest">完成</div>
            </div>
        </div>
    }
}
