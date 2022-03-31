import { renderDeadlineTime } from './../../../utils/index';
import priority_const from './../../../../consts/priority';
import progress_const from './../../../../consts/progress';

export default class Filter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            longTermId,
            longTermName,
            deadlineTimestamp,
            tag,
            progress,
            priority,
        } = this.props

        const isNotFilter = !longTermId && !deadlineTimestamp && !tag && !progress && !priority;
        if (!!isNotFilter) {
            return <></>
        }

        return <div className='preview-filter'>
            <div className='preview-filter-container'>
                {!!longTermId && <div className='preview-filter-item flex-start-center'>
                    <div className='filter-item-title'>长期任务:</div>
                    <div className='filter-item-content flex-rest'>
                        <div className='item-content-description'>{longTermName}</div>
                    </div>
                </div>}

                {!!deadlineTimestamp && <div className='preview-filter-item flex-start-center'>
                    <div className='filter-item-title'>截止时间:</div>
                    <div className='filter-item-content'>{renderDeadlineTime(+deadlineTimestamp)}</div>
                </div>}

                {!!tag && <div className='preview-filter-item flex-start-center'>
                    <div className='filter-item-title'>标签分类:</div>
                    <div className='filter-item-content'>{tag}</div>
                </div>}

                {!!progress && <div className='preview-filter-item flex-start-center'>
                    <div className='filter-item-title'>执行状态:</div>
                    <div className='filter-item-content'>{progress_const.valueToLable[progress] || progress}</div>
                </div>}

                {!!priority && <div className='preview-filter-item flex-start-center'>
                    <div className='filter-item-title'>优先级别:</div>
                    <div className='filter-item-content'>{priority_const.valueToLable[priority] || priority}</div>
                </div>}
            </div>
        </div >
    }
}
