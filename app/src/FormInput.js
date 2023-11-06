import classes from './style/newEscrow.module.css';

const FormInput = (props) => {
    return (
        <div className={classes.input_group}>
            <label>
                <span>{props.title}</span>
                <input type="text" id={props.id} />
            </label>
        </div>
    )
}

export default FormInput;