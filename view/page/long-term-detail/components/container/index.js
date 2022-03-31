export default class Container extends React.Component {
    constructor(props) {
        super(props)
        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.containerHeight = `${clientHeight - 40}px`;
        this.mainHeight = `${clientHeight - 92}px`;
    }

    render() {
        const { containerHeight, mainHeight } = this
        const { HeaderComponent, ClassificationComponent, ListComponent, PreviewComponent } = this.props

        return <>
            <div className="long-term-detail flex-start" style={{ height: containerHeight }}>

                <div className="main-windows flex-column flex-rest"
                    style={{ height: containerHeight }}
                >
                    {HeaderComponent}

                    <div className="main-windows-container flex-start flex-rest"
                        style={{ height: mainHeight }}
                    >

                        <div className="main-windows-classification"
                            style={{ height: mainHeight }}
                        >
                            {ClassificationComponent}
                        </div>

                        <div className="main-windows-list flex-column-center flex-rest noselect"
                            style={{ height: mainHeight }}
                        >
                            {ListComponent}
                        </div>
                    </div>
                </div>

                <div className="main-windows-preview flex-column"
                    style={{ height: containerHeight }}
                >
                    {PreviewComponent}
                </div>
            </div>

            <div className="copyright">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
        </>
    }
}
