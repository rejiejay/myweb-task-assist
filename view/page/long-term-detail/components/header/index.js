import Prompt from './../../../../components/prompt';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    showAddLongTermPrompt = async () => {
        const { addLongTermProgram } = this.props

        const longTermInstance = await Prompt({ title: '请输入新长期任务分类名称', placeholder: '请输入新长期任务分类名称' })
        if (longTermInstance.result !== 1) return
        const name = longTermInstance.data

        addLongTermProgram(name)
    }

    render() {
        const { longTermName } = this.props

        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center">
                <div className="operat-item hover-item operat-main"
                    onClick={() => window.location.replace('./../long-term-list/')}
                >{`< ${longTermName}`}</div>
            </div>

            <div className="operating-center flex-rest"></div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item"
                    onClick={this.showAddLongTermPrompt}
                >新增类别</div>
            </div>
        </div>
    }
}
