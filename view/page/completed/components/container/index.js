export default class Container extends React.Component {
    constructor(props) {
        super(props)
        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.minHeight = `${clientHeight - 40}px`;
    }

    render() {
        const { minHeight } = this
        const {
            ListComponent,
            PreviewComponent
        } = this.props

        return <>
            <div className="main-windows flex-start" style={{ height: minHeight }}>

                <div className="main-windows-list flex-rest"
                    style={{ height: minHeight }}
                >
                    {ListComponent}
                </div>

                <div className="main-windows-preview flex-column"
                    style={{ height: minHeight }}
                >
                    {PreviewComponent}
                </div>
            </div>

            <div className="copyright">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
        </>
    }
}
