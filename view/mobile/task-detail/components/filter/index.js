import DatePicker from './../../../../components/date-picker-sheet';
import FullscreenIframe from './../../../../components/fullscreen-iframe';
import toast from './../../../../components/toast';
import actionSheet from './../../../../components/action-sheet';

import timeTransformers from './../../../../../utils/time-transformers';
import { renderDeadlineTime } from './../../../utils/index';

import { getAllLongTerm } from './../../../../service/long-term';

import priority_const from './../../../../consts/priority';
import progress_const from './../../../../consts/progress';

export default class Filter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSelectLongTerm: false,
            longTermList: [],
        }
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const result = await getAllLongTerm()
        if (result instanceof Error || !result) {
            return
        }

        this.setState({ longTermList: result })
    }

    selectLongTermHandle = longTermId => {
        const { selectLongTerm } = this.props
        this.setState({ isSelectLongTerm: false })
        selectLongTerm(longTermId)
    }

    selectCategoryTag = async () => {
        toast.show()
        const { filterTags, setTag } = this.props

        const { MultipleCategoryTag } = await import('./../../../../components/page/multiple-category-tag/mobile.js')
        toast.destroy()

        const multipleCategoryTagInstance = new FullscreenIframe(MultipleCategoryTag, {
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
            isEdit,

            longTermId,
            longTermName,

            deadlineTimestamp,
            setDeadline,

            tag,
            setTag,

            progress,
            setProgress,
            selectProgressHandle,

            priority,
            setPriority,
        } = this.props

        if (!isEdit) {
            return <></>
        }

        return <div className='detail-filter'>
            {(!longTermId || !deadlineTimestamp || !tag || !progress || !priority) &&
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
                            onClick={selectProgressHandle}
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
                        >{renderDeadlineTime(+deadlineTimestamp)}</div>
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
                            onClick={selectProgressHandle}
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
        </div >
    }
}
