import priority_const from './../../../../../consts/priority';
import progress_const from './../../../../../consts/progress';

import Modal from './../../../../../components/modal';
import toast from './../../../../../components/toast';
import actionSheet from './../../../../../components/action-sheet';

import { getTags } from './../../../../../service/task-tag';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterTags: [],
        }
    }

    componentDidMount() {
        this.initTags()
    }

    initTags = async () => {
        const result = await getTags()
        if (result instanceof Error || !result) {
            return
        }

        this.setState({ filterTags: result })
    }

    selectCategoryTag = async () => {
        toast.show()
        const { filterTags } = this.state
        const { tag, setTag } = this.props
        if (tag) return setTag('')

        const { MultipleCategoryTag } = await import('./../../../../../components/page/multiple-category-tag/mobile.js')
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
        const selectTag = result[0];
        setTag(selectTag.value)
    }

    selectProgressHandle = async () => {
        const { progress, setProgress } = this.props;
        if (progress) return setProgress('')
        const options = Object.values(progress_const.values).map(value => ({
            value,
            label: progress_const.valueToLable[value]
        }))
        const title = '请选择任务状态'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        const selectProgress = result.value
        setProgress(selectProgress)
    }

    selectPriorityHnalde = async () => {
        const { priority, setPriority } = this.props;
        if (priority) return setPriority('')

        const options = Object.values(priority_const.values).map(value => ({
            value,
            label: priority_const.valueToLable[value]
        }))
        const title = '请选择标签'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        const selectPriority = result.value
        setPriority(selectPriority)
    }

    render() {
        const { tag, progress, priority } = this.props

        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center">
                <div className="operat-item hover-item operat-main"
                    onClick={() => window.open('./long-term-list/')}
                >短期任务</div>
                <div className="operat-item hover-item"
                    onClick={this.selectCategoryTag}
                >{tag || '标签'}</div>
                <div className="operat-item hover-item"
                    onClick={this.selectPriorityHnalde}
                >{priority_const.valueToLable[priority] || priority || '优先级'}</div>
                <div className="operat-item hover-item"
                    onClick={this.selectProgressHandle}
                >{progress_const.valueToLable[progress] || progress || '状态'}</div>
            </div>

            <div className="operating-center flex-rest"></div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item"
                    onClick={() => window.open('./completed/')}
                >已经完成</div>
                <div className="operat-item hover-item"
                    onClick={() => window.open('./window-detail/')}
                >新增</div>
            </div>
        </div>
    }
}
