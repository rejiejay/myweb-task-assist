export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <div className='list-header-top flex-start-center'>
                <div className='header-top-left flex-rest flex-start'>
                    <div className='top-left-item' onClick={() => window.history.back()}>
                        <div className='left-item-name'>返回</div>
                    </div>
                </div>
                <div className='header-top-right flex-start'>
                    {/* <div className='top-right-item'></div> */}
                </div>
            </div>
        </>
    }
}
