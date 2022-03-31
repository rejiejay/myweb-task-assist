export default class TermListItemCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            title,
            subItem,
            TitleIcon,
            subItemClick,
            editLongTermDetailProgramHandle,
        } = this.props

        return <div className='term-list-item-card'>
            <div className='term-item-main'>
                <div className='item-title-container flex-start'>
                    <div className='item-title-main flex-center flex-rest'>
                        <div className='item-main-description'>
                            {title}
                        </div>
                    </div>
                    {!!TitleIcon && TitleIcon}
                </div>
                {subItem.length === 0 &&
                    <div className='term-item-null flex-center'>无数据</div>
                }
                {subItem.length > 0 && <div className="item-main-container">{subItem.map((item, key) =>
                    <div className='item-main flex-start-center'
                        key={key}
                    >
                        <div className='item-main-description flex-rest'
                            onClick={() => subItemClick(item)}
                        >{item.title}</div>
                        <div className='item-main-icon flex-center'
                            onClick={() => editLongTermDetailProgramHandle(item)}
                        ><EditIcon /></div>
                    </div>
                )}</div>}
            </div>
        </div>
    }
}

export const SwitchIcon = () => <svg
    className="item-icon-switch"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
>
    <path d="M824.532 732.16H76.8c-28.277 0-51.2-22.923-51.2-51.2s22.923-51.2 51.2-51.2h870.4c28.277 0 51.2 22.923 51.2 51.2 0 12.821-4.712 24.541-12.5 33.523a41.119 41.119 0 0 1-5.145 6.269L756.291 945.216c-19.995 19.995-52.413 19.995-72.408 0s-19.995-52.413 0-72.408L824.531 732.16zM200.183 294.612h747.732c28.277 0 51.2 22.923 51.2 51.2s-22.923 51.2-51.2 51.2h-870.4c-28.277 0-51.2-22.923-51.2-51.2 0-12.821 4.712-24.541 12.5-33.523a41.119 41.119 0 0 1 5.145-6.269L268.424 81.556c19.995-19.995 52.413-19.995 72.408 0s19.995 52.413 0 72.408L200.184 294.612z" p-id="4472"></path><path d="M824.532 732.16H76.8c-28.277 0-51.2-22.923-51.2-51.2s22.923-51.2 51.2-51.2h870.4c28.277 0 51.2 22.923 51.2 51.2 0 12.821-4.712 24.541-12.5 33.523a41.119 41.119 0 0 1-5.145 6.269L756.291 945.216c-19.995 19.995-52.413 19.995-72.408 0s-19.995-52.413 0-72.408L824.531 732.16zM200.183 294.612h747.732c28.277 0 51.2 22.923 51.2 51.2s-22.923 51.2-51.2 51.2h-870.4c-28.277 0-51.2-22.923-51.2-51.2 0-12.821 4.712-24.541 12.5-33.523a41.119 41.119 0 0 1 5.145-6.269L268.424 81.556c19.995-19.995 52.413-19.995 72.408 0s19.995 52.413 0 72.408L200.184 294.612z" fill='#909399'></path>
</svg>

export const RefreshIcon = () => <svg
    className="item-icon-refresh"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
>
    <path d="M936.432 603.424q0 2.848-0.576 4-36.576 153.152-153.152 248.288t-273.152 95.136q-83.424 0-161.44-31.424t-139.136-89.728l-73.728 73.728q-10.848 10.848-25.728 10.848t-25.728-10.848-10.848-25.728l0-256q0-14.848 10.848-25.728t25.728-10.848l256 0q14.848 0 25.728 10.848t10.848 25.728-10.848 25.728l-78.272 78.272q40.576 37.728 92 58.272t106.848 20.576q76.576 0 142.848-37.152t106.272-102.272q6.272-9.728 30.272-66.848 4.576-13.152 17.152-13.152l109.728 0q7.424 0 12.864 5.44t5.44 12.864zM950.736 146.272l0 256q0 14.848-10.848 25.728t-25.728 10.848l-256 0q-14.848 0-25.728-10.848t-10.848-25.728 10.848-25.728l78.848-78.848q-84.576-78.272-199.424-78.272-76.576 0-142.848 37.152t-106.272 102.272q-6.272 9.728-30.272 66.848-4.576 13.152-17.152 13.152l-113.728 0q-7.424 0-12.864-5.44t-5.44-12.864l0-4q37.152-153.152 154.272-248.288t274.272-95.136q83.424 0 162.272 31.712t140 89.44l74.272-73.728q10.848-10.848 25.728-10.848t25.728 10.848 10.848 25.728z" fill='#909399'></path>
