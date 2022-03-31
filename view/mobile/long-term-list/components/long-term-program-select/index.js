export default class LongTermProgramSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            isSelectLongTermProgram,
            longTermProgramList,
            selectLongTermProgramHandle,
        } = this.props

        if (!isSelectLongTermProgram) {
            return <></>
        }

        return <div className='long-term-program-select'>
            <div className='long-term-program-select-container'>
                <div
                    className='select-sub-item flex-start-center'
                    onClick={() => selectLongTermProgramHandle(false)}
                >
                    <div className='long-term-program-select-rest flex-rest flex-center'>
                        <div className='item-rest-description'>取消</div>
                    </div>
                </div>
                <div
                    className='select-sub-item flex-start-center'
                    onClick={() => selectLongTermProgramHandle('null')}
                >
                    <div className='long-term-program-select-rest flex-rest flex-center'>
                        <div className='item-rest-description'>未分类</div>
                    </div>
                </div>
                {longTermProgramList.map((term, key) => <div
                    className='select-sub-item flex-start-center'
                    key={key}
                    onClick={() => selectLongTermProgramHandle(term.id)}
                >
                    <div className='long-term-program-select-rest flex-rest'>
                        <div className='item-rest-description'>{term.name}</div>
                    </div>
                    <div className='long-term-program-select-selected'>选择</div>
                </div>
                )}
            </div>
        </div>
    }
}
