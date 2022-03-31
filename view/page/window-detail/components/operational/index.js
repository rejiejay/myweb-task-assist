import priority_const from './../../../../consts/priority';
import progress_const from './../../../../consts/progress';

import DatePicker from './../../../../components/date-picker-sheet';
import Modal from './../../../../components/modal';
import toast from './../../../../components/toast';
import actionSheet from './../../../../components/action-sheet';

import timeTransformers from './../../../../../utils/time-transformers';

import { getAllLongTerm } from './../../../../service/long-term';
import { getTags } from './../../../../service/task-tag';

export default class OperationalComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelectLongTerm: false,
            longTermList: [],
            filterTags: [],
        }
    }

    componentDidMount() {
        this.initLongTerm()
        this.initTags()
    }

    initLongTerm = async () => {
        const result = await getAllLongTerm()
        if (result instanceof Error || !result) {
            return
        }

        this.setState({ longTermList: result })
    }

    initTags = async () => {
        const result = await getTags()
        if (result instanceof Error || !result) {
            return
        }

        this.setState({ filterTags: result })
    }

    selectLongTermHandle = longTermId => {
        const { selectLongTerm } = this.props
        this.setState({ isSelectLongTerm: false })
        selectLongTerm(longTermId)
    }

    selectCategoryTag = async () => {
        toast.show()
        const { filterTags } = this.state
        const { setTag } = this.props

        const { MultipleCategoryTag } = await import('./../../../../components/page/multiple-category-tag/mobile.js')
        toast.destroy()

        const multipleCategoryTagInstance = new Modal(MultipleCategoryTag, {
            tag: filterTags.map((item, key) => ({
                id: `${key}-${item}`,
                isKill: false,
                isSelect: false,
                value: item,
                lable: item
            }))
        });
        const result = await multipleCategoryTagInstance.show();

        if (result instanceof Error) return
        if (result.length <= 0) return setTag('')
        const tag = result[0];
        setTag(tag.value)
    }

    deadlineTimestampHandle = async () => {
        const { deadlineTimestamp, setDeadline } = this.props;
        if (!deadlineTimestamp) {
            const nowTimestamp = new Date().getTime()
            const minutTimestamp = 1000 * 60
            const hourTimestamp = minutTimestamp * 60
            const dayTimestamp = hourTimestamp * 24
            const dayThreeLaterTimestamp = nowTimestamp + (dayTimestamp * 3);
            const weekLaterTimestamp = nowTimestamp + (dayTimestamp * 7);
            const monthLaterTimestamp = nowTimestamp + (dayTimestamp * 30);
            const halfYearLaterTimestamp = nowTimestamp + (dayTimestamp * 182.5);

            const options = [
                {
                    value: dayThreeLaterTimestamp,
                    label: '3天内'
                }, {
                    value: weekLaterTimestamp,
                    label: '一周内'
                }, {
                    value: monthLaterTimestamp,
                    label: '一个月内'
                }, {
                    value: halfYearLaterTimestamp,
                    label: '半年内'
                }, {
                    value: 'date-picker',
                    label: '自定义'
                }
            ]
            const title = '请选择标签'
            const isMultiple = false

            const result = await actionSheet({ title, options, isMultiple })
            if (result instanceof Error) return
            const selected = result.value
            if (selected !== 'date-picker') {
                return setDeadline(selected)
            }
        }
        const defaultValue = +deadlineTimestamp || new Date().getTime()
        const nowYear = new Date().getFullYear()
        const options = {
            title: '请选择时间',
            beginYear: nowYear - 10,
            endYear: nowYear + 10,
            value: timeTransformers.dateToYYYYmmDDhhMM(new Date(defaultValue))
        }
        const result = await DatePicker(options);

        if (result instanceof Error) return

        setDeadline(result)
    }

    renderDeadlineTimestamp = () => {
        const { deadlineTimestamp } = this.props
        try {
            const deadline = new Date(+deadlineTimestamp)
            return timeTransformers.dateToDiaryDetail(deadline)
        } catch (error) {
            return 'render Deadline Timestamp Error'
        }
    }

    selectProgressHandle = async () => {
        const { setProgress } = this.props;
        const options = Object.values(progress_const.values).map(value => ({
            value,
            label: progress_const.valueToLable[value]
        }))
        const title = '请选择任务状态'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        const progress = result.value
        setProgress(progress)
    }

    selectPriorityHnalde = async () => {
        const { setPriority } = this.props;

        const options = Object.values(priority_const.values).map(value => ({
            value,
            label: priority_const.valueToLable[value]
        }))
        const title = '请选择标签'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        const priority = result.value
        setPriority(priority)
    }

    render() {
        const {
            longTermList,
            isSelectLongTerm
        } = this.state

        const {
            title,
            content,

            isEdit,
            isEditDiff,

            completedHandle,
            submitHandle,

            deleteHandle,

            specific,
            measurable,
            attainable,
            relevant,
            timeBound,

            setSpecific,
            setMeasurable,
            setAttainable,
            setRelevant,
            setTimeBound,

            longTermId,
            longTermName,

            deadlineTimestamp,
            setDeadline,

            tag,
            setTag,

            progress,
            setProgress,

            priority,
            setPriority,
        } = this.props

        const isStopOrProcess =
            progress === progress_const.values.stop ||
            progress === progress_const.values.handle
        const canSubmit = !!title && !!content;

        return <>
            <div className="operational-edit flex-start">

                {!isEdit && <div className='operational-edit-item flex-rest flex-center'
                    onClick={submitHandle}
                >保存</div>}

                {!!isEdit && isStopOrProcess && <div className='operational-edit-item flex-rest flex-center'
                    onClick={() => { }}
                >{progress === 'stop' ? '执行' : '挂起'}</div>}

                {!!isEdit && !!isEditDiff && canSubmit && <div className='operational-edit-item flex-rest flex-center'
                    onClick={submitHandle}
                >暂存</div>}

                {!!isEdit && <div className='operational-edit-item flex-rest flex-center'
                    onClick={completedHandle}
                >完成</div>}

                {!!isEdit && <div className='operational-edit-item flex-rest flex-center'
                    onClick={deleteHandle}
                >删除</div>}
            </div>

            <div className="operational-filter">

                {(!specific || !measurable || !attainable || !relevant || !timeBound) &&
                    <div className='detail-smart-operational'>
                        <div className='smart-operational-container flex-start-center'>
                            {!specific && <div className='flex-center flex-rest' onClick={() => setSpecific('-')}>明确</div>}
                            {!measurable && <div className='flex-center flex-rest' onClick={() => setMeasurable('-')}>衡量</div>}
                            {!attainable && <div className='flex-center flex-rest' onClick={() => setAttainable('-')}>接受</div>}
                            {!relevant && <div className='flex-center flex-rest' onClick={() => setRelevant('-')}>相关性</div>}
                            {!timeBound && <div className='flex-center flex-rest' onClick={() => setTimeBound('-')}>时限</div>}
                        </div>
                    </div>
                }

                {!!isEdit && (!longTermId || !deadlineTimestamp || !tag || !progress || !priority) &&
                    <div className='detail-filter-operational'>
                        <div className='filter-operational-container flex-start-center'>
                            {!longTermId && <div className='flex-center flex-rest'
                                onClick={() => this.setState({ isSelectLongTerm: !isSelectLongTerm })}
                            >长期任务</div>}
                            {!deadlineTimestamp && <div className='flex-center flex-rest'
                                onClick={this.deadlineTimestampHandle}
                            >截止时间</div>}
                            {!tag && <div className='flex-center flex-rest'
                                onClick={this.selectCategoryTag}
                            >标签分类</div>}
                            {!progress && <div className='flex-center flex-rest'
                                onClick={this.selectProgressHandle}
                            >状态</div>}
                            {!priority && <div className='flex-center flex-rest'
                                onClick={this.selectPriorityHnalde}
                            >优先级</div>}
                        </div>
                    </div>
                }

                {!!isSelectLongTerm && <div className='detail-filter-item'>
                    <div className='filter-item-container'>
                        {longTermList.map((term, key) => <div
                            className='filter-sub-item flex-start-center'
                            key={key}
                            onClick={() => this.selectLongTermHandle(term.id)}
                        >
                            <div className='filter-item-rest flex-rest'>
                                <div className='item-rest-description'>{term.name}</div>
                            </div>
                            <div className='filter-item-selected'>选择</div>
                        </div>
                        )}
                    </div>
                </div>
                }

                {
                    !!longTermId && <div className='detail-filter-item'>
                        <div className='filter-item-container flex-start-center'>
                            <div className='filter-item-rest flex-rest'>
                                <div className='item-rest-description'
                                    onClick={() => this.setState({ isSelectLongTerm: !isSelectLongTerm })}
                                >{longTermName}</div>
                            </div>
                            <div className='filter-item-cancel'
                                onClick={() => this.selectLongTermHandle(null)}
                            >取消</div>
                        </div>
                    </div>
                }

                {
                    !!deadlineTimestamp && <div className='detail-filter-item'>
                        <div className='filter-item-container flex-start-center'>
                            <div className='filter-item-rest flex-rest'
                                onClick={this.deadlineTimestampHandle}
                            >{this.renderDeadlineTimestamp()}</div>
                            <div className='filter-item-cancel'
                                onClick={() => setDeadline(null)}
                            >取消</div>
                        </div>
                    </div>
                }

                {
                    !!tag && <div className='detail-filter-item'>
                        <div className='filter-item-container flex-start-center'>
                            <div className='filter-item-rest flex-rest'
                                onClick={this.selectCategoryTag}
                            >{tag}</div>
                            <div className='filter-item-cancel'
                                onClick={() => setTag(null)}
                            >取消</div>
                        </div>
                    </div>
                }

                {
                    !!progress && <div className='detail-filter-item'>
                        <div className='filter-item-container flex-start-center'>
                            <div className='filter-item-rest flex-rest'
                                onClick={this.selectProgressHandle}
                            >{progress_const.valueToLable[progress] || progress}</div>
                            <div className='filter-item-cancel'
                                onClick={() => setProgress(null)}
                            >取消</div>
                        </div>
                    </div>
                }

                {
                    !!priority && <div className='detail-filter-item'>
                        <div className='filter-item-container flex-start-center'>
                            <div className='filter-item-rest flex-rest'
                                onClick={this.selectPriorityHnalde}
                            >{priority_const.valueToLable[priority] || priority}</div>
                            <div className='filter-item-cancel'
                                onClick={() => setPriority(null)}
                            >取消</div>
                        </div>
                    </div>
                }
            </div>
        </>
    }
}