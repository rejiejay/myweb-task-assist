/**
 * CommonlyListItem 移动端常用 item
 */
import style from './style.js'

export default class CommonlyListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, children, isRequiredHighlight } = this.props
        
        return <div className='commonly-list-item' style={style.container}>
            <div style={style.title(isRequiredHighlight)}>{isRequiredHighlight && '*'}{title}</div>
            <div style={style.element}>
                {children}
            </div>
        </div>
    }
}
