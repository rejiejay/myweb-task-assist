export default class ContentInputItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    focusHandle() {
        this.refs.input.focus()
    }

    getElementToPageTop() {
        let dom = this.refs.input
        let top = 0;
        if (dom.offsetParent) {
            do {
                top += dom.offsetTop
            } while (dom = dom.offsetParent)
        }
        return top
    }

    render() {
        const { value, type, index, onChange, id, onFocus, onBlur } = this.props;
        let className = 'content-input-item flex-start-center'
        let splitWidth = 15
        let menu = ''

        switch (type) {
            case 'normal':
                break;
            case 'h1':
                className += ' input-item-h1'
                break;
            case 'h2':
                className += ' input-item-h2'
                break;
            case 'h3':
                splitWidth = 20
                className += ' input-item-h3'
                break;
            case 'h4':
                splitWidth = 20
                className += ' input-item-h4'
                break;
            default:
                break;
        }

        return <div className={className}>
            <label>{index}</label>
            <div
                className='flex-center'
                style={{ width: `${splitWidth}px` }}
            >{menu}</div>
            <input type="text"
                id={id}
                ref='input'
                value={value || ''}
                onChange={({ target: { value } }) => onChange(value, id)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <div style={{ width: '15px' }} />
        </div>
    }
}
