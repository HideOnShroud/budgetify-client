import "./inputMUI.css"

interface Props {
    placeholder: string
    key: string
    name: string
    type: React.HTMLInputTypeAttribute
    value: string
    onChange: (e: any) => void
}

const InputMUI = ({ placeholder, key, name, value, onChange, type }: Props) => {


    return (

        <div className="outlined-input">
            <input type={type} name={name} placeholder=" " key={key} className={name} value={value} onChange={onChange}></input>
            <label htmlFor="test">{placeholder.at(0)?.toUpperCase() + placeholder.slice(1)}</label>
        </div>

    );
}

export default InputMUI;