import timeTransformers from './../../../../../utils/time-transformers';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const paddingHeight = 35 + 45
        this.contentHeight = (clientHeight - paddingHeight) / 2
    }

    renderIdentityTime = () => {
        const { identityTime } = this.props

        if (identityTime && +identityTime) {
            return timeTransformers.dateToDiaryDetail(new Date(+identityTime))
        }

        return timeTransformers.dateToDiaryDetail(new Date())
    }

    render() {
        const { contentHeight } = this
        const {
            title,
            setTitle,

            content,
            setContent,

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
        } = this.props

        return <div className='detail-main'>
            <div className='detail-main-title'>
                <div className='main-title-container'>
                    <input type="text" placeholder="简单描述/提问"
                        value={title}
                        onChange={({ target: { value } }) => setTitle(value)}
                    />
                </div>
            </div>

            <div className='main-identity-time'>{this.renderIdentityTime()}</div>

            <div className='detail-main-content'>
                <div className='main-content-container'>
                    <textarea className="content-textarea flex-rest" type="text"
                        placeholder='详细描述与任务是什么?为什么?怎么做?'
                        style={{ height: `${contentHeight}px` }}
                        value={content}
                        onChange={({ target: { value } }) => setContent(value)}
                    ></textarea>
                </div>
            </div>

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

            {!!specific && <div className='detail-main-smart'>
                <div className='main-smart-container'>
                    <div className='main-smart-title'>明确Specific <span>(思考并明确then设定)</span></div>
                    <div className='main-smart-tip'>Tip:增强客户意识,到底指哪一块,没法评判,衡量.不如设定为减少客户投诉</div>
                    <div className='main-smart-content'>
                        <textarea className="content-textarea flex-rest" type="text"
                            placeholder='能否明确性，如不能请明确，如可以请补充'
                            style={{ minHeight: '60px' }}
                            value={specific}
                            onChange={({ target: { value } }) => setSpecific(value)}
                        ></textarea>
                    </div>
                </div>
            </div>}

            {!!measurable && <div className='detail-main-smart'>
                <div className='main-smart-container'>
                    <div className='main-smart-title'>衡量Measurable <span>(衡量思考then分解)</span></div>
                    <div className='main-smart-tip'>Tip:为所有的老员工安排“进一步”的管理培训,“进一步”是一个既不明确也不容易衡量的概念</div>
                    <div className='main-smart-content'>
                        <textarea className="content-textarea flex-rest" type="text"
                            placeholder='能否衡量，如不能请思考，如可以请补充'
                            style={{ minHeight: '60px' }}
                            value={measurable}
                            onChange={({ target: { value } }) => setMeasurable(value)}
                        ></textarea>
                    </div>
                </div>
            </div>}

            {!!attainable && <div className='detail-main-smart'>
                <div className='main-smart-container'>
                    <div className='main-smart-title'>接受Attainable <span>(能否被未来自己接受to思考)</span></div>
                    <div className='main-smart-tip'>Tip:今天的任务是不吃饭,当下可接受,未来肯定不行</div>
                    <div className='main-smart-content'>
                        <textarea className="content-textarea flex-rest" type="text"
                            placeholder='能否被未来自己接受，请思考'
                            style={{ minHeight: '60px' }}
                            value={attainable}
                            onChange={({ target: { value } }) => setAttainable(value)}
                        ></textarea>
                    </div>
                </div>
            </div>}

            {!!relevant && <div className='detail-main-smart'>
                <div className='main-smart-container'>
                    <div className='main-smart-title'>相关性Relevant <span>(思考意义)</span></div>
                    <div className='main-smart-tip'>Tip:一个前台,你让他学日语,虽然有相关,但是请问意义？</div>
                    <div className='main-smart-content'>
                        <textarea className="content-textarea flex-rest" type="text"
                            placeholder='相关性如何，请思考，并且补充'
                            style={{ minHeight: '60px' }}
                            value={relevant}
                            onChange={({ target: { value } }) => setRelevant(value)}
                        ></textarea>
                    </div>
                </div>
            </div>}

            {!!timeBound && <div className='detail-main-smart'>
                <div className='main-smart-container'>
                    <div className='main-smart-title'>时限Time-bound <span>(如何安排)</span></div>
                    <div className='main-smart-tip'>Tip:我这辈子都去安排去考研</div>
                    <div className='main-smart-content'>
                        <textarea className="content-textarea flex-rest" type="text"
                            placeholder='时限如何安排，请思考，并且补充'
                            style={{ minHeight: '60px' }}
                            value={timeBound}
                            onChange={({ target: { value } }) => setTimeBound(value)}
                        ></textarea>
                    </div>
                </div>
            </div>
            }
        </div>
    }
}
