const ListRow = ({ row }) => {
    return <div className="windows-list-row flex-rest">{row.map((item, key) =>
        <ListItem key={key} item={item} />
    )}</div>
}

const ListItem = ({ item }) => {
    return <div className="windows-list-item flex-rest">item</div>
}

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props)
        const item = {}
        this.state = {
            list: [
                [item, item, item],
                [item, item, item],
                [item, item, item],
            ]
        }
    }

    render() {
        const { list } = this.state;
        return <div className="windows-list-content flex-column flex-rest">{list.map((row, key) =>
            <ListRow key={key} row={row} />
        )}</div>
    }
}
