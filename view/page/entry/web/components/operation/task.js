const Item = ({ field, value }) => {
    const newText = text => text && text.split('\n').map((item, i) => <p key={i}>{item}</p>)

    if (!value) return <></>
    let description = '';

    switch (field) {
        case 'content':
            description = '任务结论';
            break;
        case 'specific':
            description = '任务具体内容';
            break;
        case 'measurable':
            description = '任务完成标识';
            break;
        case 'attainable':
            description = '任务是否可以实现';
            break;
        case 'relevant':
            description = '任务和哪些需求相关';
            break;
        case 'timeBound':
            description = '明确的截止期限';
            break;
        default:
            break;
    }

    return <div className="operation-taks-item">
        <p key={field}>{description}:</p>
        {newText(value)}
    </div>
}

export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, content, specific, measurable, attainable, relevant, timeBound } = this.props

        return <div className="main-operation-block">
            <div className="operation-taks">
                <div className="operation-taks-title">{title}</div>
                <Item field="content" value={content} />
                <Item field="specific" value={specific} />
                <Item field="measurable" value={measurable} />
                <Item field="attainable" value={attainable} />
                <Item field="relevant" value={relevant} />
                <Item field="timeBound" value={timeBound} />
            </div>
        </div>
    }
}
