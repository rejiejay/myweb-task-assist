import timeTransformers from '../../../../../utils/time-transformers';

const ItemComponent = ({
    height,
    width,
    data,
    selectHandle,
}) => {
    const renderItemTime = () => {
        let identityTime = new Date().getTime();
        if (data && data.createTimestamp) {
            identityTime = data.createTimestamp
        }
        if (data && data.updateTimestamp) {
            identityTime = data.updateTimestamp
        }

        return timeTransformers.dateToTaskDetail(new Date(+identityTime))
    }
    if (!data) {
        return <div className='completed-view-null flex-rest' style={{ height: `${height}px` }} />
    }

    return <div className='completed-view-item flex-rest flex-column'
        style={{
            height: `${height}px`,
            width: `${width}px`,
        }}
    >
        <div className='list-item-title'
            onClick={() => selectHandle(data)}
        >
            <div className='item-title-container'>{(data && data.title) || '-'}</div>
        </div>
        <div className='list-item-main flex-rest flex-start'>
            <div className='item-main-content flex-rest'
                onClick={() => selectHandle(data)}
                style={{
                    height: `${height - 65}px`,
                    width: `${width}px`,
                }}
            >
                <div className='main-content-container'>
                    {(data && data.content) || '-'}
                </div>
            </div>
        </div>
        <div className='list-item-time'
            onClick={() => selectHandle(data)}
        >
            <div className='item-time-container'>{renderItemTime()}</div>
        </div>
    </div>
}

const RowComponent = ({
    height,
    width,
    data,
    selectHandle,
}) => <div className='completed-view-row flex-start'>
        <ItemComponent
            height={height}
            width={width}
            data={data[0] || null}
            selectHandle={selectHandle}
        />
        <div className='list-row-separate' />
        <ItemComponent
            height={height}
            width={width}
            data={data[1] || null}
            selectHandle={selectHandle}
        />
    </div>

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const headerHeight = 32 + 1
        const bottomHeight = 45 + 1

        const containerHeight = clientHeight - headerHeight - bottomHeight
        const paddingHeight = (5 * 15) + (4 * 2)
        this.itemHeight = Math.floor((containerHeight - paddingHeight) / 4)

        const clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
        const paddingWidth = (3 * 15) + (4 * 2)
        this.itemWidth = Math.floor((clientWidth - paddingWidth) / 2)
    }

    render() {
        const { itemHeight, itemWidth } = this
        const { data, selectHandle } = this.props

        if (!data || !(data instanceof Array)) {
            return <></>
        }

        return <>
            <RowComponent key='row1'
                height={itemHeight}
                width={itemWidth}
                data={[data[0], data[1]].filter(i => !!i)}
                selectHandle={selectHandle}
            />
            <RowComponent key='row2'
                height={itemHeight}
                width={itemWidth}
                data={[data[2], data[3]].filter(i => !!i)}
                selectHandle={selectHandle}
            />
            <RowComponent key='row3'
                height={itemHeight}
                width={itemWidth}
                data={[data[4], data[5]].filter(i => !!i)}
                selectHandle={selectHandle}
            />
            <RowComponent key='row4'
                height={itemHeight}
                width={itemWidth}
                data={[data[6], data[7]].filter(i => !!i)}
                selectHandle={selectHandle}
            />
        </>
    }
}
