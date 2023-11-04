const FormButton = (props) => {
    return (
        <div
            className="button"
            id={props.id}
            onClick={(e) => {
                e.preventDefault();
                props.newContract();
            }}
        >
            {props.loading?"Waiting on tx...":props.title}
        </div>
    )
}

export default FormButton;