const ListRow = ({ row, clickTaskHandle }) => {
    return <div className="windows-list-row flex-rest">{row.map((item, key) =>
        <ListItem key={key}
            item={item}
            clickTaskHandle={clickTaskHandle}
        />
    )}</div>
}

const ListItem = ({ item, clickTaskHandle }) => {
    if (item.isEmpty) {
        return <div className="windows-list-item flex-rest" />
    }
    const { id, title, content, specific, measurable, attainable, relevant, timeBound } = item

    const ItemDescription = ({ field, value }) => {
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

        return <div className={`list-item-${field}`}
            onClick={() => clickTaskHandle(id)}
        >
            <p key={field}>{description}:</p>
            {
                value
                    .split('\n')
                    .map(
                        (item, i) => <p key={i}>{item}</p>
                    )
            }
        </div>
    }

    return <div className="windows-list-item flex-rest">
        <div className='list-item-container'>
            <div className='list-item-title'>{title}</div>
            {/* <ItemDescription field='content' value={content} /> */}
            <ItemDescription field='specific' value={specific} />
            <ItemDescription field='measurable' value={measurable} />
            <ItemDescription field='attainable' value={attainable} />
            <ItemDescription field='relevant' value={relevant} />
            <ItemDescription field='timeBound' value={timeBound} />
        </div>

    </div>
}

const emptyItem = {
    isEmpty: true
}

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    initList() {
        const { data } = this.props
        const initItem = (item = emptyItem) => {
            return item
        }

        const rows = []
        for (let i = 0; i < 3; i++) {
            const items = []
            for (let j = 0; j < 3; j++) {
                const index = j + (3 * i);
                items.push(initItem(data[index]))
            }
            rows.push(items)
        }

        return rows
    }

    render() {
        const list = this.initList();
        const { clickTaskHandle } = this.props

        return <div className="windows-list-content flex-column flex-rest">{list.map((row, key) =>
            <ListRow key={key}
                row={row}
                clickTaskHandle={clickTaskHandle}
            />
        )}</div>
    }
}
