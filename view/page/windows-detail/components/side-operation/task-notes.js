const Item = () => <div className='uncategorized-notes-item noselect'>
    <div className='notes-item-container'>item</div>
</div>

export default class TaskUncategorizedNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [
                {},
                {},
                {},
                {},
            ],
        }
    }

    render() {
        const { notes } = this.state

        if (notes.length <= 0) return <></>;

        return <div className='side-uncategorized-notes'>
            <div className='uncategorized-notes-title noselect'>未分类笔记</div>
            {notes.map((item, key) =>
                <Item key={key} />
            )}
        </div>
    }
}
