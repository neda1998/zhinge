interface Props {
    label?:string,
    placeholder?:string,
    margin?:string
}
const InputState = ({ label,placeholder,margin}: Props) => {
    return (
        <div className={`flex flex-col w-full ${margin}`}>
            <label className="mb-2 text-xs mr-5">{label}</label>
            <input type="text" placeholder={placeholder} className="appearance-none w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </div>
    )
}

export default InputState
