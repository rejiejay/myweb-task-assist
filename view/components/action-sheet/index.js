/**
 * ActionSheet 对外方法:
 */
import style from './style.js'
import consequencer from './../../../utils/consequencer'
import toast from './../toast'

const ActionSheet = ({ title, options, isMultiple }) => {
    let resolveHandle = () => { }
    let rejectHandle = () => { }
    const div = document.createElement('div')
    div.setAttribute('style', style.content)

    const destroy = () => document.body.removeChild(div)
    const selectHandle = selected => {
        resolveHandle(consequencer.success(selected))
        destroy()
    }
    const cancelHandle = () => {
        rejectHandle(consequencer.error('cancel'))
        destroy()
    }

    const SingleActionSheet = () => <>
        <div style={style.singleTitle}>{title || 'please select item'}</div>
        <div style={style.selector}>{options.map(({ value, label }, key) =>
            <div key={key}
                style={style.singleItem}
                onClick={() => selectHandle({ value, label })}
            >{label}</div>
        )}</div>
    </>

    class MultipleActionSheet extends React.Component {
        constructor(props) {
            super(props)
    
            this.state = {
                multipleOptions: []
            }
        }

        componentDidMount() {
            const { multipleOptions } = this.props
            this.setState({ multipleOptions: multipleOptions.map(option => ({ ...option, isSelected: false })) })
        }

        confirmHandle = () => {
            const { multipleOptions } = this.state
            const mySelectedList = multipleOptions.filter(item => !!item.isSelected)
            if (mySelectedList.length <= 0) return toast.show('请选择项目')
            selectHandle(mySelectedList)
        }

        selectMultipleItemHandle = (item, index) => {
            const newMultipleOptions = JSON.parse(JSON.stringify(this.state.multipleOptions))
            newMultipleOptions[index].isSelected = !item.isSelected
            this.setState({  multipleOptions: newMultipleOptions })
        }

        render() {
            const { multipleOptions } = this.state

            return <>
                <div style={style.multipleTop}>
                    <div style={style.multipleTitle}>{title || 'please select item'}</div>
                    <div style={style.multipleConfirm} onClick={this.confirmHandle}>确认</div>
                </div>
                <div style={style.selector}>{multipleOptions.map((option, key) =>
                    <div key={key}
                        style={style.multipleItem}
                        onClick={() => this.selectMultipleItemHandle(option, key)}
                    >
                        <div style={style.multipleLable}>{option.label}</div>
                        {option.isSelected && <svg t="1611556193995" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                            <path fill="#389e0d" d="M726.976697 393.184142c-12.54369-12.447359-32.831716-12.320065-45.248112 0.25631L448.447252 629.248757l-103.26354-106.112189c-12.352748-12.703669-32.60809-12.927295-45.248112-0.639914-12.672705 12.320065-12.959978 32.60809-0.639914 45.248112l126.016611 129.503454c0.063647 0.096331 0.192662 0.096331 0.25631 0.192662 0.063647 0.063647 0.096331 0.192662 0.159978 0.25631 2.016073 1.983389 4.512082 3.19957 6.880796 4.544765 1.247144 0.672598 2.239699 1.792447 3.519527 2.303346 3.872168 1.599785 8.000645 2.399677 12.096439 2.399677 4.06483 0 8.12794-0.799892 11.967424-2.33603 1.247144-0.512619 2.208735-1.536138 3.392232-2.176052 2.399677-1.343475 4.895686-2.528692 6.944443-4.544765 0.063647-0.063647 0.096331-0.192662 0.192662-0.25631 0.063647-0.096331 0.159978-0.127295 0.25631-0.192662l256.223626-259.008628C739.647682 425.888563 739.520387 405.631501 726.976697 393.184142z"></path>
                            <path fill="#389e0d" d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z"></path>
                        </svg>}
                    </div>
                )}</div>
            </>
        }
    }

    document.body.appendChild(div)
    ReactDOM.render(
        <>
            <div style={style.mask} onClick={cancelHandle} />
            <div style={style.container}>
                {!isMultiple && <SingleActionSheet />}
                {isMultiple && <MultipleActionSheet multipleOptions={options} />}
            </div>
        </>
        ,
        div
    )

    return new Promise((resolve, reject) => {
        resolveHandle = resolve
        rejectHandle = reject
    }).catch(error => error);
}

export default ActionSheet
