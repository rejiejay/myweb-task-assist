export const AddIcon = ({ size, className, onClick }) => <svg
    className={className || "add-icon"}
    viewBox="0 0 1024 1024"
    width={size || 12}
    height={size || 12}
    onClick={() => onClick && onClick()}
>
    <path
        d="M512 1024C229.230592 1024 0 794.769408 0 512S229.230592 0 512 0s512 229.230592 512 512-229.230592 512-512 512z m-42.667008-554.667008H256c-23.564288 0-42.667008 19.10272-42.667008 42.667008s19.10272 42.667008 42.667008 42.667008h213.332992V768c0 23.564288 19.10272 42.667008 42.667008 42.667008s42.667008-19.10272 42.667008-42.667008V554.667008H768c23.564288 0 42.667008-19.10272 42.667008-42.667008S791.564288 469.332992 768 469.332992H554.667008V256c0-23.564288-19.10272-42.667008-42.667008-42.667008S469.332992 232.435712 469.332992 256v213.332992z"
    ></path>
</svg>
