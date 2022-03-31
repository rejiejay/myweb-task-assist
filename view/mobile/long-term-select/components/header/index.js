import Prompt from './../../../../components/prompt';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    showAddLongTermPrompt = async () => {
        const { addLongTermHandle } = this.props

        const longTermInstance = await Prompt({ title: '请输入新长期任务名称', placeholder: '请输入新长期任务名称' })
        if (longTermInstance.result !== 1) return

        addLongTermHandle(longTermInstance.data)
    }

    render() {
        return <div className='term-select-header'>
            <div className='select-header-top flex-start-center'>
                <div className='header-top-left flex-rest flex-start'>
                    <div className='top-left-item flex-start-center' onClick={() => window.history.back()}>
                        <svg className="header-back-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5701" width="16" height="16">
                            <path d="M351.080548 525.384887 743.262807 133.202628C759.532765 116.93267 759.951517 89.498954 743.289109 72.836547 727.114066 56.661504 699.599924 56.185954 682.923028 72.862849L260.597176 495.188701C260.592789 495.193088 260.588409 495.197469 260.584088 495.20191 260.579641 495.206236 260.575261 495.210617 260.57088 495.214997 252.487594 503.298283 248.325109 514.213393 248.264661 525.192566 248.183184 536.211472 252.244232 547.228128 260.57088 555.554776 260.575285 555.559181 260.57969 555.563586 260.584034 555.56793 260.588439 555.572335 260.592844 555.57674 260.597188 555.581084L682.923083 977.906979C699.19304 994.176936 726.626738 994.595598 743.289109 977.933227 759.464177 961.758159 759.939751 934.244089 743.262861 917.5672L351.080548 525.384887Z" fill='#909399'></path>
                        </svg>
                        <div className='left-item-name'>长期任务</div>
                    </div>
                </div>
                <div className='header-top-right flex-start'>
                    <div className='top-right-item' onClick={this.showAddLongTermPrompt}>新增</div>
                </div>
            </div>
        </div>
    }
}
