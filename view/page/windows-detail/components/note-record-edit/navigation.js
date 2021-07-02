export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { contentInputList, navigateHandle } = this.props

        return <div className='edit-navigation-container'>
            {contentInputList.filter(
                item => item.type !== 'normal'
            ).map(
                item => <div
                    className={`edit-navigation-${item.type}`}
                    onClick={() => navigateHandle(item.id)}
                >
                    {item.value}
                </div>
            )}
        </div>
    }
}
