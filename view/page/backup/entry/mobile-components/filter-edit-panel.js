import Button from './../../../components/button'
import consequencer from './../../../../utils/consequencer'
import Confirm from './../../../components/confirm'

import FilterEdit from './../../../components/page/filter-edit'

const props = {
    resolve: () => { },
    reject: () => { },
    isMultipleFilter: false,
    initFilter: {
        tags: [
            // { id, name }
        ],
        longTerm: { id: null, title: '' },
        minEffectTimestamp: null,
        maxEffectTimestamp: null,
        effectTimestampRange: null,
        status: { value: null, label: null },
        priority: { value: null, label: null },
        multipleStatus: [
            // { value: null, label: null }
        ],
        multiplePriority: [
            // { value: null, label: null }
        ]
    }
}

export class FilterEditPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.filterEditRef = React.createRef();
    }

    confirmResolveHandle = async () => {
        const { resolve } = this.props
        const filterEditRef = this.filterEditRef.current

        const { tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, effectTimestampRangeFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter } = filterEditRef.getResult()
        const comfirmInstance = await Confirm('选择确认?')
        if (comfirmInstance.result !== 1) return
        resolve(consequencer.success({ tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, effectTimestampRangeFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter }))
    }

    cancelRejectHandle = async () => {
        const { reject } = this.props
        reject()
    }

    render() {
        const { isMultipleFilter, initFilter } = this.props

        return <div className='filter-edit-container' style={{ padding: '25px 15px 15px 15px' }}>
            <FilterEdit
                ref={this.filterEditRef}
                isMultipleFilter={isMultipleFilter}
                initFilter={initFilter}
            />

            <div style={{ height: '15px' }}></div>
            <div style={{ borderTop: '1px solid #ddd' }}></div>
            <div style={{ height: '15px' }}></div>
            
            <Button
                style={{ backgroundColor: '#1890ff' }}
                onClick={this.confirmResolveHandle}
            >确认</Button>
            <div style={{ height: '5px' }}></div>
            <Button
                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                onClick={this.cancelRejectHandle}
            >取消</Button>
        </div>
    }
}

export default FilterEditPanel
