import DropDownSelect from './../../../../components/drop-down-select-tooltip';

import service from './../../../../service';

const UrgentSelect = ({ isUrgent, isImportant, setUrgentHandle }) => {
    let displayLable = '紧急程度'
    if (isUrgent) displayLable = '紧急'
    if (isUrgent === false) displayLable = '松懈'
    if (isUrgent === null) displayLable = '正常'
    if (isUrgent === null && isImportant === null) displayLable = '优先级'
    const options = [
        {
            value: 0,
            label: '无优先级',
        }, {
            value: 1,
            label: '紧急',
        }, {
            value: 2,
            label: '不紧急',
        },
    ]

    const selectStatusHandle = ({ value }) => {
        let urgentStatus = null
        switch (value) {
            case 0:
                urgentStatus = null
                break;
            case 1:
                urgentStatus = true
                break;
            case 2:
                urgentStatus = false
                break;
            default:
                urgentStatus = null
                break;
        }

        setUrgentHandle(urgentStatus)
    }

    return <DropDownSelect
        options={options}
        containerStyle={{ padding: 0 }}
        handle={selectStatusHandle}
        zIndex='2'
    >
        <div className="operat-item hover-item">{displayLable}</div>
    </DropDownSelect>
}

const ImportantSelect = ({ isImportant, setImportantHandle }) => {
    let displayLable = '正常'
    if (isImportant) displayLable = '重要'
    if (isImportant === false) displayLable = '次要'
    if (isImportant === null) displayLable = '正常'
    const options = [
        {
            value: 0,
            label: '无优先级',
        }, {
            value: 1,
            label: '重要',
        }, {
            value: 2,
            label: '不重要',
        },
    ]

    const selectStatusHandle = ({ value }) => {
        let importantStatus = null
        switch (value) {
            case 0:
                importantStatus = null
                break;
            case 1:
                importantStatus = true
                break;
            case 2:
                importantStatus = false
                break;
            default:
                importantStatus = null
                break;
        }

        setImportantHandle(importantStatus)
    }

    return <DropDownSelect
        options={options}
        containerStyle={{ padding: 0 }}
        handle={selectStatusHandle}
        zIndex='2'
    >
        <div className="operat-item hover-item">{displayLable}</div>
    </DropDownSelect>
}

export default class TaskStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUrgent: null,
            isImportant: null
        };
    }

    componentDidMount() {
        const { isUrgent, isImportant } = this.props
        this.setState({ isUrgent, isImportant })
    }

    selectStatusHandle(status) {
        this.setState({ displayStyle: status.label })
    }

    setUrgentHandle = async isUrgent => {
        const { taskId, isImportant } = this.props
        const fetchInstance = await service.task.setTaskStatusById(taskId, isUrgent, isImportant);
        if (fetchInstance.result !== 1) return
        this.setState({ isUrgent })
    }

    setImportantHandle = async isImportant => {
        const { taskId, isUrgent } = this.props
        const fetchInstance = await service.task.setTaskStatusById(taskId, isUrgent, isImportant);
        if (fetchInstance.result !== 1) return
        this.setState({ isImportant })
    }

    render() {
        const { isUrgent, isImportant } = this.state

        if (isUrgent === null && isImportant === null) {
            return <UrgentSelect
                isUrgent={isUrgent}
                isImportant={isImportant}
                setUrgentHandle={this.setUrgentHandle}
            />
        }

        return <>
            <UrgentSelect
                isUrgent={isUrgent}
                isImportant={isImportant}
                setUrgentHandle={this.setUrgentHandle}
            />
            <ImportantSelect
                isImportant={isImportant}
                setImportantHandle={this.setImportantHandle}
            />
        </>
    }
}
