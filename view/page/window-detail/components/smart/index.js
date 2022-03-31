export default class SmartComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
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

        return <>
            <div className='detail-main-smart' />
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
        </>
    }
}