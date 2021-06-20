const ListRow = ({ left, right }) => {
    return <div className="windows-list-row flex-start flex-rest">
        <div className="windows-list-left flex-column flex-rest">{left.map((item, key) =>
            <ListItem key={key} item={item} />
        )}</div>
        <div className="windows-list-right flex-column flex-rest">{right.map((item, key) =>
            <ListItem key={key} item={item} />
        )}</div>
    </div>
}

const ListItem = ({ item }) => {
    return <div className="windows-list-item flex-rest">item</div>
}

export default class QuadrantComponent extends React.Component {
    constructor(props) {
        super(props)
        const item = {}
        this.state = {
            quadrant: {
                // urgent + important
                upXupY: [item, item, item, item],
                // urgent + unimportant
                upXdowmY: [item, item, item, item],
                // not urgent + important
                dowmXupY: [item, item, item, item],
                // not urgent + unimportant
                dowmXdowmY: [item, item, item, item],
            }
        }
    }

    render() {
        const { quadrant } = this.state;
        return <div className="windows-list-quadrant flex-column flex-rest">
            <ListRow left={quadrant.dowmXupY} right={quadrant.upXupY} />
            <ListRow left={quadrant.dowmXdowmY} right={quadrant.upXdowmY} />
        </div>
    }
}
