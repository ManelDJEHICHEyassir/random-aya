import './input-item.styles.css'

const InputItem = ({onclickFunc,id, text}) => {
    return (
        <input onClick={onclickFunc} id ={id} type="button" value ={text}></input>
    )
}

export default InputItem;