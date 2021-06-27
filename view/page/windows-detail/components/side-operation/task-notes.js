import Pagination from './../../../../components/pagination';

const Item = ({ data }) => <div className='uncategorized-notes-item noselect'>
    <div className='notes-item-container'>{data.title}</div>
</div>

export default class TaskUncategorizedNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            pageNo: 1,
            pageTotal: 1,
        }
    }

    initPageData = () => { }

    pageNoChangeHandle = pageNo => this.setState({ pageNo }, this.initPageData)

    render() {
        const { pageNo, pageTotal, notes } = this.state

        if (notes.length <= 0) return <></>;

        return <div className='side-uncategorized-notes'>
            <div className='uncategorized-notes-title noselect'>未分类笔记</div>
            {notes.map((item, key) =>
                <Item key={key} data={item} />
            )}
            <Pagination
                pageNo={pageNo}
                pageTotal={pageTotal}
                pageNoChangeHandle={this.pageNoChangeHandle}
            />
        </div>
    }
}
