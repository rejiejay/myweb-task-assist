const ListRow = ({ left, right, clickTaskHandle }) => {
    return <div className="windows-list-row flex-rest">
        <div className="windows-list-left flex-column flex-rest">{left.map((item, key) =>
            <ListItem
                key={key}
                item={item}
                clickTaskHandle={clickTaskHandle}
            />
        )}</div>
        <div className="windows-list-right flex-column flex-rest">{right.map((item, key) =>
            <ListItem
                key={key}
                item={item}
                clickTaskHandle={clickTaskHandle}
            />
        )}</div>
    </div>
}

const ListItem = ({ item, clickTaskHandle }) => {
    return <div className="windows-list-item"
        onClick={() => clickTaskHandle(item.id)}
    >
        <div className="windows-item-container">
            <div className='windows-item-title'>{item.title}</div>
            {item.content && <div className='list-item-content'>任务具体内容: {item.content}</div>}
            {item.measurable && <div className='list-item-measurable'>任务完成标识: {item.measurable}</div>}
        </div>
    </div>
}

export default class QuadrantComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    initQuadrant() {
        const { data } = this.props
        const quadrant = {
            // urgent + important
            upXupY: [],
            // urgent + unimportant
            upXdowmY: [],
            // not urgent + important
            dowmXupY: [],
            // not urgent + unimportant
            dowmXdowmY: [],
        }

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.isUrgent && element.isImportant) {
                quadrant.upXupY.push(element);
            }
            if (element.isUrgent && !element.isImportant) {
                quadrant.upXdowmY.push(element);
            }
            if (!element.isUrgent && element.isImportant) {
                quadrant.dowmXupY.push(element);
            }
            if (!element.isUrgent && !element.isImportant) {
                quadrant.dowmXdowmY.push(element);
            }
        }

        return quadrant
    }

    render() {
        const quadrant = this.initQuadrant();
        const { clickTaskHandle } = this.props


        return <div className="windows-list-quadrant flex-column flex-rest">
            <ListRow
                left={quadrant.dowmXupY}
                right={quadrant.upXupY}
                clickTaskHandle={clickTaskHandle}
            />
            <ListRow
                left={quadrant.dowmXdowmY}
                right={quadrant.upXdowmY}
                clickTaskHandle={clickTaskHandle}
            />
        </div>
    }
}
