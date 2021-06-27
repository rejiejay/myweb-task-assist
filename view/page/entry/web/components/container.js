export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
    }

    render() {
        const { clientHeight } = this
        const { children, OperationComponent } = this.props
        const minHeight = `${clientHeight - 40}px`

        return <>
            <div className="main flex-start" style={{ minHeight }}>
                <div className="main-windows flex-column flex-rest"
                    style={{ minHeight }}
                >
                    {children}
                </div>
                {OperationComponent}
            </div>
            <div className="copyright">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
        </>
    }
}
