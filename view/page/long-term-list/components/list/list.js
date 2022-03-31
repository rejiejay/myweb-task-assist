const ListRow = ({ row, clickItemHandle, listRowHeight, listItemWidth }) => {
    return <div className="windows-list-row"
        style={{ height: `${listRowHeight}px` }}
    >{row.map((item, key) =>
        <ListItem key={key}
            item={item}
            listItemWidth={listItemWidth}
            clickItemHandle={clickItemHandle}
        />
    )}</div>
}

const ListItem = ({ item, clickItemHandle, listItemWidth }) => {
    const { id, name, description, isEmpty } = item
    const width = `${listItemWidth}px`

    if (isEmpty) {
        return <div className="windows-list-item flex-rest" style={{ width }} />
    }

    return <div className="windows-list-item"
        onClick={() => clickItemHandle(id)}
        style={{ width }}
    >
        <div className='list-item-container'>
            <div className='list-item-title'>{name}</div>
            <div className='list-item-field'>{description || '-'}</div>
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

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth

        const previewWidth = 451
        this.listRowHeight = Math.floor((clientHeight - 120) / 3);
        this.listItemWidth = Math.floor((clientWidth - previewWidth - 2) / 3);
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
        const { clickItemHandle } = this.props
        const { listRowHeight, listItemWidth } = this

        return <div className="windows-list-content flex-column flex-rest">{list.map((row, key) =>
            <ListRow key={key}
                row={row}
                listRowHeight={listRowHeight}
                listItemWidth={listItemWidth}
                clickItemHandle={clickItemHandle}
            />
        )}</div>
    }
}