</svg>

export const EditIcon = () => <svg
    className="item-icon-edit"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
>
    <path d="M358.277408 561.800219c-0.596588 0.759293-1.193175 1.559519-1.461281 2.52245l-46.050826 168.836313c-2.685155 9.829879 0.065492 20.422122 7.342222 27.889187 5.442966 5.317099 12.614296 8.239662 20.252253 8.239662 2.52245 0 5.050016-0.301875 7.537673-0.962931l167.638021-45.722344c0.26913 0 0.399089 0.23536 0.601704 0.23536 1.925862 0 3.817955-0.700965 5.246491-2.161223l448.270537-448.205045c13.31526-13.332656 20.61655-31.494295 20.61655-51.254338 0-22.38994-9.496282-44.770669-26.126031-61.356416L919.809521 117.458155c-16.604166-16.629749-39.016619-26.143427-61.396325-26.143427-19.754926 0-37.915541 7.303336-51.264571 20.602224L358.944604 560.241724C358.478999 560.669466 358.609982 561.302893 358.277408 561.800219M923.791206 228.575906l-44.526099 44.49233-72.180949-73.327052 43.894719-43.895743c6.935969-6.973832 20.384259-5.956665 28.353768 2.041496l42.363853 42.402739c4.420683 4.41352 6.941086 10.289344 6.941086 16.099676C928.610978 221.151819 926.914336 225.473241 923.791206 228.575906M437.999101 568.842613l323.465043-323.483462 72.216765 73.376171-322.863339 322.847989L437.999101 568.842613 437.999101 568.842613zM379.065873 699.990558l23.375383-85.799108 62.352093 62.358233L379.065873 699.990558 379.065873 699.990558zM927.623487 406.192186c-16.968463 0-31.904641 13.796214-31.970132 30.994921l0 419.411255c0 21.913079-17.796318 38.907125-39.744189 38.907125L166.418752 895.505487c-21.914102 0-38.247092-16.991999-38.247092-38.907125L128.17166 166.360935c0-21.930475 16.331967-38.441521 38.247092-38.441521l473.184973 0c17.063631 0 30.908964-15.163351 30.908964-32.232099 0-17.034978-13.846356-31.68156-30.908964-31.68156L161.703357 64.005756c-53.42477 0-97.827049 44.216038-97.827049 97.67253l0 699.637518c0 53.458539 44.403303 98.422613 97.827049 98.422613l698.884364 0c53.463656 0 98.967012-44.964074 98.967012-98.422613l0-424.324148C959.489242 419.9884 944.587857 406.192186 927.623487 406.192186" fill='#909399'></path>
</svg>

export const TopIcon = () => <svg
    className="item-icon-top"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
