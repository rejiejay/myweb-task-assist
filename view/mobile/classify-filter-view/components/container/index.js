export default class Container extends React.Component {
    constructor(props) {
        super(props)

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const headerHeight = 45 + 1 + 32 + 1
        const bottomHeight = 45 + 1

        this.containerHeight = this.clientHeight - headerHeight - bottomHeight
    }

    render() {
        const {
            HeaderComponent,
            ListComponent,
            BottomComponent,
            goAddTaskPage,
        } = this.props
        const {
            clientHeight,
            containerHeight,
        } = this

        return <div className="classify-filter-view"
            style={{ height: `${clientHeight}px` }}
        >
            <div className='filter-list-header'>
                {HeaderComponent}
            </div>
            <div className="filter-list-container"
                style={{ height: `${containerHeight}px` }}
            >
                {ListComponent}
            </div>
            <div className='filter-list-bottom flex-start-center'>
                {BottomComponent}
            </div>
            <div className="classify-filter-view-add-icon"
                onClick={goAddTaskPage}
            >
                <svg className="add-icon-svg"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                >
                    <path
                        d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m32 106.666667v160H704v64h-160V704h-64v-160.021333L320 544v-64l160-0.021333V320h64z"
                        fill="#606266"
                    ></path>
                </svg>
            </div>
        </div>
    }
}
