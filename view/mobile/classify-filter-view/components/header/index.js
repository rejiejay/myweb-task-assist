import FullscreenIframe from './../../../../components/fullscreen-iframe';
import toast from './../../../../components/toast';
import actionSheet from './../../../../components/action-sheet';

import { getTags } from './../../../../service/task-tag';

import priority_const from './../../../../consts/priority';
import progress_const from './../../../../consts/progress';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterTags: []
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
        const { setTag } = this.props

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

    selectProgressHnalde = async () => {
        const { progress, setProgress } = this.props;

        if (progress) {
            return setProgress(null)
        }

        const options = Object.values(progress_const.values).map(value => ({
            value,
            label: progress_const.valueToLable[value]
        }))
        const title = '请选择任务状态'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        setProgress(result.value)
    }

    selectPriorityHnalde = async () => {
        const { priority, setPriority } = this.props;

        if (priority) {
            return setPriority(null)
        }

        const options = Object.values(priority_const.values).map(value => ({
            value,
            label: priority_const.valueToLable[value]
        }))
        const title = '请选择标签'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        setPriority(result.value)
    }

    activeProcessFilterHandle = () => {
        const { progress, setProgress } = this.props;
        if (progress === progress_const.values.handle) {
            return setProgress(null)
        }
        setProgress(progress_const.values.handle)
    }

    render() {
        const {
            title,

            tag,

            priority,

            progress,
        } = this.props

        const isFilterProcess = progress === progress_const.values.handle

        return <>
            <div className='list-header-top flex-start-center'>
                <div className='header-top-left flex-rest flex-start'>
                    <div className='top-left-item flex-start-center' onClick={() => window.history.back()}>
                        <svg className="header-back-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                            <path d="M351.080548 525.384887 743.262807 133.202628C759.532765 116.93267 759.951517 89.498954 743.289109 72.836547 727.114066 56.661504 699.599924 56.185954 682.923028 72.862849L260.597176 495.188701C260.592789 495.193088 260.588409 495.197469 260.584088 495.20191 260.579641 495.206236 260.575261 495.210617 260.57088 495.214997 252.487594 503.298283 248.325109 514.213393 248.264661 525.192566 248.183184 536.211472 252.244232 547.228128 260.57088 555.554776 260.575285 555.559181 260.57969 555.563586 260.584034 555.56793 260.588439 555.572335 260.592844 555.57674 260.597188 555.581084L682.923083 977.906979C699.19304 994.176936 726.626738 994.595598 743.289109 977.933227 759.464177 961.758159 759.939751 934.244089 743.262861 917.5672L351.080548 525.384887Z" fill='#909399'></path>
                        </svg>
                        <div className='left-item-name'>{title || '返回'}</div>
                    </div>
                </div>
                <div className='header-top-right flex-start'>
                    <div className='top-right-item flex-start-center' onClick={this.activeProcessFilterHandle}>
                        <div className={`right-item-description ${isFilterProcess && 'item-description-active'}`}>进行中</div>
                        {isFilterProcess && <svg className="item-process-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                            <path d="M298.48 244c-27.61 0-50 22.39-50 50v585h585c27.61 0 50-22.39 50-50V244h-585z" fill="#E9F1FF"></path>
                            <path d="M829.38 904.32h-635c-41.35 0-75-33.65-75-75v-635c0-41.35 33.65-75 75-75h635c41.35 0 75 33.65 75 75v635c0 41.36-33.64 75-75 75z m-635-735c-13.79 0-25 11.21-25 25v635c0 13.79 11.21 25 25 25h635c13.79 0 25-11.21 25-25v-635c0-13.79-11.21-25-25-25h-635z" fill="#2C5CCB"></path>
                            <path d="M252.91 241.01m-29.31 0a29.31 29.31 0 1 0 58.62 0 29.31 29.31 0 1 0-58.62 0Z" fill="#2C5CCB"></path>
                            <path d="M339.31 241.01m-29.31 0a29.31 29.31 0 1 0 58.62 0 29.31 29.31 0 1 0-58.62 0Z" fill="#2C5CCB"></path>
                            <path d="M425.7 241.01m-29.31 0a29.31 29.31 0 1 0 58.62 0 29.31 29.31 0 1 0-58.62 0Z" fill="#2C5CCB"></path>
                            <path d="M144.91 312.45h732.52v50H144.91z" fill="#2C5CCB"></path>
                            <path d="M304.98 636.59c-6.1 0-12.2-2.22-17.01-6.68l-56.5-52.46c-10.12-9.4-10.7-25.21-1.31-35.33 9.4-10.12 25.21-10.7 35.33-1.31l38.84 36.07 98.68-98.68c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36L322.66 629.27a24.933 24.933 0 0 1-17.68 7.32zM417 743.32H252.18c-13.81 0-25-11.19-25-25s11.19-25 25-25H417c13.81 0 25 11.19 25 25s-11.19 25-25 25zM775.28 485.84h-227.7c-13.81 0-25-11.19-25-25s11.19-25 25-25h227.7c13.81 0 25 11.19 25 25s-11.19 25-25 25zM775.28 614.58h-227.7c-13.81 0-25-11.19-25-25s11.19-25 25-25h227.7c13.81 0 25 11.19 25 25s-11.19 25-25 25zM775.28 743.32h-227.7c-13.81 0-25-11.19-25-25s11.19-25 25-25h227.7c13.81 0 25 11.19 25 25s-11.19 25-25 25z" fill="#2C5CCB"></path>
                        </svg>}
                    </div>
                </div>
            </div>
            <div className='list-header-filter flex-start-center'>
                <div className='header-filter-left flex-rest flex-start'>
                    <div className='filter-left-item flex-start-center'
                        onClick={this.selectCategoryTag}
                    >{tag || '标签'}</div>
                    <div className='filter-left-item flex-start-center'
                        onClick={this.selectPriorityHnalde}
                    >{priority_const.valueToLable[priority] || '优先级'}</div>
                </div>
                <div className='header-filter-right flex-start'>
                    {!isFilterProcess && <div className='filter-right-item flex-start-center'
                        onClick={this.selectProgressHnalde}
                    >
                        {progress_const.valueToLable[progress] || '状态'}
                    </div>}
                </div>
            </div>
        </>
    }
}
