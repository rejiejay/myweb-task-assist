
import timeTransformers from './../../../../../utils/time-transformers';

import priority_const from './../../../../consts/priority';
import progress_const from './../../../../consts/progress';

const ItemComponent = ({ height, data, selectHandle }) => {

    const createIdentityTime = () => {
        let identityTime = new Date().getTime();
        if (data && data.createTimestamp) {
            identityTime = data.createTimestamp
        }
        if (data && data.updateTimestamp) {
            identityTime = data.updateTimestamp
        }

        return timeTransformers.dateToDiaryDetail(new Date(+identityTime))
    }

    return <div className='randomly-item-container'
        style={{
            height: `${height}px`,
        }}
    >
        <div className='randomly-list-item'>
            <div className='list-item-title'>
                <div className='item-title-container'>{(data && data.title) || '-'}</div>
            </div>
            <div className='list-item-time'>
                <div className='item-time-container'>{createIdentityTime()}</div>
            </div>

            <div className='list-item-main'
                style={{
                    height: `${height - 124}px`,
                }}>
                <div className='item-main-container'>
                    <div className='item-main-content'>
                        {(data && data.content) || '-'}
                    </div>
                </div>
            </div>

            <div className="list-item-operating flex-start-center">
                <div className="operating-left flex-rest flex-start-center">
                    <div className="operating-left-item">
                        <div className="left-item-description">{progress_const.valueToLable[data.progress || ''] || '状态'}</div>
                    </div>
                    <div className="operating-left-item">
                        <div className="left-item-description">{priority_const.valueToLable[data.priority || ''] || '优先级'}</div>
                    </div>
                    <div className="operating-left-item">
                        <div className="left-item-description">{data.tag || '标签'}</div>
                    </div>
                </div>
                <div className="operating-edit flex-center"
                    onClick={selectHandle}
                >编辑</div>
            </div>
        </div>
    </div>
}

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const paddingHeight = 36 + 16 + 16 + 25
        this.itemHeight = clientHeight - paddingHeight
    }

    render() {
        const {
            loadMoreHandle,
            list,
            count,
            selectHandle
        } = this.props
        const { itemHeight } = this

        return <div className='randomly-list'>
            {list.map((item, key) =>
                <ItemComponent key={`${key}-${item.id}`}
                    height={itemHeight}
                    data={item}
                    selectHandle={() => selectHandle(item)}
                />
            )}
            <div className='randomly-list-load'>
                <div className='list-load-container flex-center'
                    onClick={loadMoreHandle}
                >加载更多 ({list.length}/{count})</div>
            </div>
        </div>
    }
}
