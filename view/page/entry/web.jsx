import WindowsHeader from './windows/header'
import WindowsContainer from './windows/container'
import WindowsPagination from './windows/pagination'

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    render() {
        const { list } = this.state

        return <>
            <WindowsHeader></WindowsHeader>

            <WindowsContainer
                list={list}
            ></WindowsContainer>

            <WindowsPagination></WindowsPagination>

            <div className="copyright-component"><div className="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div></div>
        </>
    }
}