>
    <path d="M896.149659 67.771523 126.54051 67.771523c-34.758642 0-62.935378 28.176736-62.935378 62.935378 0 34.757618 28.176736 62.934355 62.935378 62.934355l769.610172 0c34.758642 0 62.935378-28.176736 62.935378-62.934355C959.085036 95.948259 930.9083 67.771523 896.149659 67.771523zM557.654294 258.83814c-1.471514-1.470491-3.016707-2.862187-4.625344-4.181229-0.713244-0.586354-1.469468-1.095961-2.202155-1.6465-0.906649-0.681522-1.797949-1.384533-2.743484-2.01796-0.884137-0.591471-1.805112-1.105171-2.713808-1.648546-0.853437-0.509606-1.689479-1.044796-2.568499-1.515516-0.928139-0.496304-1.883907-0.917906-2.832512-1.364067-0.913812-0.431835-1.811252-0.886183-2.746554-1.27504-0.924045-0.382717-1.864464-0.689708-2.800789-1.02433-1.000793-0.36225-1.989307-0.744967-3.012613-1.054005-0.938372-0.283456-1.892093-0.491187-2.837628-0.729617-1.043772-0.264013-2.071172-0.554632-3.133364-0.766456-1.094938-0.215918-2.201132-0.344854-3.305279-0.503467-0.927115-0.13303-1.840928-0.309038-2.78237-0.402159-2.059915-0.201591-4.124947-0.311085-6.192026-0.312108-0.005117 0-0.011256 0-0.016373 0l0 0c-0.299829 0-0.599657 0.037862-0.898463 0.041956-16.406668-0.231267-32.884968 5.874801-45.402049 18.391882L148.569222 577.09967c-24.576745 24.578792-24.576745 64.425312 0 89.005127 12.288884 12.289907 28.396747 18.434861 44.502563 18.434861 16.105816 0 32.213679-6.144954 44.502563-18.434861l212.633818-212.634842L450.208167 893.124254c0 34.757618 28.176736 62.934355 62.934355 62.934355 34.758642 0 62.935378-28.176736 62.935378-62.934355L576.077899 455.269951l210.836893 210.834846c12.288884 12.289907 28.395724 18.434861 44.500517 18.434861 16.10684 0 32.212656-6.144954 44.500517-18.434861 24.580838-24.579815 24.580838-64.426335 0-89.005127L557.654294 258.83814z" fill='#909399'></path>
</svg>

export const DeleteIcon = () => <svg
    className="item-icon-delete"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
>
    <path d="M977.454545 279.272727 47.109642 279.272727c-20.310744 0-46.263361-26.516804-46.263361-46.263361C0.282094 212.134435 26.798898 186.181818 47.109642 186.181818l186.181818 0L233.29146 93.090909C232.727273 32.722865 265.450138 0 325.818182 0l369.5427 0c59.803857 0 95.347658 32.722865 95.347658 93.090909L790.70854 186.181818l186.181818 0c20.310744 0 46.263361 26.516804 46.263361 46.263361C1023.717906 252.755923 997.765289 279.272727 977.454545 279.272727L977.454545 279.272727zM698.181818 139.918457c0-20.310744-26.516804-46.263361-46.263361-46.263361L372.64573 93.655096c-20.310744 0-46.263361 26.516804-46.263361 46.263361L326.382369 186.181818l372.363636 0L698.181818 139.918457 698.181818 139.918457zM465.736639 372.363636l0 465.454545L372.64573 837.818182 372.64573 372.363636 465.736639 372.363636 465.736639 372.363636zM651.918457 372.363636l0 465.454545L558.827548 837.818182 558.827548 372.363636 651.918457 372.363636 651.918457 372.363636zM186.463912 325.536088c20.310744 0 46.827548 26.516804 46.827548 46.263361l0 511.717906c0 20.310744 26.516804 46.263361 46.263361 46.263361l465.454545 0c20.310744 0 46.263361-26.516804 46.263361-46.263361L791.272727 372.363636c0-20.310744 26.516804-46.263361 46.263361-46.263361 20.310744 0 46.263361 26.516804 46.263361 46.263361l0 558.545455c0 60.368044-32.722865 93.090909-93.090909 93.090909l-558.545455 0c-60.368044 0-93.090909-32.722865-93.090909-93.090909L139.072176 372.363636C139.636364 352.052893 166.153168 325.536088 186.463912 325.536088L186.463912 325.536088zM186.463912 325.536088" p-id="4175" fill='#909399'></path>
</svg>
