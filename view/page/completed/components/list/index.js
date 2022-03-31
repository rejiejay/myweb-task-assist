import Pagination from './../../../../components/pagination';

import ListComponent from './list';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            clickItemHandle,
            data,
            pageNo,
            pageTotal,
            randomHandle,
            pageNoChangeHandle
        } = this.props

        return <>
            <ListComponent
                data={data}
                clickItemHandle={clickItemHandle}
            />
            <Pagination
                pageNo={pageNo}
                pageTotal={pageTotal}
                pageNoChangeHandle={pageNoChangeHandle}
                randomHandle={randomHandle}
            />
        </>
    }
}
