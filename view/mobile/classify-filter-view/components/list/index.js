import timeTransformers from '../../../../../utils/time-transformers';
import { filterViewClassifys } from './../../../const';
import consts_progress from './../../../../consts/progress';

const ItemComponent = ({
    height,
    width,
    data,
    selectHandle,
    isShowOperational,
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
        return <div className='filter-list-null flex-rest' style={{ height: `${height}px` }} />
    }

    const isHandle = data.progress === consts_progress.values.handle;

    return <div className='filter-list-item flex-rest flex-column'
        style={{
            height: `${height}px`,
            width: `${width}px`,
            borderColor: isHandle ? '#1890ff' : '#ddd',
        }}
    >
        <div className='list-item-title'
            onClick={() => selectHandle(data)}
        >
            <div className='item-title-container'>{(data && data.title) || '-'}</div>
        </div>
        <div className='list-item-main flex-rest flex-start'>
            {isShowOperational ?
                <>
                    <div className='item-main-content flex-rest'
                        onClick={() => selectHandle(data)}
                        style={{
                            height: `${height - 65}px`,
                            width: `${width - 40}px`,
                        }}
                    >
                        <div className='main-content-container'>
                            {(data && data.content) || '-'}
                        </div>
                    </div>
                    <div className='item-main-operate flex-column'>
                        <div className='main-operate-item flex-rest flex-center'>
                            <svg className="main-operate-icon"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                            >
                                <path d="M862.464 161.536l-700.928 0c-30.976 0-56.096-25.12-56.096-56.096l0-28.064c0-30.944 25.12-56.064 56.096-56.064l700.896 0c30.976 0 56.096 25.12 56.096 56.064l0 28.032c0 31.008-25.12 56.096-56.096 56.096l0 0 0 0zM138.528 531.68c0 0 306.816-245.792 309.888-248.864 14.304-13.888 31.904-22.368 49.952-25.312 1.76-0.32 3.488-0.608 5.248-0.8 2.816-0.32 5.6-0.352 8.384-0.352 2.816-0.032 5.568 0.032 8.352 0.352 1.792 0.192 3.552 0.48 5.28 0.8 18.048 2.976 35.616 11.424 49.92 25.312 3.104 3.008 309.856 248.864 309.856 248.864 33.152 32.224 30.304 65.44-2.784 97.696s-77.376 3.04-110.496-29.216l-190.08-150.432 0 496.864c0 31.008-25.088 56.096-56.096 56.096l-28 0c-30.976 0-56.096-25.12-56.096-56.096l0-496.864-190.048 150.432c-33.088 32.288-77.408 61.536-110.496 29.216-33.056-32.256-35.872-65.44-2.816-97.696l0 0 0 0z" fill='#909399'></path>
                            </svg>
                        </div>
                        <div className='main-operate-item flex-rest flex-center'>
                            <svg className="main-operate-icon"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                            >
                                <path d="M896 849.066667c4.266667 25.6-12.8 46.933333-38.4 46.933333h-682.666667c-25.6 0-46.933333-17.066667-46.933333-42.666667s21.333333-42.666667 46.933333-42.666666h674.133334c21.333333-4.266667 42.666667 12.8 46.933333 38.4zM362.666667 362.666667L469.333333 256v426.666667c0 25.6 17.066667 42.666667 42.666667 42.666666s42.666667-17.066667 42.666667-42.666666V256l106.666666 106.666667c17.066667 17.066667 42.666667 17.066667 59.733334 0 17.066667-17.066667 17.066667-42.666667 0-59.733334l-153.6-149.333333c-8.533333-17.066667-34.133333-25.6-55.466667-25.6h-4.266667c-21.333333 0-38.4 8.533333-55.466666 25.6L302.933333 302.933333c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733334 0z" fill='#909399'></path>
                            </svg>
                        </div>
                        <div className='main-operate-item flex-rest flex-center'>
                            <svg className="main-operate-icon"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                            >
                                <path d="M896 170.666667c0 25.6-21.333333 42.666667-46.933333 42.666666H174.933333C149.333333 213.333333 128 196.266667 128 170.666667s21.333333-42.666667 46.933333-42.666667h674.133334c25.6 0 46.933333 17.066667 46.933333 42.666667z m-230.4 490.666666L554.666667 768V341.333333c0-25.6-17.066667-42.666667-42.666667-42.666666s-42.666667 17.066667-42.666667 42.666666v426.666667l-106.666666-106.666667c-17.066667-17.066667-42.666667-17.066667-59.733334 0-17.066667 17.066667-17.066667 42.666667 0 59.733334l153.6 149.333333c12.8 17.066667 34.133333 25.6 55.466667 25.6s42.666667-8.533333 59.733333-25.6l149.333334-149.333333c17.066667-17.066667 17.066667-42.666667 0-59.733334-12.8-17.066667-38.4-17.066667-55.466667 0z" fill='#909399'></path>
                            </svg>
                        </div>
                    </div>
                </>
                :
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
            }
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
    isShowOperational
}) => <div className='filter-list-row flex-start'>
        <ItemComponent
            height={height}
            width={width}
            data={data[0] || null}
            selectHandle={selectHandle}
            isShowOperational={isShowOperational}
        />
        <div className='list-row-separate' />
        <ItemComponent
            height={height}
            width={width}
            data={data[1] || null}
            selectHandle={selectHandle}
            isShowOperational={isShowOperational}
        />
    </div>

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const headerHeight = 45 + 1 + 32 + 1
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
        const { data, selectHandle, classifyFilterViewStatus } = this.props

        if (!data || !(data instanceof Array)) {
            return <></>
        }

        return <>
            <RowComponent key='row1'
                height={itemHeight}
                width={itemWidth}
                data={[data[0], data[1]].filter(i => !!i)}
                selectHandle={selectHandle}
                isShowOperational={classifyFilterViewStatus === filterViewClassifys.unCategorized}
            />
            <RowComponent key='row2'
                height={itemHeight}
                width={itemWidth}
                data={[data[2], data[3]].filter(i => !!i)}
                selectHandle={selectHandle}
                isShowOperational={classifyFilterViewStatus === filterViewClassifys.unCategorized}
            />
            <RowComponent key='row3'
                height={itemHeight}
                width={itemWidth}
                data={[data[4], data[5]].filter(i => !!i)}
                selectHandle={selectHandle}
                isShowOperational={classifyFilterViewStatus === filterViewClassifys.unCategorized}
            />
            <RowComponent key='row4'
                height={itemHeight}
                width={itemWidth}
                data={[data[6], data[7]].filter(i => !!i)}
                selectHandle={selectHandle}
                isShowOperational={classifyFilterViewStatus === filterViewClassifys.unCategorized}
            />
        </>
    }
}
