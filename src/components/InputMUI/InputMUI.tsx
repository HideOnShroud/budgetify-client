import "./inputMUI.css"

interface Props {
    placeholder: string
    key: string
    name: string
    value: string
    onChange: (e: any) => void
}

const InputMUI = ({ placeholder, key, name, value, onChange }: Props) => {


    return (

        <div className="outlined-input">
            <input type="text" name={name} placeholder=" " key={key} className={name} value={value} onChange={onChange}></input>
            <label htmlFor="test">{placeholder.at(0)?.toUpperCase() + placeholder.slice(1)}</label>
        </div>

    );
}

export default InputMUI;