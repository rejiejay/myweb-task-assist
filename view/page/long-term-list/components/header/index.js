import Confirm from './../../../../components/confirm';
import Prompt from './../../../../components/prompt';
import {
    addLongTerm,
} from '../../../../service/long-term';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    showAddLongTermPrompt = async () => {
        const { addLongTermHandle } = this.props

        const longTermInstance = await Prompt({ title: '请输入新长期任务名称', placeholder: '请输入新长期任务名称' })
        if (longTermInstance.result !== 1) return

        const name = longTermInstance.data
        const result = await addLongTerm(name);
        if (result instanceof Error) return Confirm(result.message)
        addLongTermHandle()
    }

    render() {
        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center">
                <div className="operat-item hover-item operat-main"
                    onClick={() => window.location.replace('./../')}
                >{'<'} 长期任务</div>
            </div>

            <div className="operating-center flex-rest"></div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item"
                    onClick={this.showAddLongTermPrompt}
                >新增</div>
            </div>
        </div>
    }
}
