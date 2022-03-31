import timeTransformers from '../../../../../utils/time-transformers';
import Confirm from './../../../../components/confirm';

import {
    setTaskLongTermProgram
} from '../../../../service/task';
export default class TaskPreView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',

            timestamp: new Date().getTime(),

            title: '',

            content: '',

            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            isShowProgramSelect: false
        }
    }

    init = data => {
        this.setState({
            id: data.id,

            timestamp: data.deadlineTimestamp || data.updateTimestamp || data.createTimestamp,

            title: data.title,
            content: data.content,

            specific: data.specific,
            measurable: data.measurable,
            attainable: data.attainable,
            relevant: data.relevant,
            timeBound: data.timeBound,
        })
    }

    renderTime = () => {
        const { timestamp } = this.state
        return timeTransformers.dateToDiaryDetail(new Date(+timestamp || 0))
    }

    selectLongTermProgramHandle = async longTermProgramId => {
        const { initAll } = this.props
        const { id } = this.state
        if (longTermProgramId === false) {
            return this.setState({ isShowProgramSelect: false })
        }
        const result = await setTaskLongTermProgram(id, longTermProgramId);
        this.setState({ isShowProgramSelect: false })
        if (result instanceof Error) return Confirm(result.message)
        initAll()
    }

    editHandle = id => window.open(`./../window-detail/?id=${id}`)

    render() {
        const {
            id,
            title,
            content,
            specific,
            measurable,
            attainable,
            relevant,
            timeBound,
            isShowProgramSelect
        } = this.state
        const { longTermProgramList } = this.props

        return <>
            <div className="preview-header flex-start-center noselect">
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={() => this.editHandle(id)}
                >编辑</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={() => this.setState({ isShowProgramSelect: true })}
                >分配类别</div>
            </div>
            {!!isShowProgramSelect && <>
                <div
                    className='select-long-term-Program flex-start-center'
                    onClick={() => this.selectLongTermProgramHandle(false)}
                >
                    <div className='long-term-program-select-rest flex-rest flex-center'>
                        <div className='item-rest-description'>取消</div>
                    </div>
                </div>
                <div
                    className='select-long-term-Program flex-start-center'
                    onClick={() => this.selectLongTermProgramHandle('null')}
                >
                    <div className='long-term-program-select-rest flex-rest flex-center'>
                        <div className='item-rest-description'>未分类</div>
                    </div>
                </div>
                {longTermProgramList.map((term, key) => <div
                    className='select-long-term-Program flex-start-center'
                    key={key}
                    onClick={() => this.selectLongTermProgramHandle(term.id)}
                >
                    <div className='long-term-program-select-rest flex-rest'>
                        <div className='item-rest-description'>{term.name}</div>
                    </div>
                    <div className='long-term-program-select-selected'>选择</div>
                </div>
                )}
            </>}
            <div className="preview-container flex-rest">
                <div className="preview-container-title">
                    <p>{title || ''}</p>
                </div>
                <div className="preview-container-main">
                    <div className="preview-container-timestamp">{this.renderTime()}</div>
                    <div className="preview-container-content">{
                        content && content
                            .split('\n')
                            .map(
                                (item, i) => <p key={i}>{item}</p>
                            ) || ''
                    }</div>
                    <div className="preview-container-description">
                        {specific &&
                            <div className='preview-main-smart'>
                                <div className='main-smart-container'>
                                    <div className='main-smart-title'>明确Specific <span>(思考并明确then设定)</span></div>
                                    <div className='main-smart-tip'>Tip:增强客户意识,到底指哪一块,没法评判,衡量.不如设定为减少客户投诉</div>
                                    <div className='main-smart-content'>
                                        {(
                                            specific.split('\n').map(
                                                (item, i) => <p key={i}>{item}</p>
                                            )
                                        ) || '-'}
                                    </div>
                                </div>
                            </div>
                        }

                        {measurable &&
                            <div className='preview-main-smart'>
                                <div className='main-smart-container'>
                                    <div className='main-smart-title'>衡量Measurable <span>(衡量思考then分解)</span></div>
                                    <div className='main-smart-tip'>Tip:为所有的老员工安排“进一步”的管理培训,“进一步”是一个既不明确也不容易衡量的概念</div>
                                    <div className='main-smart-content'>
                                        {(
                                            measurable.split('\n').map(
                                                (item, i) => <p key={i}>{item}</p>
                                            )
                                        ) || '-'}
                                    </div>
                                </div>
                            </div>
                        }

                        {attainable &&
                            <div className='preview-main-smart'>
                                <div className='main-smart-container'>
                                    <div className='main-smart-title'>接受Attainable <span>(能否被未来自己接受to思考)</span></div>
                                    <div className='main-smart-tip'>Tip:今天的任务是不吃饭,当下可接受,未来肯定不行</div>
                                    <div className='main-smart-content'>
                                        {(
                                            attainable.split('\n').map(
                                                (item, i) => <p key={i}>{item}</p>
                                            )
                                        ) || '-'}
                                    </div>
                                </div>
                            </div>
                        }

                        {relevant &&
                            <div className='preview-main-smart'>
                                <div className='main-smart-container'>
                                    <div className='main-smart-title'>相关性Relevant <span>(思考意义)</span></div>
                                    <div className='main-smart-tip'>Tip:一个前台,你让他学日语,虽然有相关,但是请问意义？</div>
                                    <div className='main-smart-content'>
                                        {(
                                            relevant.split('\n').map(
                                                (item, i) => <p key={i}>{item}</p>
                                            )
                                        ) || '-'}
                                    </div>
                                </div>
                            </div>
                        }

                        {timeBound &&
                            <div className='preview-main-smart'>
                                <div className='main-smart-container'>
                                    <div className='main-smart-title'>时限Time-bound <span>(如何安排)</span></div>
                                    <div className='main-smart-tip'>Tip:我这辈子都去安排去考研</div>
                                    <div className='main-smart-content'>
                                        {(
                                            timeBound.split('\n').map(
                                                (item, i) => <p key={i}>{item}</p>
                                            )
                                        ) || '-'}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    }
}
