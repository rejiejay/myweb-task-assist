import DropDownSelect from './../../../components/drop-down-select-tooltip';
import CONSTS from './../../../../library/consts'
import PageCommonUtils from './../../../utils/page-common'
import service from './../../../service'
import { queryToUrl } from './../../../utils/url-helper'
import DatePicker from './../../../components/date-picker-sheet'

const SelectEffectTimes = ({ children }) => {
    const clearHandle = async () => {
        let filter = await PageCommonUtils.pageVarToFilter()
        delete filter.minEffectTimestamp
        delete filter.maxEffectTimestamp
        window.location.replace(`./${queryToUrl(filter)}`)
    }

    const selectAllEffectTimesHandle = async () => {
        let filter = await PageCommonUtils.pageVarToFilter()

        const minDatePickerInstance = await DatePicker()
        if (minDatePickerInstance.result !== 1) {
            delete filter.minEffectTimestamp
        }
        filter.minEffectTimestamp = minDatePickerInstance.data

        const maxDatePickerInstance = await DatePicker()
        if (maxDatePickerInstance.result !== 1) {
            delete filter.maxEffectTimestamp
        }
        filter.maxEffectTimestamp = maxDatePickerInstance.data

        window.location.replace(`./${queryToUrl(filter)}`)
    }

    if (children) {
        return <div className="operat-item hover-item" onClick={clearHandle}>{children}</div>
    }

    return <div className="operat-item hover-item" onClick={selectAllEffectTimesHandle}>时间</div>
}

const props = {
    setSortHandle: () => { }
}

export class WindowsHeader extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            longTermOptions: [
                // { value: null, label: null }
            ],
            search: ''
        }
    }

    componentDidMount() {
        this.initTaskLongTermInfor()
    }

    searchHandle = () => {}

    clearSearch = () => {}

    sortSelectedHandle = ({ value, label }) => {
        this.props.setSortHandle({ value, label })
    }

    async initTaskLongTermInfor() {
        const fetchInstance = await service.getAllLongTermTask()
        if (fetchInstance.result !== 1) return
        const allLongTermTask = fetchInstance.data

        const longTermOptions = allLongTermTask.map(longTerm => ({ value: longTerm.id, label: longTerm.title }))

        longTermOptions.push({ value: null, label: '清空' })
        this.setState({ longTermOptions })
    }

    selectLongTermTaskHandle = async ({ value, label }) => {
        let filter = await PageCommonUtils.pageVarToFilter()
        filter.longTermId = value

        if (!value) {
            delete filter.longTermId
        }

        window.location.replace(`./${queryToUrl(filter)}`)
    }

    render() {
        const { search, longTermOptions } = this.state
        const { setFilterHandle, addHandle, longTerm, effectTimes, tags, status, priority } = this.props

        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center">
                <div className="operat-item hover-item" onClick={setFilterHandle}>管理</div>
                {/* <div className="operat-item hover-item" onClick={setFilterHandle}>未分类</div> */}
                <DropDownSelect
                    options={longTermOptions}
                    containerStyle={{ padding: 0 }}
                    handle={this.selectLongTermTaskHandle}
                >
                    <div className="operat-item hover-item">{longTerm || '长期'}</div>
                </DropDownSelect>

                <SelectEffectTimes>{effectTimes || '时间'}</SelectEffectTimes>

                <div className="operat-item hover-item" onClick={setFilterHandle}>{tags || '标签'}</div>
                <div className="operat-item hover-item" onClick={setFilterHandle}>{status || '状态'}</div>
                <div className="operat-item hover-item" onClick={setFilterHandle}>{priority || '优先级'}</div>
            </div>

            <div className="search flex-rest">
                    <div className="search-container flex-start-center">
                        <svg className="search-icon" width="16" height="16" t="1583588302175" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1192">
                            <path d="M1007.548064 899.256487L801.043871 692.754294c-3.577986-3.577986-8.032969-5.329979-12.194952-8.032969C908.82345 515.091988 893.926508 279.233909 742.042101 127.349503c-169.701337-169.775337-444.918262-169.775337-614.692598 0-169.775337 169.701337-169.775337 444.845262 0 614.692598 153.5634 153.5644 392.635466 166.708349 562.701801 42.498834 2.701989 3.869985 4.380983 8.104968 7.73997 11.536955L904.296468 1002.582084c28.624888 28.551888 74.773708 28.551888 103.252596 0 28.477889-28.623888 28.477889-74.846708 0-103.324597zM655.074441 654.927442c-121.653525 121.654525-318.884754 121.654525-440.611279 0-121.653525-121.652525-121.653525-318.956754 0-440.610279s318.884754-121.653525 440.611279 0c121.726525 121.726525 121.726525 318.957754 0 440.611279z" p-id="1193"></path>
                        </svg>
                        <div className="search-input flex-rest">
                            <input type="text" placeholder="输入结论关键字搜索..."
                                value={search}
                                onChange={this.searchHandle}
                            />
                        </div>
                        <svg className="cancel-icon" width="16" height="16" t="1583588453664" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2562"
                            onClick={this.clearSearch}
                        >
                            <path d="M512 992a484.4 484.4 0 0 1-191.856-39.824 36.32 36.32 0 0 1 28.96-66.608 409.248 409.248 0 1 0-173.024-143.344 36.448 36.448 0 0 1-60.096 41.264A480.112 480.112 0 1 1 512 992z" p-id="2563"></path>
                            <path d="M373.2 686.208a37.488 37.488 0 0 1-26.592-11.088 37.936 37.936 0 0 1 0-52.464l279.28-275.584a37.104 37.104 0 1 1 52.464 52.464L399.072 675.12a35.84 35.84 0 0 1-25.872 11.088z" p-id="2564"></path>
                            <path d="M662 686.192a34.656 34.656 0 0 1-25.856-11.088L360.56 399.52a37.104 37.104 0 0 1 52.464-52.464l275.584 275.584a36.576 36.576 0 0 1 0 52.464 37.488 37.488 0 0 1-26.608 11.088z" p-id="2565"></path>
                        </svg>
                    </div>
            </div>

            <div className="right-operating flex-start-center">
                <DropDownSelect
                    options={CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.sort)}
                    handle={this.sortSelectedHandle}
                >
                    <div className="operat-item hover-item">排序</div>
                </DropDownSelect>
                <div className="operat-item hover-item"
                    onClick={addHandle}
                >新增</div>
            </div>
        </div>
    }
}

export default WindowsHeader
