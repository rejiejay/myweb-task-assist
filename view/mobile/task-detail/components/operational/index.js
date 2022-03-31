export default class Operational extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    completedHandle = async () => {
    }

    render() {
        const {
            title,
            content,
            progress,

            isEdit,
            isEditDiff,

            completedHandle,
            submitHandle,

            deleteHandle,
        } = this.props

        const isStopOrProcess = progress === 'stop' || progress === 'handle'
        const canSubmit = !!title && !!content;

        return <>
            <div className='operational-left flex-rest flex-start'>

                {!isEdit && canSubmit && <div className='left-item'>
                    <div className='left-item-name'
                        onClick={submitHandle}
                    >保存</div>
                </div>}

                {!!isEdit && !!isEditDiff && canSubmit && <div className='left-item'>
                    <div className='left-item-name'
                        onClick={submitHandle}
                    >暂存</div>
                </div>}

                {!!isEdit && isStopOrProcess && <div className='left-item'>
                    <div className='left-item-name'>{progress === 'stop' ? '执行' : '挂起'}</div>
                </div>}

                {!!isEdit && <div className='left-item'>
                    <div className='left-item-name'
                        onClick={completedHandle}
                    >完成</div>
                </div>}

            </div>

            <div className='operational-right flex-start'>
                {!!isEdit && <div className='right-item'>
                    <div className='right-item-name'
                        onClick={deleteHandle}
                    >删除</div>
                </div>}

                {!isEdit && <div className='right-item' onClick={() => !isEditDiff && window.history.back()}>
                    <div className='right-item-name'>返回</div>
                </div>}
                {!!isEdit && !isEditDiff && <div className='right-item' onClick={() => window.history.back()}>
                    <div className='right-item-name'>返回</div>
                </div>}
            </div>
        </>
    }
}
