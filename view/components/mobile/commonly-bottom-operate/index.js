/**
 * bottom-operate 移动端常用 底部操作栏
 */
import style from './style.js'

export default class CommonlyBottomOperate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { leftElement, rightElement } = this.props

        return <div className='commonly-bottom-operate' style={style.container}>
            <div style={style.left}>{leftElement && leftElement.length > 0 && leftElement.map(({ cilckHandle, element }, key) => 
                <div key={key}
                    style={style.leftElement({ haveLine: leftElement.length !== (key + 1) })}
                    onClick={cilckHandle}
                >{element}</div>
            )}</div>
            {rightElement && rightElement.length > 0 && <div style={style.right}>{rightElement.map(({ cilckHandle, element }, key) => 
                <div key={key}
                    style={style.rightElement({ haveLine: rightElement.length !== (key + 1) })}
                    onClick={cilckHandle}
                >{element}</div>
            )}</div>}
        </div>
    }
}
