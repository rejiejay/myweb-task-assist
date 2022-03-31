import timeTransformers from './../../../../../utils/time-transformers';

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const paddingHeight = 35 + 45
        this.contentHeight = clientHeight - paddingHeight
    }

    renderIdentityTime = () => {
        const { identityTime } = this.props

        if (identityTime && +identityTime) {
            return timeTransformers.dateToDiaryDetail(new Date(+identityTime))
        }

        return timeTransformers.dateToDiaryDetail(new Date())
    }

    render() {
        const {
            title,
            setTitle,
            content,
            setContent,
        } = this.props
        const { contentHeight } = this
        return <>
            <div className="windows-main-title flex-start-center">
                <div className='main-title-container'>
                    <input type="text" placeholder="简单描述/提问"
                        value={title}
                        onChange={({ target: { value } }) => setTitle(value)}
                    />
                </div>
            </div>
            <div className='main-identity-time'>{this.renderIdentityTime()}</div>
            <div className="windows-main-content"
                style={{ height: `${contentHeight}px` }}

            >
                <div className='main-content-container'>
                    <textarea className="content-textarea flex-rest" type="text"
                        placeholder='详细描述与任务是什么?为什么?怎么做?'
                        style={{ height: `${contentHeight}px` }}
                        value={content}
                        onChange={({ target: { value } }) => setContent(value)}
                    ></textarea>
                </div>
            </div>
        </>
    }
}