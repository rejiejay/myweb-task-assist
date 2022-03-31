import timeTransformers from './../../../../../utils/time-transformers';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    createIdentityTime = () => {
        const { data } = this.props
        let identityTime = new Date().getTime();
        if (data && data.createTimestamp) {
            identityTime = data.createTimestamp
        }
        if (data && data.updateTimestamp) {
            identityTime = data.updateTimestamp
        }

        return timeTransformers.dateToDiaryDetail(new Date(+identityTime))
    }

    render() {
        const { data } = this.props

        return <div className='preview-main'>
            <div className='preview-main-title'>
                <div className='main-title-container'>
                    {(data && data.title) || '-'}
                </div>
            </div>

            <div className='main-identity-time'>{this.createIdentityTime()}</div>

            <div className='preview-main-content'>
                <div className='main-content-container'>
                    {(
                        data &&
                        data.content &&
                        data.content.split('\n').map(
                            (item, i) => <p key={i}>{item}</p>
                        )
                    ) || '-'}
                </div>
            </div>

            {data && data.specific &&
                <div className='preview-main-smart'>
                    <div className='main-smart-container'>
                        <div className='main-smart-title'>明确Specific <span>(思考并明确then设定)</span></div>
                        <div className='main-smart-tip'>Tip:增强客户意识,到底指哪一块,没法评判,衡量.不如设定为减少客户投诉</div>
                        <div className='main-smart-content'>
                            {(
                                data &&
                                data.specific &&
                                data.specific.split('\n').map(
                                    (item, i) => <p key={i}>{item}</p>
                                )
                            ) || '-'}
                        </div>
                    </div>
                </div>
            }

            {data && data.measurable &&
                <div className='preview-main-smart'>
                    <div className='main-smart-container'>
                        <div className='main-smart-title'>衡量Measurable <span>(衡量思考then分解)</span></div>
                        <div className='main-smart-tip'>Tip:为所有的老员工安排“进一步”的管理培训,“进一步”是一个既不明确也不容易衡量的概念</div>
                        <div className='main-smart-content'>
                            {(
                                data &&
                                data.measurable &&
                                data.measurable.split('\n').map(
                                    (item, i) => <p key={i}>{item}</p>
                                )
                            ) || '-'}
                        </div>
                    </div>
                </div>
            }

            {data && data.attainable &&
                <div className='preview-main-smart'>
                    <div className='main-smart-container'>
                        <div className='main-smart-title'>接受Attainable <span>(能否被未来自己接受to思考)</span></div>
                        <div className='main-smart-tip'>Tip:今天的任务是不吃饭,当下可接受,未来肯定不行</div>
                        <div className='main-smart-content'>
                            {(
                                data &&
                                data.attainable &&
                                data.attainable.split('\n').map(
                                    (item, i) => <p key={i}>{item}</p>
                                )
                            ) || '-'}
                        </div>
                    </div>
                </div>
            }

            {data && data.relevant &&
                <div className='preview-main-smart'>
                    <div className='main-smart-container'>
                        <div className='main-smart-title'>相关性Relevant <span>(思考意义)</span></div>
                        <div className='main-smart-tip'>Tip:一个前台,你让他学日语,虽然有相关,但是请问意义？</div>
                        <div className='main-smart-content'>
                            {(
                                data &&
                                data.relevant &&
                                data.relevant.split('\n').map(
                                    (item, i) => <p key={i}>{item}</p>
                                )
                            ) || '-'}
                        </div>
                    </div>
                </div>
            }

            {data && data.timeBound &&
                <div className='preview-main-smart'>
                    <div className='main-smart-container'>
                        <div className='main-smart-title'>时限Time-bound <span>(如何安排)</span></div>
                        <div className='main-smart-tip'>Tip:我这辈子都去安排去考研</div>
                        <div className='main-smart-content'>
                            {(
                                data &&
                                data.timeBound &&
                                data.timeBound.split('\n').map(
                                    (item, i) => <p key={i}>{item}</p>
                                )
                            ) || '-'}
                        </div>
                    </div>
                </div>
            }
        </div>
    }
}
