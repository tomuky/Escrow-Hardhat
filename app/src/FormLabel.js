const FormLabel = (props) => {
    return (
        <label>
            {props.title}
            <input type="text" id={props.id} />
        </label>
    )
}

export default FormLabel;