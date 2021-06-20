import CommonlyInputText from './../../components/mobile/commonly-input-text'
import Confirm from './../../components/confirm'
import Button from './../../components/button'
import fetch from './../../components/async-fetch/index.js'
import valuesStructuresVerify from './../../../utils/values-structures-verify'
import SqlHandle from './../../../module/SQLite/sql-handle'

const sqlHandle = new SqlHandle()
/**
 * 用于操作数据库SQLite的GUI工具
 */
class GUIComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            SQLcontent: '',
            outPutSql: ''
        }
    }

    takeSqlEffectHandle = async () => {
        const { SQLcontent } = this.state

        const fetchSqlInstance = await fetch.post({
            url: 'sql/test',
            body: { sql: SQLcontent },
            isShowError: true
        })
        console.log(fetchSqlInstance)
        if (fetchSqlInstance.result !== 1) return Confirm(fetchSqlInstance.message)
        let fetchData = fetchSqlInstance.data

        if (fetchData[0]) fetchData = fetchData[0]

        try {
            const query = sqlHandle.mapperQuerySQLtoList(fetchData)
            const outPut = query.map((item, i) => <div key={i} style={{ paddingTop: '15px' }}>{JSON.stringify(item)}</div>)
            console.log(query)
            fetchData = outPut

        } catch (error) {
            console.error(error)
        }

        this.setState({ outPutSql: fetchData })
    }

    getTeskHandle = () => this.setState({ SQLcontent: 'SELECT * FROM task' }, this.takeSqlEffectHandle)

    getTaskTagRelationalHandle = () => this.setState({ SQLcontent: 'SELECT * FROM taskTagRelational' }, this.takeSqlEffectHandle)

    getTaskTagsHandle = () => this.setState({ SQLcontent: 'SELECT * FROM taskTags' }, this.takeSqlEffectHandle)

    getTasklongTermHandle = () => this.setState({ SQLcontent: 'SELECT * FROM longTermTaskRelational' }, this.takeSqlEffectHandle)

    render() {
        const { SQLcontent, outPutSql } = this.state

        return <>

            <CommonlyInputText key='content'
                value={SQLcontent || ''}
                onChangeHandle={value => this.setState({ SQLcontent: value })}
                isMultipleInput
                isAutoHeight
                minHeight={250}
                placeholder='请输入SQL'
            />

            <Button onClick={this.takeSqlEffectHandle}>测试</Button>

            <div className='flex-start' style={{ paddingTop: '15px' }}>
                <Button key='Get Task' onClick={this.getTeskHandle}>Get Task</Button>
                <div style={{ width: '5px' }} />
                <Button key='Get Tags Relational' onClick={this.getTaskTagRelationalHandle}>Get Tag Relational</Button>
                <div style={{ width: '5px' }} />
                <Button key='Get Tags' onClick={this.getTaskTagsHandle}>Get Tag Relational</Button>
                <div style={{ width: '5px' }} />
                <Button key='Get longTerm' onClick={this.getTasklongTermHandle}>Get longTerm</Button>
            </div>

            <div>{outPutSql}</div>
        </>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'sql-lite-gui'
    ReactDOM.render(<GUIComponent />, root)
}
